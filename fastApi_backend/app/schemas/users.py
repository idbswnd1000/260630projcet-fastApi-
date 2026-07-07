import strawberry


@strawberry.type
class UserType:
    id: int
    username: str
    age: int
    email: str
    city: str


@strawberry.input
class UserInput:
    username: str
    password: str
    age: int
    email: str
    city: str