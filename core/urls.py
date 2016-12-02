from django.conf.urls import url
import views


urlpatterns = [
    url(r'^index/$', views.index),
    url(r'^place/', views.place_bet),
    url(r'^players/', views.get_all_players),
    url(r'^player/', views.add_player),
]