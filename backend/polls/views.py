from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django.db.models import Count, F
from .models import Poll, Choice, Vote
from . import serializers


class PollViewSet(ViewSet):

    def list(self, request):
        sort_by = request.query_params.get('sort_by')

        if sort_by == 'relevant':
            polls = Poll.objects.all().order_by('-vote_count')
        else:
            polls = Poll.objects.all().order_by('-date')

        serializer = serializers.PollSerializer(polls, many=True)

        return Response(serializer.data)

    def create(self, request):
        serializer = serializers.PollSerializer(data=request.data)

        if serializer.is_valid():
            created_poll = Poll.objects.create(
                title=serializer.validated_data['title'])

            for choice in request.data['choices']:
                created_choice = Choice.objects.create(
                    poll=created_poll, description=choice['description'])

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        try:
            poll = Poll.objects.get(id=pk)

            serializer = serializers.PollSerializer(instance=poll)

            return Response(serializer.data)
        except Poll.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    @action(methods=['POST'], detail=False)
    def vote(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')

        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')

        serializer = serializers.VoteSerializer(data=request.data)

        if serializer.is_valid():
            choice = serializer.validated_data['choice']
            poll = serializer.validated_data['poll']
            poll.vote_count = F('vote_count') + 1
            poll.save()

            created_vote = Vote.objects.create(
                choice=choice, poll=poll, ip=ip)

            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)(str(poll.id), {
                'type': 'receive_new_vote',
                'choice_id': choice.id
            })

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['GET'], detail=True)
    def result(self, request, pk=None):
        try:
            votes = Vote.objects.filter(poll=pk).values('choice_id').annotate(id=F('choice_id'),
                                                                              total=Count('choice_id'), description=F('choice__description'))
            serializer = serializers.VoteResultSerializer(votes, many=True)

            return Response(serializer.data)
        except Vote.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
