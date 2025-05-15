from django.urls import path
from  . import views
from django.urls import path

urlpatterns = [
    path('home/',views.Home.as_view(), name='home'),
    path('tickets/',views.TicketListView.as_view(), name='ticket_list'),
    path('tickets/<int:ticket_id>/',views.TicketDetailView.as_view(), name='ticket_detail'),
    path('tickets/create/',views.TicketCreateView.as_view(), name='ticket_create'),
    path('tickets/<int:ticket_id>/update/',views.TicketUpdateView.as_view(), name='ticket_update'),
    path('tickets/<int:ticket_id>/delete/',views.TicketDeleteView.as_view(), name='ticket_delete'),
    path('<int:ticket_id>/chat/', views.ticket_chat, name='ticket_chat'), 
    path('tickets/<int:ticket_id>/messages/', views.fetch_messages, name='fetch_messages'),
    path('tickets/<int:ticket_id>/messages/post/', views.post_message, name='post_message'),
    path('register/', views.register_view, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
]