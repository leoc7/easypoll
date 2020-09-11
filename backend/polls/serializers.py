from rest_framework import serializers
from . import models


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Choice
        fields = ('id', 'description', )


class PollSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)

    class Meta:
        model = models.Poll
        fields = ('id', 'title', 'date', 'vote_count', 'choices',)


class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Vote
        fields = ('choice', 'poll', 'date',)


class VoteResultSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    description = serializers.CharField(max_length=255)
    total = serializers.IntegerField()
