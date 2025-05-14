from django.urls import path
from  . import views
from .views import MessageListCreateAPIView
from django.urls import path

urlpatterns = [
    path('home/',views.Home.as_view(), name='home'),
    path('tickets/',views.TicketListView.as_view(), name='ticket_list'),
    path('tickets/<int:ticket_id>/',views.TicketDetailView.as_view(), name='ticket_detail'),
    path('tickets/create/',views.TicketCreateView.as_view(), name='ticket_create'),
    path('api/messages/', MessageListCreateAPIView.as_view(), name='message_list_create'),
    path('<int:ticket_id>/chat/', views.ticket_chat, name='ticket_chat'), 
    path('tickets/<int:ticket_id>/messages/', views.fetch_messages, name='fetch_messages'),
    path('tickets/<int:ticket_id>/messages/post/', views.post_message, name='post_message'),
]