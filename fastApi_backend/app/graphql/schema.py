import strawberry
from app.graphql.auth import AuthQuery, AuthMutation
from app.graphql.employees import EmployeeQuery, EmployeeMutation
from app.graphql.users import UserQuery, UserMutation
from app.graphql.products import ProductQuery, ProductMutation
from app.graphql.todos import TodoQuery, TodoMutation
from app.graphql.sales import SaleQuery


@strawberry.type
class Query(
    EmployeeQuery,
    UserQuery,
    TodoQuery,
    AuthQuery,
    ProductQuery,
    SaleQuery
):
    pass

@strawberry.type
class Mutation(
    EmployeeMutation,
    UserMutation,
    TodoMutation,
    AuthMutation,
    ProductMutation
):
    pass

schema = strawberry.Schema(
    query=Query,
    mutation=Mutation,
)
