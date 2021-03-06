# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-05-20 15:07
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('components', '0019_fueltank'),
    ]

    operations = [
        migrations.CreateModel(
            name='Thrusters',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('cost', models.SmallIntegerField(default=0)),
                ('description', models.TextField(default='No description')),
                ('weight', models.DecimalField(decimal_places=1, default=0.0, max_digits=2)),
                ('color', models.CharField(max_length=7)),
                ('height', models.SmallIntegerField()),
                ('power', models.DecimalField(decimal_places=1, default=2.5, max_digits=2)),
                ('efficiency', models.DecimalField(decimal_places=1, default=2.5, max_digits=2)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
