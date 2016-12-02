from django.shortcuts import render
import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from models import Player,User,Event
import datetime

def index(request):
    return render(request, 'index.html')

@csrf_exempt
def create_event(request):
    if request.method == 'POST':
        final_dict = {}
        final_dict['name'] = request.POST.get("name")
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

def get_events(request):
    if request.method == 'GET':
        current_date = datetime.datetime.now()
        events = Event.objects.filter(start_date__lte=current_date).values('name',
            'organizer','max_bet','min_bet','start_date','end_date','limit','description','category')
        return HttpResponse(json.dumps(list(events),default = myconverter), content_type='application/json')

def myconverter(o):
   if isinstance(o, datetime.datetime):
       return o.__str__()

def get_userprofile(request):

    return HttpResponse(json.dumps(user_data), content_type="application/json")        
    