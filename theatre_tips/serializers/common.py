from rest_framework.serializers import ModelSerializer
from ..models import Tips

class TipsSerializer(ModelSerializer):
    
    class Meta:
        model = Tips
        fields = '__all__'