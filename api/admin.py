from django.contrib import admin
# import apps to get all models in list
from django import apps

# from .models import *

# models List from 'api' app
api_app = apps.apps.get_app_config('api')


# auto register all model
for model in api_app.get_models():
    admin.site.register(model)