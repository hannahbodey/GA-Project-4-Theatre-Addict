from rest_framework.serializers import ModelSerializer
from ..models import Musical

class MusicalSerializer(ModelSerializer):
    
    class Meta:
        model = Musical
        fields = '__all__'