# Generated by Django 2.2.24 on 2022-01-11 18:14

from django.db import migrations, models

import concordia.models


class Migration(migrations.Migration):

    dependencies = [
        ("concordia", "0050_auto_20210920_1544"),
    ]

    operations = [
        migrations.AddField(
            model_name="asset",
            name="storage_image",
            field=models.ImageField(
                blank=True,
                max_length=255,
                null=True,
                upload_to=concordia.models.Asset.get_storage_path,
            ),
        ),
    ]
