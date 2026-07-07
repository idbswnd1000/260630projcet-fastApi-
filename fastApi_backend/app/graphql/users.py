import strawberry

from app.database import SessionLocal
from app.schemas.users import UserType, UserInput
from app.services import users as user_service


@strawberry.type
class UserQuery:

    @strawberry.field
    def users(self) -> list[UserType]:

        db = SessionLocal()

        try:
            users = user_service.get_all_users(db)

            return [
                UserType(
                    id=u.id,
                    username=u.username,
                    age=u.age,
                    email=u.email,
                    city=u.city,
                )
                for u in users
            ]

        finally:
            db.close()

    @strawberry.field
    def user(self, id: int) -> UserType | None:

        db = SessionLocal()

        try:
            user = user_service.get_user(db, id)

            if user is None:
                return None

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
class UserMutation:

    @strawberry.mutation
    def create_user(
        self,
        input: UserInput,
    ) -> UserType:

        db = SessionLocal()

        try:
            user = user_service.create_user(
                db=db,
                username=input.username,
                password=input.password,
                age=input.age,
                email=input.email,
                city=input.city,
            )

            return UserType(
                id=user.id,
                username=user.username,
                password=user.password,
                age=user.age,
                email=user.email,
                city=user.city,
            )

        finally:
            db.close()

    @strawberry.mutation
    def update_user(
        self,
        id: int,
        input: UserInput,
    ) -> UserType:

        db = SessionLocal()

        try:
            user = user_service.update_user(
                db=db,
                user_id=id,
                username=input.username,
                password=input.password,
                age=input.age,
                email=input.email,
                city=input.city,
            )

            return UserType(
                id=user.id,
                username=user.username,
                password=user.password,
                age=user.age,
                email=user.email,
                city=user.city,
            )

        finally:
            db.close()

    @strawberry.mutation
    def delete_user(
        self,
        id: int,
    ) -> bool:

        db = SessionLocal()

        try:
            return user_service.delete_user(db, id)

        finally:
            db.close()