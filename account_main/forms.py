# -*- coding: utf-8 -*-
from django import forms
# from django.core.exceptions import ValidationError
from django.contrib.auth.forms import UserCreationForm, UserChangeForm, AuthenticationForm

from .models import AppUser
from datetime import date
from django.core.exceptions import ValidationError


class UserDataForm(forms.ModelForm):
    class Meta:
        model = AppUser
        fields = (
            'user_uid', 'first_name', 'last_name', 'username', 'birthday', 'email', 'phone', 'avatar'
        )
