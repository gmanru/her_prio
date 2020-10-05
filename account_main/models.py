from django.db import models

# Create your models here.

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=255, default="")
    last_name = models.CharField(max_length=255, default="")
    username = models.CharField(max_length=255, default="")
    birthday = models.DateField("Когда выдан паспорт", blank=True, null=True)
    email = models.EmailField()
    password = models.CharField(max_length=255, default="")
    phone = models.CharField(max_length=255, default="", null=True)
    is_admin = models.BooleanField(default=0)
    is_active = models.BooleanField(default=0)
    avatar = models.ImageField(upload_to='content', blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} - admin - {self.is_admin} - active - {self.is_active}"
