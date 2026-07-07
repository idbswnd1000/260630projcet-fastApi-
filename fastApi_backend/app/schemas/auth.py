import strawberry


@strawberry.input
class LoginInput:
    username: str
    password: str


@strawberry.type
class TokenType:
    access_token: str
    token_type: str = "bearer"


@strawberry.type
class TokenDataType:
    username: str | None = None