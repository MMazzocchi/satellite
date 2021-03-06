# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-05-14 17:24
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('components', '0003_componenttype_display_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='chassis',
            name='comp_type',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='components.ComponentType'),
        ),
        migrations.AddField(
            model_name='componenttype',
            name='model_name',
            field=models.CharField(default='', max_length=50),
            preserve_default=False,
        ),
    ]
