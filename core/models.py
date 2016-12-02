from django.contrib.auth.models import User
from django.db import models
from datetime import date

# Create your models here.

# Create your models here.
class Event(models.Model):
   name = models.CharField(max_length=30)
   organizer = models.OneToOneField(User)  
   start_date = models.DateTimeField()
   end_date = models.DateTimeField()
   description = models.CharField(max_length=100)
   max_bet = models.IntegerField(default = 0)
   min_bet = models.IntegerField(default = 0)
   limit = models.IntegerField(default = 0)
   category = models.CharField(max_length=20)
   
class Player(models.Model):
   Event = models.ForeignKey(Event)    
   name = models.CharField(max_length=30)
   rating = models.IntegerField(default = 0)

class Bet(models.Model):
   event = models.ForeignKey(Event)
   player = models.OneToOneField(Player)
   amount = models.IntegerField(default = 0)
   rate_of_return = models.IntegerField(default = 0)
   user = models.OneToOneField(User)
   final_amount = models.IntegerField(default = 0)