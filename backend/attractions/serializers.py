from rest_framework import serializers
from .models import SavedAttraction

class SavedAttractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedAttraction
        fields = ["id", "location_id", "name", "address", "extra", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]
