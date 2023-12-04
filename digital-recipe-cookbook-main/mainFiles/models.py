from django.db import models

# Create your models here.

class User(models.Model):
    FirstName = models.CharField(max_length=255)
    LastName = models.CharField(max_length=255, blank=True, null=True)
    Email = models.EmailField(max_length=254, default="DEFAULT VALUE")
    City = models.CharField(max_length=254, blank=True, null=True)
    State = models.CharField(max_length=254, blank=True, null=True)

    def __str__(self):
        return self.FirstName+"-"+self.Email