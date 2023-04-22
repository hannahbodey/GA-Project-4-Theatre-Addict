from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Message
from .serializers.common import MessageSerializer
from .serializers.populated import PopulatedMessageSerializer
from lib.exceptions import exceptions
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class MessageView(APIView):
    permission_classes = (IsAuthenticated, )
    @exceptions
    def get(self, request):
        message = Message.objects.all()
        serialized_message = PopulatedMessageSerializer(message, many=True)
        return Response(serialized_message.data)
    
    def post(self, request):
        message_to_send = MessageSerializer(data={ **request.data, 'owner': request.user.id })
        message_to_send.is_valid(raise_exception=True)
        message_to_send.save()
        return Response(message_to_send.data, status.HTTP_201_CREATED)