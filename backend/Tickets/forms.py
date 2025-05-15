from django import forms
from .models import Ticket
from django.contrib.auth.models import User

class TicketForm(forms.ModelForm):
    class Meta:
        model = Ticket
        fields = ['title', 'description', 'status']
        widgets = {
            'description': forms.Textarea(attrs={'rows': 4, 'cols': 40}),
            'status': forms.Select(choices=[('open', 'Open'), ('closed', 'Closed')]),
        }
        labels = {
            'title': 'Ticket Title',
            'description': 'Ticket Description',
            'status': 'Ticket Status',
        }

class UserCreationForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        widgets = {
            'password': forms.PasswordInput(),
        }
        labels = {
            'username': 'Username',
            'email': 'Email',
            'password': 'Password',
        }

        