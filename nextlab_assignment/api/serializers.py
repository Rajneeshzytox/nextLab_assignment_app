from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *


# user profile
class UserProfileSerializer(serializers.ModelSerializer):
    # user = UserSerializer()
    username = serializers.CharField(source='user.username')
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    email = serializers.CharField(source='user.email')

    class Meta:
        model = UserProfile
        fields = ['username', 'first_name', 'last_name', 'email', 'role', 'points']
        extra_kwargs = {
            'points': {'read_only':True},
            'role': {'read_only':True},
            # 'user': {'read_only':True}, 
            'username': {'read_only':True}, 
        }

# Category
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'title', 'date_created']

# SubCategory
class SubCategorySerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), source='category', write_only=True, required=False)

    class Meta:
        model = SubCategory
        fields = ['id', 'title', 'category', 'date_created', 'category_id']

# App
class AppSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    sub_categories = SubCategorySerializer(many=True, read_only=True)

    
    categories_ids = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        many=True, write_only=True,
        required=False,
        source='categories',
        )
    sub_categories_ids = serializers.PrimaryKeyRelatedField(
        queryset=SubCategory.objects.all(),
        many=True, 
        write_only=True, 
        required=False,
        source='sub_categories',
        
        )

    class Meta:
        model = App
        fields = ['id', 'title', 'points', 'img', 'url',
                  'categories', 'sub_categories', "categories_ids", "sub_categories_ids",
                  'is_active', 'date_created']

# Downloadd History
class DownloadHistorySerializer(serializers.ModelSerializer):
    app = AppSerializer(read_only=True)
    user = serializers.StringRelatedField()

    class Meta:
        model = DownloadHistory
        fields = ['id', 'app', 'user', 'date', 'points_earned']



#  --------------------------------
# REGISTER / LOGIN 
#  --------------------------------

class RegisterUserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ["username", "password", "first_name", "last_name", "email", ]
        extra_kwargs = {"password" : {"write_only":True}}
    
    def create(self, data):
        user = User.objects.create(**data)
        user.set_password(data['password'])
        user.save()

        # creating user profile
        UserProfile.objects.create(user=user)
        
        return user