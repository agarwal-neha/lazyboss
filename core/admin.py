from django.contrib import admin
from models import Bet, Event, Player, Player_event, User_profile

# Register your models here.
admin.site.register(Event)
admin.site.register(Player)
admin.site.register(Bet)
admin.site.register(Player_event)
admin.site.register(User_profile)