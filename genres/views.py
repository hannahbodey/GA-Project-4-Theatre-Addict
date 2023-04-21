from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Genre
from .serializers.common import GenreSerializer
from musicals.models import Musical
from musicals.serializers.populated import PopulatedMusicalSerializer

# Create your views here.
class GenreView(APIView):
    def get(self, request, pk):
        musical = Musical.objects.get(pk=pk)
        print('you have hit the get genres route')
        serialized_musical = PopulatedMusicalSerializer(musical)
        print(serialized_musical)
        genre = Genre.objects.filter(production=musical.id)
        serialized_genre = GenreSerializer(genre)
        return Response(serialized_genre.data)