from rest_framework import serializers
from .models import Message
from django.contrib.auth.models import User
from .models import Accounts
class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ['id', 'ticket', 'sender', 'contenu', 'date_envoi']

    def get_sender(self, obj):
        return {"username": obj.auteur.username}

class AccountsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accounts
        fields = ['id', 'user', 'email', 'date_joined', 'is_active', 'is_superuser', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    