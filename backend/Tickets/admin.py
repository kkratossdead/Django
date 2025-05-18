from django.contrib import admin
from .models import Ticket, Message

# Register your models here.

class TicketAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'created_at', 'updated_at')
    list_filter = ('status',)
    search_fields = ('title', 'description')

class MessageAdmin(admin.ModelAdmin):
    list_display = ('ticket', 'auteur', 'pseudo', 'date_envoi')
    list_filter = ('date_envoi',)
    search_fields = ('contenu', 'pseudo')

admin.site.register(Ticket, TicketAdmin)
admin.site.register(Message, MessageAdmin)
