# Generated by Django 2.0.8 on 2018-09-20 20:05

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [("importer", "0007_auto_20180917_1654")]

    operations = [
        migrations.AddField(
            model_name="campaigntaskdetails",
            name="project",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="concordia.Project",
            ),
        )
    ]
