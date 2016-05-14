# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-05-14 17:43
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('components', '0004_auto_20160514_1024'),
    ]

    operations = [
        migrations.AddField(
            model_name='chassis',
            name='cost',
            field=models.SmallIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='chassis',
            name='description',
            field=models.TextField(default='No description'),
        ),
    ]