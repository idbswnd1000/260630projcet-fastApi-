import strawberry


@strawberry.type
class TodoType:
    id: int
    subject: str
    checked: bool


@strawberry.input
class TodoInput:
    subject: str
    checked: bool