class Attraction(models.Model):
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    category = models.CharField(max_length=50)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    rating = models.FloatField()
    image = models.URLField()
