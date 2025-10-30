from django.db import models

class SavedAttraction(models.Model):
  
    location_id = models.CharField(max_length=64)
    name = models.CharField(max_length=255)
    address = models.TextField(blank=True, default="")
    extra = models.JSONField(blank=True, null=True)  
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.location_id})"
