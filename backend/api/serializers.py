from rest_framework import serializers
from Tickets.models import Ticket, Message

class TicketSerializer(serializers.ModelSerializer):
    auteur_username = serializers.SerializerMethodField()

    class Meta:
        model = Ticket
        fields = ['id', 'title', 'description', 'status', 'created_at', 'updated_at', 'auteur', 'auteur_username']

    def get_auteur_username(self, obj):
        return obj.auteur.username if obj.auteur else "Anonyme"

class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ['id', 'ticket', 'sender', 'contenu', 'date_envoi']

    def get_sender(self, obj):
        return obj.get_display_name()

