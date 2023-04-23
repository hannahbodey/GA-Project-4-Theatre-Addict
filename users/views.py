from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers.common import UserSerializer
from .serializers.profileupdate import UpdatedUserSerializer
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from datetime import datetime, timedelta
from django.conf import settings
import jwt
from lib.exceptions import exceptions
from django.contrib.auth import get_user_model
User = get_user_model()

# Create your views here.
class RegisterView(APIView):
    @exceptions
    def post(self, request):
        user_to_add = UserSerializer(data=request.data)
        user_to_add.is_valid(raise_exception=True)
        user_to_add.save()
        return Response(user_to_add.data, status.HTTP_201_CREATED)
    
class LogInView(APIView):
    @exceptions
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        user_to_login = User.objects.get(email=email)
        # if not user_to_login.check_password(password):
        #     raise PermissionDenied('Unauthorized')
        dt = datetime.now() + timedelta(days=7)
        token = jwt.encode({ 'sub': user_to_login.id, 'exp': int(dt.strftime('%s')) }, settings.SECRET_KEY, algorithm='HS256')
        return Response({ 'message': f'Welcome back, {user_to_login.username}', 'token': token, 'username': user_to_login.username })
    
class ProfileView(APIView):
    permission_classes =  (IsAuthenticated, )
    @exceptions
    def get(self, request):
        user_to_display = User.objects.filter(id=request.user.id)
        serialized_user = UserSerializer(user_to_display, many=True)
        return Response(serialized_user.data)
    

class UpdateProfileView(APIView):
    permission_classes = (IsAuthenticated, )
    @exceptions
    def put(self, request, pk):
        # user_to_update = User.objects.filter(id=request.user.id)
        user_to_update = User.objects.get(pk=pk)
        # updated_user = { *user_to_update, request.data }
        serialized_user = UpdatedUserSerializer(user_to_update, request.data, partial=True)
        serialized_user.is_valid(raise_exception=True)
        serialized_user.save()
        return Response(serialized_user.data, status.HTTP_202_ACCEPTED)