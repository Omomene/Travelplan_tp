from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient

class BasicAttractionTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_root(self):
        r = self.client.get("/")
        self.assertEqual(r.status_code, 200)

    def test_search_missing_query(self):
        r = self.client.get(reverse("search_attractions"))
        self.assertEqual(r.status_code, 400)  

  
