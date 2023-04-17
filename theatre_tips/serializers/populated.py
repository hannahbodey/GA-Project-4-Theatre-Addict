from .common import TipsSerializer
from musicals.serializers.common import MusicalSerializer
from users.serializers.common import UserSerializer

class PopulatedTipsSerializer(TipsSerializer):
    owner = UserSerializer()
    # production = MusicalSerializer(many=True)
    #Probably don't want it to return production as well, since it will be on the production page so this should already be showing!