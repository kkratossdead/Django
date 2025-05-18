from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Ticket(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    auteur = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    status = models.CharField(max_length=20, choices=[('open', 'Open'), ('closed', 'Closed')], default='open')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    

class Message(models.Model):
    ticket = models.ForeignKey("Ticket", on_delete=models.CASCADE, related_name="messages")
    auteur = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    pseudo = models.CharField(max_length=50, blank=True, null=True)
    contenu = models.TextField()
    date_envoi = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.get_display_name()} - {self.date_envoi.strftime('%d/%m %H:%M')}"

    def get_display_name(self):
        return self.auteur.username if self.auteur else self.pseudo or "Anonyme"
