# Generated by Django 2.2.6 on 2020-03-22 00:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TestModel', '0009_blog'),
    ]

    operations = [
        migrations.AddField(
            model_name='blog',
            name='urls',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
    ]