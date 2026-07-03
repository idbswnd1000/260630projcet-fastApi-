from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.exceptions import TokenError

from .models import (Users,
                     Employees,
                     Products,
                     Sales,
                     Todos)
from .serializer import (UsersSerializer,
                         LoginSerializer,
                         EmployeesSerializer,
                         ProductsSerializer,
                         SalesSerializer,
                         TodosSerializer)
import bcrypt
# user CRUD
class UsersView(APIView):
    authentication_classes = []
    permission_classes = []
    # get all / get one
    def get(self, request, pk=None):
        if pk is None:
            users = Users.objects.all()
            serializer = UsersSerializer(users, many=True)
            return Response(serializer.data)

        user = Users.objects.filter(pk=pk).first()

        if user is None:
            return Response(
                {"message": "사용자를 찾을 수 없습니다."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = UsersSerializer(user)
        return Response(serializer.data)

    # post
    def post(self, request):
        serializer = UsersSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # put
    def put(self, request, pk):
        user = Users.objects.filter(pk=pk).first()

        if user is None:
            return Response(
                {"message": "사용자를 찾을 수 없습니다."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = UsersSerializer(user, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # delete
    def delete(self, request, pk):
        user = Users.objects.filter(pk=pk).first()

        if user is None:
            return Response(
                {"message": "사용자를 찾을 수 없습니다."},
                status=status.HTTP_404_NOT_FOUND
            )

        user.delete()
        return Response(
            {"message": "삭제되었습니다."},
            status=status.HTTP_204_NO_CONTENT
        )


# login
class LoginView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        username = serializer.validated_data["username"]
        password = serializer.validated_data["password"]

        user = Users.objects.filter(username=username).first()

        if user is None:
            return Response(
                {"message": "존재하지 않는 사용자입니다."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        if not bcrypt.checkpw(
                password.encode("utf-8"),
                user.password.encode("utf-8")
        ):
            return Response(
                {"message": "비밀번호가 일치하지 않습니다."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        refresh = RefreshToken()
        refresh["user_id"] = user.id
        refresh["username"] = user.username

        return Response({
            "message": "로그인 성공",
            "accessToken": str(refresh.access_token),
            "refreshToken": str(refresh),
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "age": user.age,
                "city": user.city,
            }
        })


# me
class MeView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return Response(
                {"message": "토큰이 없습니다."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        try:
            token_type, token = auth_header.split(" ")

            if token_type != "Bearer":
                return Response(
                    {"message": "Bearer 토큰 형식이 아닙니다."},
                    status=status.HTTP_401_UNAUTHORIZED
                )

            access_token = AccessToken(token)
            user_id = access_token["user_id"]

        except ValueError:
            return Response(
                {"message": "Authorization 형식이 잘못되었습니다."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        except TokenError:
            return Response(
                {"message": "토큰이 만료되었거나 유효하지 않습니다."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        user = Users.objects.filter(id=user_id).first()

        if user is None:
            return Response(
                {"message": "사용자를 찾을 수 없습니다."},
                status=status.HTTP_404_NOT_FOUND
            )

        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "age": user.age,
            "city": user.city,
        })

class EmployeesView(APIView):
    authentication_classes = []
    permission_classes = []
    # GET ALL / GET ONE
    def get(self, request, pk=None):
        if pk is None:
            employees = Employees.objects.all()
            serializer = EmployeesSerializer(employees, many=True)
            return Response(serializer.data)

        employee = Employees.objects.filter(pk=pk).first()

        if employee is None:
            return Response(
                {"message": "직원을 찾을 수 없습니다."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = EmployeesSerializer(employee)
        return Response(serializer.data)

    # CREATE
    def post(self, request):
        serializer = EmployeesSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # UPDATE
    def put(self, request, pk):
        employee = Employees.objects.filter(pk=pk).first()

        if employee is None:
            return Response(
                {"message": "직원을 찾을 수 없습니다."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = EmployeesSerializer(employee, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # DELETE
    def delete(self, request, pk):
        employee = Employees.objects.filter(pk=pk).first()

        if employee is None:
            return Response(
                {"message": "직원을 찾을 수 없습니다."},
                status=status.HTTP_404_NOT_FOUND
            )

        employee.delete()

        return Response(
            {"message": "삭제되었습니다."},
            status=status.HTTP_204_NO_CONTENT
        )

class ProductsView(APIView):
    authentication_classes = []
    permission_classes = []
    def get(self, request, pk=None):
        if pk is None:
            products = Products.objects.all()
            serializer = ProductsSerializer(products, many=True)
            return Response(serializer.data)

        product = Products.objects.filter(pk=pk).first()

        if product is None:
            return Response(
                {"message": "상품을 찾을 수 없습니다."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = ProductsSerializer(product)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProductsSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        product = Products.objects.filter(pk=pk).first()

        if product is None:
            return Response(
                {"message": "상품을 찾을 수 없습니다."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = ProductsSerializer(product, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        product = Products.objects.filter(pk=pk).first()

        if product is None:
            return Response(
                {"message": "상품을 찾을 수 없습니다."},
                status=status.HTTP_404_NOT_FOUND
            )

        product.delete()

        return Response(
            {"message": "삭제되었습니다."},
            status=status.HTTP_204_NO_CONTENT
        )
class SalesView(APIView):
    authentication_classes = []
    permission_classes = []
    def get(self, request, pk=None):
        if pk is None:
            sales = Sales.objects.all()
            serializer = SalesSerializer(sales, many=True)
            return Response(serializer.data)

        sale = Sales.objects.filter(pk=pk).first()

        if sale is None:
            return Response(
                {"message": "판매내역을 찾을 수 없습니다."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = SalesSerializer(sale)
        return Response(serializer.data)

    def post(self, request):
        serializer = SalesSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        sale = Sales.objects.filter(pk=pk).first()

        if sale is None:
            return Response(
                {"message": "판매내역을 찾을 수 없습니다."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = SalesSerializer(sale, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        sale = Sales.objects.filter(pk=pk).first()

        if sale is None:
            return Response(
                {"message": "판매내역을 찾을 수 없습니다."},
                status=status.HTTP_404_NOT_FOUND
            )

        sale.delete()

        return Response(
            {"message": "삭제되었습니다."},
            status=status.HTTP_204_NO_CONTENT
        )
class TodosView(APIView):
    authentication_classes = []
    permission_classes = []
    def get(self, request, pk=None):
        if pk is None:
            todos = Todos.objects.all()
            serializer = TodosSerializer(todos, many=True)
            return Response(serializer.data)

        todo = Todos.objects.filter(pk=pk).first()

        if todo is None:
            return Response(
                {"message": "Todo를 찾을 수 없습니다."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = TodosSerializer(todo)
        return Response(serializer.data)

    def post(self, request):
        serializer = TodosSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        todo = Todos.objects.filter(pk=pk).first()

        if todo is None:
            return Response(
                {"message": "Todo를 찾을 수 없습니다."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = TodosSerializer(todo, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        todo = Todos.objects.filter(pk=pk).first()

        if todo is None:
            return Response(
                {"message": "Todo를 찾을 수 없습니다."},
                status=status.HTTP_404_NOT_FOUND
            )

        todo.delete()

        return Response(
            {"message": "삭제되었습니다."},
            status=status.HTTP_204_NO_CONTENT
        )