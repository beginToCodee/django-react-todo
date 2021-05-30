from django.contrib import admin

# Register your models here.
from todo.models import *


admin.site.register(Todo)
admin.site.register(Profile)
