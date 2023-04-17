from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class MusicalListView(APIView):
    def get(self, request):
        print('get musicals end point hit')
        return Response('you hit the endpoint')
    
class SingleMusicalView(APIView):
    def get(self, request, pk):
        print('get one musical end point hit')
        return Response('you hit the get single musical endpoint')