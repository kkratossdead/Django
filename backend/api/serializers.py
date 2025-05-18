from rest_framework import serializers
from Tickets.models import Ticket, Message

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'

    def get_auteur_username(self, obj):
        return obj.auteur.username if obj.auteur else "Anonyme"

class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ['id', 'ticket', 'sender', 'contenu', 'date_envoi']

    def get_sender(self, obj):
        return obj.get_display_name()

