from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Message
from .serializers.common import MessageSerializer
from .serializers.populated import PopulatedMessageSerializer
from lib.exceptions import exceptions
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q

# Create your views here.
class MessageView(APIView):
    permission_classes = (IsAuthenticated, )
    @exceptions
    def get(self, request, pk):
        message = Message.objects.filter(Q(owner=request.user.id) | Q(recipient=request.user.id))
        serialized_message = PopulatedMessageSerializer(message, many=True)
        return Response(serialized_message.data)
    
    def post(self, request, pk):
        message_to_send = MessageSerializer(data={ **request.data, 'owner': request.user.id, 'recipient': pk })
        message_to_send.is_valid(raise_exception=True)
        message_to_send.save()
        return Response(message_to_send.data, status.HTTP_201_CREATED)