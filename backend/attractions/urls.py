from django.urls import path
from .views import AttractionList

urlpatterns = [
    path('', AttractionList.as_view(), name='attraction-list'),
]
