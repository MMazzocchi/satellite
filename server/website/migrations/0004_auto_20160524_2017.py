# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-05-25 03:17
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0003_satellite_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='satellite',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='website.SiteUser'),
        ),
    ]
