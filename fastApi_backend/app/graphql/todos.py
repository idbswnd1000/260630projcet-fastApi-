import strawberry

from app.database import SessionLocal
from app.schemas.todos import TodoType, TodoInput
from app.services import todos as todo_service


@strawberry.type
class TodoQuery:

    @strawberry.field
    def todos(self) -> list[TodoType]:
        db = SessionLocal()

        try:
            todos = todo_service.get_all_todos(db)

            return [
                TodoType(
                    id=t.id,
                    subject=t.subject,
                    checked=t.checked,
                )
                for t in todos
            ]

        finally:
            db.close()

    @strawberry.field
    def todo(self, id: int) -> TodoType | None:
        db = SessionLocal()

        try:
            todo = todo_service.get_todo(db, id)

            if todo is None:
                return None

            return TodoType(
                id=todo.id,
                subject=todo.subject,
                checked=todo.checked,
            )

        finally:
            db.close()


@strawberry.type
class TodoMutation:

    @strawberry.mutation
    def create_todo(
        self,
        input: TodoInput,
    ) -> TodoType:

        db = SessionLocal()

        try:
            todo = todo_service.create_todo(
                db=db,
                todo_input=input,
            )

            return TodoType(
                id=todo.id,
                subject=todo.subject,
                checked=todo.checked,
            )

        finally:
            db.close()

    @strawberry.mutation
    def update_todo(
        self,
        id: int,
        input: TodoInput,
    ) -> TodoType:

        db = SessionLocal()

        try:
            todo = todo_service.update_todo(
                db=db,
                todo_id=id,
                todo_input=input,
            )

            return TodoType(
                id=todo.id,
                subject=todo.subject,
                checked=todo.checked,
            )

        finally:
            db.close()

    @strawberry.mutation
    def delete_todo(
        self,
        id: int,
    ) -> bool:

        db = SessionLocal()

        try:
            todo_service.delete_todo(
                db=db,
                todo_id=id,
            )
            return True

        finally:
            db.close()