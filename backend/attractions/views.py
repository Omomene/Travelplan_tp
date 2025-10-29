from rest_framework import generics
from .models import Attraction
from .serializers import AttractionSerializer

class AttractionList(generics.ListCreateAPIView):
    queryset = Attraction.objects.all()
    serializer_class = AttractionSerializer
