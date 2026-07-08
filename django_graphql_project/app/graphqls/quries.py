import graphene

from app.models import User
from app.types import UserType
from app.jwt import JwtProvider


class Query(graphene.ObjectType):

    users = graphene.List(UserType)

    user = graphene.Field(
        UserType,
        id=graphene.Int(required=True)
    )

    me = graphene.Field(UserType)

    def resolve_users(root, info):
        return User.objects.all()

    def resolve_user(root, info, id):
        return User.objects.get(id=id)

    def resolve_me(root, info):
        request = info.context

        auth_header = request.headers.get("Authorization")

        if not auth_header or not auth_header.startswith("Bearer "):
            raise Exception("토큰이 없습니다.")

        token = auth_header.replace("Bearer ", "")

        payload = JwtProvider.verify(token)

        username = payload.get("username")

        if not username:
            raise Exception("토큰에 username이 없습니다.")

        return User.objects.get(username=username)