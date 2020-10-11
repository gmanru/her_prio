from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class AppUser(AbstractUser):
    # user = models.OneToOneField(User, on_delete=models.CASCADE)
    ban_status = models.BooleanField(default=False)
    user_uid = models.AutoField("Идентификатор пользователя", primary_key=True)
    first_name = models.CharField("Имя пользователя", max_length=255, default="")
    last_name = models.CharField("Фамилия пользователя", max_length=255, default="")
    username = models.CharField("Полное имя пользователя", max_length=255, default="")
    birthday = models.DateField("Дата рождения", blank=True, null=True)
    email = models.EmailField("Дата рождения", default="нет электронной почты")
    password = models.CharField(max_length=255, default="")
    phone = models.CharField(max_length=255, default="", null=True)
    is_admin = models.BooleanField(default=0)
    is_active = models.BooleanField(default=0)
    avatar = models.ImageField(upload_to='content', blank=True, null=True)
    social_thumb = models.URLField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} - admin - {self.is_admin} - active - {self.is_active}"
