# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-05-19 02:31
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('components', '0015_solarpanels'),
    ]

    operations = [
        migrations.CreateModel(
            name='Storage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('cost', models.SmallIntegerField(default=0)),
                ('description', models.TextField(default='No description')),
                ('weight', models.DecimalField(decimal_places=1, default=0.0, max_digits=2)),
                ('base_color', models.CharField(max_length=7)),
                ('disk_color', models.CharField(max_length=7)),
                ('width', models.SmallIntegerField()),
                ('space', models.DecimalField(decimal_places=1, default=2.5, max_digits=2)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
