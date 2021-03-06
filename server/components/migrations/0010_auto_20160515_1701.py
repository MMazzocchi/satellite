# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-05-16 00:01
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('components', '0009_commdish_weight'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chassis',
            name='comp_type',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_query_name='type', to='components.ComponentType'),
        ),
        migrations.AlterField(
            model_name='commdish',
            name='comp_type',
            field=models.ForeignKey(default=2, on_delete=django.db.models.deletion.CASCADE, related_query_name='type', to='components.ComponentType'),
        ),
    ]
