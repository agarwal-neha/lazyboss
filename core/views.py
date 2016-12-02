from django.shortcuts import render
import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from models import Player,User,Event

def index(request):
    return render(request, 'index.html')

@csrf_exempt
def create_event(request):
    if request.method == 'POST':
        final_dict = {}
        final_dict['name'] = request.POST.get("name")
        # player = Player.Objects.get(pk=request.POST.get("player_id"))
        # final_dict['player'] = player
        user = User.objects.get(pk=request.POST.get("user_id"))
        final_dict['organizer'] = user
        final_dict['max_bet'] = request.POST.get("max_bet")
        final_dict['min_bet'] = request.POST.get("min_bet")
        final_dict['start_date'] = request.POST.get("start_date")
        final_dict['end_date'] = request.POST.get("end_date")
        final_dict['limit'] = request.POST.get("limit")
        final_dict['description'] = request.POST.get("desc")
        final_dict['category'] = request.POST.get("category")
        e = Event(**final_dict)
        e.save()
        return HttpResponse(json.dumps(final_dict), content_type="application/json")


def get_userprofile(request):

    return HttpResponse(json.dumps(user_data), content_type="application/json")        
    