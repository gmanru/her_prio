# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers, routers, viewsets
from .models import AppUser

# Serializers define the API representation.
# ...
class AppUserSerializer(serializers.ModelSerializer):
    """
    Currently unused in preference of the below.
    """
    email = serializers.EmailField(
        default=""
    )
    username = serializers.CharField()
    # password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = AppUser
        fields = ('email', 'username')
        # extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)  # as long as the fields are the same, we can just use this
        # if password is not None:
        #     instance.set_password(password)
        instance.save()

        return instance


# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

#     @classmethod
#     def get_token(cls, user):
#         token = super(MyTokenObtainPairSerializer, cls).get_token(user)

#         # Add custom claims
#         token['fav_color'] = user.fav_color
#         return token
