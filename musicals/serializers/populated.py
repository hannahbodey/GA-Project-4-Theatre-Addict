from .common import MusicalSerializer
from genres.serializers.common import GenreSerializer
from price_range.serializers.common import PriceSerializer

class PopulatedMusicalSerializer(MusicalSerializer):
    genre = GenreSerializer(many=True)
    price_range = PriceSerializer(many=True)