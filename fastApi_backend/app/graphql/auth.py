import strawberry

from app.database import SessionLocal
from app.schemas.auth import LoginInput, TokenType
from app.schemas.users import UserType
from app.services.auth import login
from app.utils.dependencies import get_current_user


@strawberry.type
class AuthQuery:

    @strawberry.field
    def auth(self) -> str:
        return "Auth GraphQL"

    @strawberry.field
    def me(self, info) -> UserType:
        db = SessionLocal()

        try:
            user = get_current_user(info.context, db)

            return UserType(
                id=user.id,
                username=user.username,
                age=user.age,
                email=user.email,
                city=user.city,
            )

        finally:
            db.close()


@strawberry.type
class AuthMutation:

    @strawberry.field
    def login(self, input: LoginInput) -> TokenType:
        db = SessionLocal()

        try:
            token = login(
                db=db,
                username=input.username,
                password=input.password,
            )

            return TokenType(
                access_token=token["access_token"],
                token_type=token["token_type"],
            )

        finally:
            db.close()