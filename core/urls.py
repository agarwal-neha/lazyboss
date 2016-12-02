from django.conf.urls import url, include
import views


urlpatterns = [
    url(r'^$', views.index),
    url(r'^place/', views.place_bet),
    url(r'^create_event/',views.create_event),
    url(r'^get_events/',views.get_events),
]