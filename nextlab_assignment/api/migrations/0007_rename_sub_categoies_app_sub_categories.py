# Generated by Django 5.1.1 on 2025-02-18 09:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_rename_category_id_subcategory_category'),
    ]

    operations = [
        migrations.RenameField(
            model_name='app',
            old_name='sub_categoies',
            new_name='sub_categories',
        ),
    ]
