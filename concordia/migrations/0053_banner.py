# Generated by Django 3.2.14 on 2022-08-09 17:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("concordia", "0052_auto_20220531_1331"),
    ]

    operations = [
        migrations.CreateModel(
            name="Banner",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("text", models.CharField(max_length=255)),
                ("link", models.CharField(max_length=255)),
                (
                    "open_in_new_window_tab",
                    models.BooleanField(blank=True, default=True),
                ),
            ],
        ),
    ]
