
import models
from django.db.models import Sum, Avg
import itertools

def get_rating(p, c):
    return 2


def check_odds(low, high):
    diff_count = low['bet_count'] - high['bet_count']
    total_count = low['bet_count'] + high['bet_count']

    if (abs(diff_count)<2):
        result = {
            low['id']: low,
            high['id']: high
        }

    low['rate_of_return'] -= abs(diff_count)/total_count
    high['rate_of_return'] += abs(diff_count)/total_count

    result = {
        low['id']: low,
        high['id']: high
    }

    return result



def get_rate_of_return(data):
    keys = data.keys()

    data[keys[0]]['difference_amount'] = data[keys[0]]['loss_amount'] - data[keys[1]]['total_amount']
    data[keys[1]]['difference_amount'] = data[keys[1]]['loss_amount'] - data[keys[0]]['total_amount']

    if data[keys[0]]['difference_amount'] >= 0:
        result = check_odds(data[keys[0]], data[keys[1]])
    else:
        result = check_odds(data[keys[1]], data[keys[0]])


    return result


def get_odds(event_id):
    event = models.Event.objects.get(id=event_id)
    player_event = models.Player_event.objects.filter(event_id=event_id)

    players = player_event.values("player_id")


    data = {}
    for player, p_e in itertools.izip(players, player_event):
        rating = get_rating(player, event.category)
        bet = models.Bet.objects.filter(event_id=event_id, player_id=player['player_id'])
        average_amount = bet.aggregate(Avg('amount')).values()[0]
        total_amount = bet.aggregate(Sum('amount')).values()[0]
        total_cost = bet.aggregate(
                total=Sum('amount', field="amount*rate_of_return")
             )['total']

        data[player['player_id']] = {
            'id': player['player_id'],
            'rate_of_return': p_e.rate_of_return,
            'average_amount': average_amount,
            'rating': rating,
            'loss_amount': total_cost,
            'total_amount': total_amount,
            'bet_count': bet.count()
        }

    result = get_rate_of_return(data)

    return result