import requests
from django.conf import settings
from django.http import JsonResponse
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import SavedAttraction
from .serializers import SavedAttractionSerializer
from .filters import apply_filters_to_search_results

BASE_SEARCH_URL = "https://api.content.tripadvisor.com/api/v1/location/search"
BASE_DETAILS_URL = "https://api.content.tripadvisor.com/api/v1/location/{locationId}/details"
BASE_PHOTOS_URL = "https://api.content.tripadvisor.com/api/v1/location/{locationId}/photos"
BASE_REVIEWS_URL = "https://api.content.tripadvisor.com/api/v1/location/{locationId}/reviews"
BASE_NEARBY_URL = "https://api.content.tripadvisor.com/api/v1/location/nearby_search"

def _tripadvisor_headers():
    headers = {"accept": "application/json"}
    referer = getattr(settings, "TRIPADVISOR_REFERER", "") or ""
    if referer:
        headers["Referer"] = referer
    return headers

def _tripadvisor_params(extra=None):
    params = {}
    key = getattr(settings, "TRIPADVISOR_API_KEY", "")
    if key:
        params["key"] = key
    if extra:
        params.update(extra)
    return params

@api_view(["GET"])
def search_attractions(request):
  
    query = request.GET.get("query", "").strip() or request.GET.get("searchQuery", "").strip()
    if not query:
        return Response({"error": "Missing 'query' parameter"}, status=status.HTTP_400_BAD_REQUEST)

    params = {
        "searchQuery": query,
        "language": request.GET.get("language", "en"),
    }
   
    cat = request.GET.get("category")
    if cat:
        params["category"] = cat

    resp = requests.get(BASE_SEARCH_URL, params=_tripadvisor_params(params), headers=_tripadvisor_headers(), timeout=10)
    if resp.status_code != 200:
        
        return Response({"error": "TripAdvisor error", "status": resp.status_code, "body": resp.text}, status=resp.status_code)

    data = resp.json()
 
    filtered = apply_filters_to_search_results(data, request.GET)
    return Response({"data": filtered})

@api_view(["GET"])
def attraction_details(request, location_id):
    """
    /api/attractions/details/<location_id>/
    Returns full TripAdvisor location details (description, rating, num_reviews, hours, etc.)
    """
    if not location_id:
        return Response({"error": "Missing location_id"}, status=status.HTTP_400_BAD_REQUEST)
    url = BASE_DETAILS_URL.format(locationId=location_id)
    resp = requests.get(url, params=_tripadvisor_params(), headers=_tripadvisor_headers(), timeout=10)
    if resp.status_code != 200:
        return Response({"error": "TripAdvisor error", "status": resp.status_code, "body": resp.text}, status=resp.status_code)
    return Response(resp.json())

@api_view(["GET"])
def attraction_photos(request, location_id):
    """
    /api/attractions/photos/<location_id>/
    Returns photos for a location (TripAdvisor returns up to 5 by default)
    """
    url = BASE_PHOTOS_URL.format(locationId=location_id)
    resp = requests.get(url, params=_tripadvisor_params({"language": request.GET.get("language", "en")}), headers=_tripadvisor_headers(), timeout=10)
    if resp.status_code != 200:
        return Response({"error": "TripAdvisor error", "status": resp.status_code, "body": resp.text}, status=resp.status_code)
    return Response(resp.json())

@api_view(["GET"])
def attraction_reviews(request, location_id):
    """
    /api/attractions/reviews/<location_id>/?limit=5
    """
    url = BASE_REVIEWS_URL.format(locationId=location_id)
    limit = request.GET.get("limit", 5)
    resp = requests.get(url, params=_tripadvisor_params({"language": request.GET.get("language", "en"), "limit": limit}), headers=_tripadvisor_headers(), timeout=10)
    if resp.status_code != 200:
        return Response({"error": "TripAdvisor error", "status": resp.status_code, "body": resp.text}, status=resp.status_code)
    return Response(resp.json())

@api_view(["GET"])
def attraction_nearby(request):

    latlong = request.GET.get("latLong")
    if not latlong:
        return Response({"error": "Missing latLong param"}, status=status.HTTP_400_BAD_REQUEST)
    params = {"latLong": latlong}
    if request.GET.get("radius"):
        params["radius"] = request.GET.get("radius")
    if request.GET.get("radiusUnit"):
        params["radiusUnit"] = request.GET.get("radiusUnit")
    if request.GET.get("category"):
        params["category"] = request.GET.get("category")
    resp = requests.get(BASE_NEARBY_URL, params=_tripadvisor_params(params), headers=_tripadvisor_headers(), timeout=10)
    if resp.status_code != 200:
        return Response({"error": "TripAdvisor error", "status": resp.status_code, "body": resp.text}, status=resp.status_code)
    return Response(resp.json())


class SavedAttractionListCreate(generics.ListCreateAPIView):
    queryset = SavedAttraction.objects.all().order_by("-id")
    serializer_class = SavedAttractionSerializer

class SavedAttractionDetail(generics.RetrieveDestroyAPIView):
    queryset = SavedAttraction.objects.all()
    serializer_class = SavedAttractionSerializer
