from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def root(request):
    return JsonResponse({"message": "Welcome to the Travel App API!"})

urlpatterns = [
    path("", root),
    path("admin/", admin.site.urls),
    path("api/attractions/", include("attractions.urls")),
]
