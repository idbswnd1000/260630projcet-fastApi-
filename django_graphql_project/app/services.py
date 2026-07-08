from django.contrib.auth.hashers import make_password, check_password
from .jwt import JwtProvider
from .models import User


class UserService:

    @staticmethod
    def create(data):

        if User.objects.filter(
                username=data.username
        ).exists():

            raise Exception("이미 존재하는 사용자입니다.")

        if User.objects.filter(
                email=data.email
        ).exists():

            raise Exception("이미 존재하는 이메일입니다.")

        user = User.objects.create(

            username=data.username,

            password=make_password(data.password),

            age=data.age,

            email=data.email,

            city=data.city,

        )

        return user

    @staticmethod
    def find_all():

        return User.objects.all()

    @staticmethod
    def find_by_id(id):

        return User.objects.get(id=id)

    @staticmethod
    def update(id, data):

        user = User.objects.get(id=id)

        user.username = data.username

        user.email = data.email

        user.age = data.age

        user.city = data.city

        if data.password:

            user.password = make_password(data.password)

        user.save()

        return user

    @staticmethod
    def delete(id):

        User.objects.get(id=id).delete()

        return True

    @staticmethod
    def login(data):

        user = User.objects.filter(
            username=data.username
        ).first()

        if user is None:
            raise Exception("사용자가 없습니다.")

        if not check_password(
                data.password,
                user.password):
            raise Exception("비밀번호가 틀렸습니다.")

        token = JwtProvider.create_token(
            user.username
        )

        return token