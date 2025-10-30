from django.contrib import admin
from .models import SavedAttraction

@admin.register(SavedAttraction)
class SavedAttractionAdmin(admin.ModelAdmin):
    list_display = ("id", "location_id", "name", "created_at")
    readonly_fields = ("created_at", "updated_at")
