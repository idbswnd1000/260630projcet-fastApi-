import graphene
from graphene_django import DjangoObjectType
from .models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "age",
            "email",
            "city",
        )

class UserInput(graphene.InputObjectType):
    username = graphene.String(required=True)
    password = graphene.String(required=True)
    age = graphene.Int()
    email = graphene.String(required=True)
    city = graphene.String()

class LoginInput(graphene.InputObjectType):
    username = graphene.String(required=True)
    password = graphene.String(required=True)

class LoginResponse(graphene.ObjectType):
    access_token = graphene.String(name="accessToken")
    token_type = graphene.String(name="tokenType")