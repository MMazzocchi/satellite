# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-05-13 08:54
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('components', '0002_componenttype'),
    ]

    operations = [
        migrations.AddField(
            model_name='componenttype',
            name='display_name',
            field=models.CharField(default='', max_length=50),
            preserve_default=False,
        ),
    ]
