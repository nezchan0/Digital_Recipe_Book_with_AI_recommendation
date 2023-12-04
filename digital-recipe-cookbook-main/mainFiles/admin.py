from django.contrib import admin
from .models import User

# user: anand - pass123

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ("FirstName","LastName","Email","City","State")

admin.site.register(User,UserAdmin)