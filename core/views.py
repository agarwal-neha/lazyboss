from django.shortcuts import render
import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from models import Event,Player,Player_event,Bet
from django.contrib.auth.models import User
import models
import datetime
from django.forms.models import model_to_dict
from django.core import serializers
from django.http import JsonResponse


def index(request):
    return render(request, 'index.html')

@csrf_exempt
def create_event(request):
    if request.method == 'POST':
        final_dict = {}
        print request.body
        data = json.loads(request.body)
        print data
        final_dict['name'] = data.get('event_name')
        user = request.user
        final_dict['organizer'] = user
        final_dict['max_bet'] = data.get('max_bet')
        final_dict['min_bet'] = data.get('min_bet')
        final_dict['start_date'] = data.get('startdate')
        final_dict['end_date'] = data.get('enddate')
        final_dict['limit'] = data.get('totallimit')
        final_dict['description'] = data.get('desc',"None")
        final_dict['category'] = data.get('category',"None")
        final_dict['event_date'] = data.get('event_date')
        print final_dict
        e = Event(**final_dict)
        e.save()
        player1 = data.get("player_1")
        player2 = data.get("player_2")
        p1 = Player_event(player_id= player1,event_id=e.id)
        p2 = Player_event(player_id= player2,event_id=e.id)
        p1.save()
        p2.save()
        return HttpResponse()

@csrf_exempt
def place_bet(request):
    data = json.loads(request.body)
    evt = Event.objects.get(id = data.get("event_id"))
    player = Player.objects.get(id = data.get("player_id"))
    bet_amount = data.get("amount")
    current_user = request.user
    ror = data.get("return_rate")
    bet = Bet(event = evt, player = player, amount = bet_amount, rate_of_return = ror, user = current_user)
    bet.save()
    return HttpResponse("<html><body>Enjoy betting you sucker</body></html>")

def get_events(request):
        if request.method == 'GET':
                current_date = datetime.datetime.now()
                events = Event.objects.filter(start_date__lte=current_date).values()
                for event in events:
                        user = event.get("organizer_id")
                        user_dict = User.objects.get(id=user)
                        event['organizer'] = user_dict.__dict__
                        print "*************",event['id']
                        players = Player_event.objects.filter(event_id = event['id'])
                        player_list = []
                        for player in players:
                                player_dict ={}
                                player_dict = player.__dict__
                                player_detail = Player.objects.get(id = player_dict['player_id'])
                                player_list.append(player_detail.__dict__)
                        print "+++++++",players
                        event['players'] = player_list
                        print event        
                return HttpResponse(json.dumps(list(events),default = myconverter), content_type='application/json')

def get_players_by_event(request):
        event_id = request.GET.get('event_id')
        players = Player_event.objects.filter(event_id = event_id)
        player_list = []
        for player in players:
                player_detail = Player.objects.get(id = player.player_id)
                player_dict = {'name':player_detail.name,'rating':player_detail.rating,'image':player_detail.image_link}
                player_list.append(player_dict)
        return HttpResponse(json.dumps(player_list),content_type = 'application/json')

def myconverter(o):
     if isinstance(o, datetime.datetime):
             return o.__str__()

def myconverter2(o):
    return o.__str__()

def get_userprofile(request):
        return HttpResponse(json.dumps(user_data), content_type="application/json")

@csrf_exempt
def get_all_players(request):
    if request.method == 'GET':
        
        players = Player.objects.all()
        data = serializers.serialize('json', players)
        return HttpResponse(data, content_type="application/json")

@csrf_exempt
def add_player(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        player_current_rating = get_player_current_rating()
        new_player = Player(name = data.get("name"), rating = player_current_rating)
        new_player.save()
        return HttpResponse("<html><body>Added</body></html>")

def get_player_current_rating():
    return 4


def index(request):
        return render(request, 'index.html')

def get_bet_details(user_id):
    bet_detail = models.Bet.objects.filter(user = user_id).values()

    return json.dumps(list(bet_detail),default = myconverter2)


def get_user_details(user_id):

    """
    :param id: user ID
    :return: user details
    """
    user_id=1
    one = models.User_profile.objects.filter(user=user_id)
    user_detail = one[0]

    result = {
        'username': user_detail.user.username,
        'email': user_detail.user.email,
        'first_name': user_detail.user.first_name,
        'last_name': user_detail.user.last_name,
        'bet_history': get_bet_details(user_id),
        'points': user_detail.points
    }

    return result

@csrf_exempt
def user_details(request):

    if request.method == 'GET':
        user_id = request.GET.get('user_id')
        result = get_user_details(user_id)


        # Extract user details and history
    return HttpResponse(JsonResponse(result), content_type="application/json")


