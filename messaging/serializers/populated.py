from .common import MessageSerializer
from users.serializers.common import UserSerializer

class PopulatedMessageSerializer(MessageSerializer):
    owner = UserSerializer()
    recipient = UserSerializer()