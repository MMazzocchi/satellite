# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-05-16 01:09
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('components', '0013_auto_20160515_1742'),
    ]

    operations = [
        migrations.CreateModel(
            name='Batteries',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('cost', models.SmallIntegerField(default=0)),
                ('description', models.TextField(default='No description')),
                ('weight', models.DecimalField(decimal_places=1, default=0.0, max_digits=2)),
                ('color', models.CharField(max_length=7)),
                ('width', models.SmallIntegerField()),
                ('life', models.DecimalField(decimal_places=1, default=2.5, max_digits=2)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
