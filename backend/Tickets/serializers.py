from rest_framework import serializers
from .models import Message

class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ['id', 'ticket', 'sender', 'contenu', 'date_envoi']

    def get_sender(self, obj):
        return {"username": obj.auteur.username}
