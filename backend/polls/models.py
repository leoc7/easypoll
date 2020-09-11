from django.db import models


class Poll(models.Model):
    title = models.CharField(max_length=255, blank=False)
    date = models.DateTimeField(auto_now_add=True)
    vote_count = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.id} {self.title}'
    

class Choice(models.Model):
    id = models.AutoField(primary_key=True)
    poll = models.ForeignKey(Poll, related_name='choices', on_delete=models.CASCADE)
    description = models.CharField(max_length=255, blank=False)

    def __str__(self):
        return f'[{self.id}] {self.description} da votação {self.poll.title}'
    


class Vote(models.Model):
    ip = models.GenericIPAddressField(protocol="both", unpack_ipv4=False)
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE)
    choice = models.ForeignKey(Choice, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'[{self.id}] {self.choice.description} da votação {self.poll.title} pelo IP {self.ip}'
    