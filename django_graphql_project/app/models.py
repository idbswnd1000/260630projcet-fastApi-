from django.db import models


class User(models.Model):

    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=255)
    age = models.IntegerField(null=True, blank=True)
    email = models.EmailField(unique=True)
    city = models.CharField(max_length=100, blank=True)
    class Meta:
        db_table = "users"
    def __str__(self):
        return self.username
