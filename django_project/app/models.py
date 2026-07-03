from django.db import models
from django.contrib.auth.hashers import make_password, check_password, identify_hasher


class Users(models.Model):
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=255)
    age = models.IntegerField()
    email = models.EmailField()
    city = models.CharField(max_length=100)

    class Meta:
        db_table = 'users'

    def save(self, *args, **kwargs):
        try:
            identify_hasher(self.password)
        except Exception:
            self.password = make_password(self.password)

        super().save(*args, **kwargs)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    def __str__(self):
        return self.username

class Employees(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    job = models.CharField(max_length=100)
    pay = models.IntegerField()
    class Meta:
        db_table = 'employees'

class Products(models.Model):
    id = models.AutoField(primary_key=True)
    product_name = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    price = models.IntegerField()
    sale_price = models.IntegerField()
    category_code = models.CharField(max_length=100)
    class Meta:
        db_table = 'products'

class Sales(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    discount_rate = models.FloatField()
    total_price = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'sales'

class Todos(models.Model):
    id = models.AutoField(primary_key=True)
    subject = models.CharField(max_length=100)
    checked = models.BooleanField(default=False)
    class Meta:
        db_table = 'todos'