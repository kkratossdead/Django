from django.shortcuts import render
from django.views import View
from .models import Ticket
from .forms import TicketForm
from django.shortcuts import redirect
from django.contrib import messages
from rest_framework import generics, permissions
from .models import Message
from .serializers import MessageSerializer
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import json
# Create your views here.

class Home(View):
    def get(self, request):
        return render(request, 'home.html')

class TicketListView(View):
    def get(self, request):
        tickets = Ticket.objects.all()
        return render(request, 'ticket_list.html', {'tickets': tickets})
    
class TicketDetailView(View):
    def get(self, request, ticket_id):
        ticket = Ticket.objects.get(id=ticket_id)
        return render(request, 'ticket_detail.html', {'ticket': ticket})
    
class TicketCreateView(View):
    def get(self, request):
        form = TicketForm()
        return render(request, 'ticket_form.html', {'form': form})
    
    def post(self, request):
        form = TicketForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, 'Ticket created successfully!')
            return redirect('ticket_list')
        return render(request, 'ticket_form.html', {'form': form})


class MessageListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        ticket_id = self.request.query_params.get('ticket')
        return Message.objects.filter(ticket__id=ticket_id).order_by('date_envoi')

    def perform_create(self, serializer):
        message = serializer.save(auteur=self.request.user)
        self.created_message = message  # Store the created message for later use

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        serializer = self.get_serializer(self.created_message)
        return JsonResponse(serializer.data)

def ticket_chat(request, ticket_id):
    ticket = Ticket.objects.get(id=ticket_id)
    messages = Message.objects.filter(ticket=ticket).order_by('date_envoi')
    return render(request, 'chat.html', {'ticket': ticket, 'user': request.user, 'messages': messages})

def fetch_messages(request, ticket_id):
    messages_queryset = Message.objects.filter(ticket__id=ticket_id).order_by('date_envoi')
    data = [
        {
            "sender": {
                "username": message.auteur.username if message.auteur else message.pseudo or "Anonyme"
            },
            "content": message.contenu,
            "date": message.date_envoi.strftime("%d/%m %H:%M")
        }
        for message in messages_queryset
    ]
    return JsonResponse(data, safe=False)


@csrf_exempt
@require_POST
def post_message(request, ticket_id):
    try:
        data = json.loads(request.body)
        contenu = data.get('contenu')
        pseudo = data.get('pseudo')
        auteur = request.user if request.user.is_authenticated else None

        ticket = Ticket.objects.get(id=ticket_id)
        message = Message.objects.create(
            ticket=ticket,
            auteur=auteur,
            pseudo=pseudo if not auteur else None,
            contenu=contenu
        )
        return JsonResponse({
            "sender": {"username": message.get_display_name()},
            "content": message.contenu,
            "date": message.date_envoi.strftime("%d/%m %H:%M")
        })
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)