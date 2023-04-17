from .common import MusicalSerializer
from genres.serializers.common import GenreSerializer
from price_range.serializers.common import PriceSerializer
from theatre_tips.serializers.common import TipsSerializer

class PopulatedMusicalSerializer(MusicalSerializer):
    genre = GenreSerializer(many=True)
    price_range = PriceSerializer(many=True)