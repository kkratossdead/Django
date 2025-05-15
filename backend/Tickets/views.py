from django.shortcuts import render
from django.views import View
from .models import Ticket
from .forms import TicketForm
from django.shortcuts import redirect
from django.contrib import messages
from .models import Message
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
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
    
class TicketUpdateView(View):
    def get(self, request, ticket_id):
        ticket = Ticket.objects.get(id=ticket_id)
        form = TicketForm(instance=ticket)
        return render(request, 'ticket_form.html', {'form': form, 'ticket': ticket})
    
    def post(self, request, ticket_id):
        ticket = Ticket.objects.get(id=ticket_id)
        form = TicketForm(request.POST, request.FILES, instance=ticket)
        if form.is_valid():
            form.save()
            messages.success(request, 'Ticket updated successfully!')
            return redirect('ticket_list')
        return render(request, 'ticket_form.html', {'form': form, 'ticket': ticket})
    
class TicketDeleteView(View):
    def post(self, request, ticket_id):
        ticket = Ticket.objects.get(id=ticket_id)
        ticket.delete()
        messages.success(request, 'Ticket deleted successfully!')
        return redirect('ticket_list')



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
    
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect
from django.contrib.auth import login

def register_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()  
            login(request, user)  
            return redirect('home')  
    else:
        form = UserCreationForm()
    
    return render(request, 'register.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('home')
    else:
        form = UserCreationForm()
    
    return render(request, 'login.html', {'form': form})

from django.contrib.auth import logout
def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return redirect('home')
    return render(request, 'logout.html')

