# Generated by Django 3.1 on 2020-08-17 14:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='choice',
            name='description',
            field=models.CharField(default='a', max_length=255),
            preserve_default=False,
        ),
    ]
