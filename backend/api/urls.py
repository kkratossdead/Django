# api/urls.py
from django.urls import path, include
from rest_framework import routers
from .views import TicketMessageListCreateAPIView, UserProfileAPIView
from rest_framework.authtoken.views import obtain_auth_token
from .views import TicketViewSet
from .views import RegisterAPIView


router = routers.DefaultRouter()
router.register(r'tickets', TicketViewSet)
urlpatterns = [
    path('', include(router.urls)),
    path('tickets/<int:ticket_id>/messages/', TicketMessageListCreateAPIView.as_view(), name='ticket_messages'),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    path('profile/', UserProfileAPIView.as_view(), name='user_profile'),
    path('register/', RegisterAPIView.as_view(), name='register'),

]
