import jwt

from datetime import datetime, timedelta
from django.conf import settings


class JwtProvider:

    @staticmethod
    def create_token(username):

        payload = {
            "username": username,
            "exp": datetime.utcnow()
            + timedelta(seconds=settings.JWT_EXPIRE),
        }

        return jwt.encode(
            payload,
            settings.JWT_SECRET,
            algorithm="HS256",
        )

    @staticmethod
    def verify(token):

        return jwt.decode(
            token,
            settings.JWT_SECRET,
            algorithms=["HS256"],
        )