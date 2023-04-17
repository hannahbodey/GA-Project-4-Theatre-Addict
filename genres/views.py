from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class GenreView(APIView):
    def get(self, request):
        print('you have hit the get genres route')
        return Response('you hit the get genre route')