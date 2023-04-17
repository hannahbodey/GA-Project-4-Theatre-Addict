from rest_framework.serializers import ModelSerializer
from ..models import Price

class PriceSerializer(ModelSerializer):
    class Meta:
        model = Price
        fields = '__all__'