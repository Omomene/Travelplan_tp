import requests
from django.conf import settings
from django.http import JsonResponse
from django.core.cache import cache
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
def home_attractions(request):
    country = request.GET.get("country")
    profile = request.GET.get("profile", "tourist")

    if not country:
        return Response({"error": "Missing 'country' parameter"}, status=status.HTTP_400_BAD_REQUEST)

    cache_key = f"home_attractions_{country}_{profile}"
    cached = cache.get(cache_key)
    if cached:
        return Response({"data": cached})

    if profile == "professional":
        category = "hotels,business"
    elif profile == "local":
        category = "things_to_do,events"
    else:
        category = "attractions,restaurants"

    params = {
        "searchQuery": country,
        "language": "en",
        "category": category
    }

    resp = requests.get(BASE_SEARCH_URL, params=_tripadvisor_params(params), headers=_tripadvisor_headers(), timeout=10)
    if resp.status_code != 200:
        return Response({"error": "TripAdvisor error", "status": resp.status_code, "body": resp.text}, status=resp.status_code)

    data = resp.json().get("data", [])
    cache.set(cache_key, data, timeout=60 * 5)  
    return Response({"data": data})


@api_view(["GET"])
def search_attractions(request):
    query = request.GET.get("query", "").strip() or request.GET.get("searchQuery", "").strip()
    if not query:
        return Response({"error": "Missing 'query' parameter"}, status=status.HTTP_400_BAD_REQUEST)

    cache_key = f"search_{query}_{request.GET.get('category', '')}_{request.GET.get('language', 'en')}"
    cached = cache.get(cache_key)
    if cached:
        return Response({"data": cached})

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

    data = apply_filters_to_search_results(resp.json(), request.GET)
    cache.set(cache_key, data, timeout=60 * 5)
    return Response({"data": data})


@api_view(["GET"])
def attraction_details(request, location_id):
    if not location_id:
        return Response({"error": "Missing location_id"}, status=status.HTTP_400_BAD_REQUEST)

    cache_key = f"details_{location_id}"
    cached = cache.get(cache_key)
    if cached:
        return Response(cached)

    url = BASE_DETAILS_URL.format(locationId=location_id)
    resp = requests.get(url, params=_tripadvisor_params(), headers=_tripadvisor_headers(), timeout=10)
    if resp.status_code != 200:
        return Response({"error": "TripAdvisor error", "status": resp.status_code, "body": resp.text}, status=resp.status_code)

    data = resp.json()
    cache.set(cache_key, data, timeout=60 * 5)
    return Response(data)


@api_view(["GET"])
def attraction_photos(request, location_id):
    cache_key = f"photos_{location_id}"
    cached = cache.get(cache_key)
    if cached:
        return Response({"photos": cached})

    url = BASE_PHOTOS_URL.format(locationId=location_id)
    resp = requests.get(url, params=_tripadvisor_params({"language": request.GET.get("language", "en")}), headers=_tripadvisor_headers(), timeout=10)
    if resp.status_code != 200:
        return Response({"error": "TripAdvisor error", "status": resp.status_code, "body": resp.text}, status=resp.status_code)

    photos = resp.json().get("data", [])
    cache.set(cache_key, photos, timeout=60 * 60)  
    return Response({"photos": photos})


@api_view(["GET"])
def attraction_reviews(request, location_id):
    cache_key = f"reviews_{location_id}_{request.GET.get('limit', 5)}"
    cached = cache.get(cache_key)
    if cached:
        return Response(cached)

    url = BASE_REVIEWS_URL.format(locationId=location_id)
    limit = request.GET.get("limit", 5)
    resp = requests.get(url, params=_tripadvisor_params({"language": request.GET.get("language", "en"), "limit": limit}), headers=_tripadvisor_headers(), timeout=10)
    if resp.status_code != 200:
        return Response({"error": "TripAdvisor error", "status": resp.status_code, "body": resp.text}, status=resp.status_code)

    data = resp.json()
    cache.set(cache_key, data, timeout=60 * 60)
    return Response(data)


@api_view(["GET"])
def attraction_nearby(request):
    latlong = request.GET.get("latLong")
    if not latlong:
        return Response({"error": "Missing latLong param"}, status=status.HTTP_400_BAD_REQUEST)

    cache_key = f"nearby_{latlong}_{request.GET.get('radius', '')}_{request.GET.get('category', '')}"
    cached = cache.get(cache_key)
    if cached:
        return Response(cached)

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

    data = resp.json()
    cache.set(cache_key, data, timeout=60 * 5)
    return Response(data)


class SavedAttractionListCreate(generics.ListCreateAPIView):
    queryset = SavedAttraction.objects.all().order_by("-id")
    serializer_class = SavedAttractionSerializer


class SavedAttractionDetail(generics.RetrieveDestroyAPIView):
    queryset = SavedAttraction.objects.all()
    serializer_class = SavedAttractionSerializer
