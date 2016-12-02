from django.contrib import admin
from models import Bet, Event, Player

# Register your models here.
admin.site.register(Event)
admin.site.register(Player)
admin.site.register(Bet)