import json
from channels.generic.websocket import AsyncWebsocketConsumer


class PollConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.poll_id = self.scope['url_route']['kwargs']['poll_id']

        await self.channel_layer.group_add(
            self.poll_id,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.poll_id,
            self.channel_name
        )

    async def receive_new_vote(self, data):
        await self.send(text_data=json.dumps({
            'choice_id': data['choice_id']
        }))
