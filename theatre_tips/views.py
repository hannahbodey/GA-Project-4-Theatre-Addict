from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Tips
from musicals.models import Musical
from .serializers.common import TipsSerializer
from .serializers.populated import PopulatedTipsSerializer
from lib.exceptions import exceptions
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly

# Create your views here.
class TipsView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    @exceptions
    def get(self, request, pk):
        musical = Musical.objects.get(pk=pk)
        tips = Tips.objects.filter(production=musical.id)
        serialized_tips = PopulatedTipsSerializer(tips, many=True)
        # This at least works, but it brings back all the comments.
        # tips = Tips.objects.all()
        # serialized_tips = TipsSerializer(tips, many=True)
        return Response(serialized_tips.data)
    
    def post(self, request, pk):
        tip_to_add = TipsSerializer(data={ **request.data, 'owner': request.user.id, 'production': pk })
        tip_to_add.is_valid(raise_exception=True)
        tip_to_add.save()
        return Response(tip_to_add.data, status.HTTP_201_CREATED)

class SingleTipView(APIView):
    permission_classes = (IsAuthenticated, )
    @exceptions
    def put(self, request, pk):
        tip_to_update = Tips.objects.get(pk=pk)
        if tip_to_update.owner != request.user:
            raise PermissionDenied()
        serialized_tip = TipsSerializer(tip_to_update, request.data, partial=True)
        serialized_tip.is_valid(raise_exception=True)
        serialized_tip.save()
        return Response(serialized_tip.data, status.HTTP_202_ACCEPTED)