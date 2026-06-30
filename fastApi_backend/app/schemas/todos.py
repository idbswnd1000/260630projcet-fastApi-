from pydantic import BaseModel, ConfigDict

class TodoInput(BaseModel):
    subject: str
    checked: bool


class Todo(TodoInput):
    id: int
    model_config = ConfigDict(from_attributes=True)