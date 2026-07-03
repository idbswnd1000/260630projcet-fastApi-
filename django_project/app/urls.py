from django.urls import path
from app.views import (
    UsersView,
    EmployeesView,
    ProductsView,
    SalesView,
    TodosView,
    LoginView,
    MeView,
)

urlpatterns = [
    path("user/", UsersView.as_view()),
    path("user/<int:pk>/", UsersView.as_view()),

    path("employees/", EmployeesView.as_view()),
    path("employees/<int:pk>/", EmployeesView.as_view()),

    path("products/", ProductsView.as_view()),
    path("products/<int:pk>/", ProductsView.as_view()),

    path("sales/", SalesView.as_view()),
    path("sales/<int:pk>/", SalesView.as_view()),

    path("todos/", TodosView.as_view()),
    path("todos/<int:pk>/", TodosView.as_view()),

    path("auth/login/", LoginView.as_view()),
    path("auth/me/", MeView.as_view()),
]