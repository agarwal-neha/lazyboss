from django.shortcuts import render
import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from models import Player,User,Event,Player_event,Bet,User_profile, Player_rating
import datetime, decimal
from django.forms.models import model_to_dict
from django.core import serializers
from django.http import JsonResponse


def index(request):
	return render(request, 'index.html')

@csrf_exempt
def create_event(request):
    if request.method == 'POST':
        final_dict = {}
        final_dict['name'] = request.POST.get("name")
        user = User.objects.get(id=request.POST.get("user_id"))
        final_dict['organizer'] = user
        final_dict['max_bet'] = request.POST.get("max_bet")
        final_dict['min_bet'] = request.POST.get("min_bet")
        final_dict['start_date'] = request.POST.get("start_date")
        final_dict['end_date'] = request.POST.get("end_date")
        final_dict['limit'] = request.POST.get("limit")
        final_dict['description'] = request.POST.get("desc")
        final_dict['category'] = request.POST.get("category")
        final_dict['event_date'] = request.POST.get("event_date")
        final_dict['winner_id'] = 1
        player1 = request.POST.get("player1")
        player2 = request.POST.get("player2")
        e = Event(**final_dict)
        e.save()
        p1 = Player_event(player_id= player1,event_id=e.id)
        p2 = Player_event(player_id= player2,event_id=e.id)
        p1.save()
        p2.save()
        return HttpResponse()

@csrf_exempt
def place_bet(request):
	evt = Event.objects.get(id = request.POST.get("event_id"))
	player = Player.objects.get(id = request.POST.get("player_id"))
	bet_amount = request.POST.get("amount")
	current_user = User.objects.get(id= request.POST.get("user_id"))
	ror = request.POST.get("return_rate")
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
            event['players'] = player_list

        return HttpResponse(json.dumps(list(events),default = myconverter), content_type='application/json')

def get_players_by_event(request):
    event_id = request.GET.get('event_id')
    players = Player_event.objects.filter(event_id = event_id)
    category = Event.objects.filter(id = event_id).first().category
    player_list = []
    for player in players:
        player_detail = Player.objects.get(id = player.player_id)
        rating = get_player_current_rating(player.id, category)
        player_dict = {'name':player_detail.name,'rating':rating,'image':player_detail.image_link}
        player_list.append(player_dict)
    return HttpResponse(json.dumps((player_list), default = decimalconverter), content_type = 'application/json')


def decimalconverter(o):
   if isinstance(o, decimal.Decimal):
       return o.__str__()

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
		player_current_rating = get_player_current_rating()
		new_player = Player(name = request.POST.get("name"), rating = player_current_rating)
		new_player.save()
		return HttpResponse("<html><body>Added</body></html>")


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

@csrf_exempt
def update_result(request):
    event_id = request.POST.get("event_id")
    player_id = request.POST.get("player_id")
    event = Event.objects.get(id = event_id)
    event.winner = Player.objects.get(id = player_id)
    event.save()
    resolve_event(event.id)
    return HttpResponse()

def resolve_event(event_id):
    event = Event.objects.get(id = event_id)
    winner = event.winner
    organizer_id = event.organizer_id
    print "********",organizer_id
    organizer = User_profile.objects.get(user_id = organizer_id)
    bets = Bet.objects.filter(event_id = event_id)
    for bet in bets:
        user_id = bet.user
        user = User_profile.objects.get(user_id = user_id)
        amount = (bet.amount*bet.rate_of_return)/100
        if bet.player == winner:
            organizer.points = organizer.points - amount
            user.points = user.points + amount
        else:
            organizer.points = organizer.points + bet.amount
            user.points = user.points - bet.amount
        user.save()
        organizer.save()



def get_player_current_rating(player_id, category):
	rating = Player_rating.objects.filter(player__id = player_id, category = category).first().rating
	if rating is None:
		return 0

	return rating;

