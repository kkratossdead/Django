from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, viewsets
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from Tickets.models import Ticket, Message
from .serializers import MessageSerializer, TicketSerializer

class IsAdminOrAuthor(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.is_staff or obj.auteur == request.user

class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    def get_permissions(self):
        if self.action in ['update', 'partial_update']:
            return [permissions.IsAuthenticated(), IsAdminOrAuthor()]
        elif self.action == 'destroy':
            return [permissions.IsAdminUser()]
        elif self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.AllowAny()]

    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            serializer.save(auteur=self.request.user)
        else:
            serializer.save()

class TicketMessageListCreateAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, ticket_id):
        ticket = get_object_or_404(Ticket, id=ticket_id)
        messages = ticket.messages.all().order_by('date_envoi')
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)

    def post(self, request, ticket_id):
        ticket = get_object_or_404(Ticket, id=ticket_id)
        contenu = request.data.get('message')
        pseudo = request.data.get('pseudo')

        if not contenu:
            return Response({'error': 'Message vide.'}, status=status.HTTP_400_BAD_REQUEST)

        message = Message.objects.create(
            ticket=ticket,
            auteur=request.user if request.user.is_authenticated else None,
            pseudo=pseudo if not request.user.is_authenticated else None,
            contenu=contenu
        )
        serializer = MessageSerializer(message)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class UserProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'username': user.username,
            'email': user.email,
            'is_staff': user.is_staff,
            'is_superuser': user.is_superuser,
            'id': user.id
        })
    
class RegisterAPIView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({'error': 'Username et Password sont requis.'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username déjà pris.'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, password=password)
        return Response({'message': 'Utilisateur créé avec succès.'}, status=status.HTTP_201_CREATED)