from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers.common import MusicalSerializer
from .serializers.populated import PopulatedMusicalSerializer
from .models import Musical
from lib.exceptions import exceptions

# Create your views here.
class MusicalListView(APIView):
    @exceptions
    def get(self, request):
        musicals = Musical.objects.all()
        serialized_musicals = PopulatedMusicalSerializer(musicals, many=True)
        return Response(serialized_musicals.data)

class SingleMusicalView(APIView):
    @exceptions
    def get(self, request, pk):
        musical = Musical.objects.get(pk=pk)
        serialized_musical = PopulatedMusicalSerializer(musical)
        return Response(serialized_musical.data)