from django.contrib import admin
from django.contrib.auth import get_user_model
User = get_user_model()
# from .models import User

# Register your models here.
class CustomUserAdmin(admin.ModelAdmin):
    def save_model(self, request, obj, form, change):
        obj.set_password(obj.password)
        return super().save_model(request, obj, form, change)
    
admin.site.register(User, CustomUserAdmin)