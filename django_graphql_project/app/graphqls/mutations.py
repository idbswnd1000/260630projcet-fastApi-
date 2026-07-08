import graphene

from app.services import UserService
from app.types import (
    UserType,
    UserInput,
    LoginInput,
    LoginResponse,
)


class CreateUser(graphene.Mutation):

    class Arguments:

        input = UserInput(required=True)

    Output = UserType

    @staticmethod
    def mutate(root, info, input):

        return UserService.create(input)


class UpdateUser(graphene.Mutation):

    class Arguments:

        id = graphene.Int(required=True)

        input = UserInput(required=True)

    Output = UserType

    @staticmethod
    def mutate(root, info, id, input):

        return UserService.update(id, input)


class DeleteUser(graphene.Mutation):

    class Arguments:

        id = graphene.Int(required=True)

    success = graphene.Boolean()

    @staticmethod
    def mutate(root, info, id):

        UserService.delete(id)

        return DeleteUser(success=True)


class Login(graphene.Mutation):

    class Arguments:

        input = LoginInput(required=True)

    Output = LoginResponse

    @staticmethod
    def mutate(root, info, input):

        token = UserService.login(input)

        return LoginResponse(
            access_token=token,
            token_type="Bearer"

        )


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    update_user = UpdateUser.Field()
    delete_user = DeleteUser.Field()
    login = Login.Field()