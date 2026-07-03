from rest_framework import serializers
from .models import Users, Employees, Products, Sales, Todos


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = "__all__"


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class EmployeesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employees
        fields = "__all__"

class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = "__all__"

class SalesSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source="user.id", read_only=True)
    product_id = serializers.IntegerField(source="product.id", read_only=True)

    class Meta:
        model = Sales
        fields = [
            "id",
            "user_id",
            "product_id",
            "quantity",
            "discount_rate",
            "total_price",
            "created_at",
        ]

class TodosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todos
        fields = "__all__"