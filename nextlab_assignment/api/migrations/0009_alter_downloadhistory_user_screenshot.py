# Generated by Django 5.1.1 on 2025-02-22 08:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_downloadhistory_is_verified_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='downloadhistory',
            name='user_screenshot',
            field=models.URLField(),
        ),
    ]
