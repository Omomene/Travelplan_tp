from django.urls import path
from . import views

urlpatterns = [
    path("search/", views.search_attractions, name="search_attractions"),
    path("details/<str:location_id>/", views.attraction_details, name="attraction_details"),
    path("photos/<str:location_id>/", views.attraction_photos, name="attraction_photos"),
    path("reviews/<str:location_id>/", views.attraction_reviews, name="attraction_reviews"),
    path("nearby/", views.attraction_nearby, name="attraction_nearby"),
    path("home/", views.home_attractions, name="home_attractions"),
    path("saved/", views.SavedAttractionListCreate.as_view(), name="saved_list_create"),
    path("saved/<int:pk>/", views.SavedAttractionDetail.as_view(), name="saved_detail"),
]
