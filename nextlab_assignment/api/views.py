from django.shortcuts import get_object_or_404

# token 
from rest_framework.authtoken.models import Token

from rest_framework.response import Response

# https://www.django-rest-framework.org/api-guide/authentication/#setting-the-authentication-scheme
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

# View set : https://www.django-rest-framework.org/api-guide/viewsets/#viewsets
from rest_framework import viewsets
from rest_framework.views import APIView

# all models adn serializers
from .models import *
from .serializers import *

# is admin check: custom permissions
from .permissions import IsAdmin

############ FORCE SHELL COMMAND RUN ON Render 
# # [WARNING:  IGNORE, just for to run migrations & create super user as free hosting dont provide shell for free accounts, 💸 with great problems, comes great jugaad]
from django.http import HttpResponse
from django.core.management import call_command
# from django.contrib.auth import get_user_model

def run_migrations(request):
    call_command("migrate")
    return HttpResponse("Migrations Applied!")

def run_makemigrations(request):
    try:
        call_command("makemigrations")
        return HttpResponse("Migrations done")
    except Exception as e:
        return HttpResponse(f"An error occurred while creating migrations: {str(e)}")

# def create_superuser(request):
#     User = get_user_model()
#     if not User.objects.filter(username="admin").exists():
#         User.objects.create_superuser(
#             username="admin",
#             email="rajneesh@admin.com",
#             password="Admin" 
#         )
#         return HttpResponse("Superuser Created! Use username: 'admin' and password: 'Admin'.")
#     else:
#         return HttpResponse("Superuser already exists.")




    
class UserProfileUpdateDeleteApiView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, req):
        user  = get_object_or_404(UserProfile, user = req.user)

        # if request for role: 
        if(req.GET.get('role')):
            return Response({"status": "ok", "data": {"role":user.role}})
        
        # if request for points: 
        if(req.GET.get('points')):
            return Response({"status": "ok", "data": {"points":user.points}})
        
        # return all data
        serialized_data = UserProfileSerializer(user)
        return Response({"status": "ok", "data": serialized_data.data})
    

    def delete(self, request):
        user = get_object_or_404(User, username=request.user)
        user.is_active = False
        user.save()
        # deleting token
        token = get_object_or_404(Token, user=user)
        token.delete()
        

        return Response({"status": "ok", "message": "Profile deleted successfully"})

    


#  --------------------------------
# CATEGORY / SUB CATEGEORY viewset
#  --------------------------------
class CategoryViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsAdmin]

    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class SubCategoryViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsAdmin]

    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer




#  --------------------------------
# APP view
#  --------------------------------

# for admin CRUD
class AppViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsAdmin]

    queryset = App.objects.all()
    serializer_class = AppSerializer

# for normal user only get / read only
class GetAppAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated] 

    def get(self, req):
        if(req.GET.get('not-claimed')):
            # get download history -> get apps from it -> return app data exlude from apps in history
            already_downloaded_objects = DownloadHistory.objects.filter(user_id=req.user)

            # get all app from download history
            downloaded_apps = []
            for objects in already_downloaded_objects:
                downloaded_apps.append(objects.app_id.id)

            # apps not in downloaded_apps
            apps = App.objects.exclude(id__in=downloaded_apps).filter(is_active=True)
            serialized_data = AppSerializer(apps, many=True)
            return Response({"status": "ok", "data": serialized_data.data})

        apps = App.objects.all().filter(is_active=True)
        serialized_data = AppSerializer(apps, many=True)

        return Response({"status": "ok", "data": serialized_data.data})

#  --------------------------------
# Download History API view
# it will be get
#  --------------------------------

class DownloadHistoryAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, req):
        histories = DownloadHistory.objects.all().filter(user_id = req.user)
        serialized_data = DownloadHistorySerializer(histories, many=True)
        return Response({"status": "ok", "data": serialized_data.data})
    
# Filter : all Users by app id for admin
class AppUserDownloadHistoryAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, req, appId):

        # user with app but pending
        if(req.GET.get('status') == 'pending'):
            user_with_apps = DownloadHistory.objects.filter(app_id=appId, is_verified=False)
            serialized_data = DownloadHistorySerializer(user_with_apps, many=True)
            return Response({"status": "ok", "data": serialized_data.data})
        
        # user with app but verified
        if(req.GET.get('status') == 'verified'):
            user_with_apps = DownloadHistory.objects.filter(app_id=appId, is_verified=True)
            serialized_data = DownloadHistorySerializer(user_with_apps, many=True)
            return Response({"status": "ok", "data": serialized_data.data})

        # all users with app 
        user_with_apps = DownloadHistory.objects.filter(app_id=appId)
        serialized_data = DownloadHistorySerializer(user_with_apps, many=True)
        return Response({"status": "ok", "data": serialized_data.data})


# ----------------------------------------
# AUTH: 

# Register: add user -> create token -> return tokrn
class RegisterAPIView(APIView):
    def post(self, req): 
        register_serializer = RegisterUserSerializer(data = req.data)
        if not register_serializer.is_valid():
            return Response({"status": "not", "errors": register_serializer.errors})

        user = register_serializer.save()
        token = Token.objects.create(user=user)
        return Response({"status": "ok", "message": "created user successfully", "token": str(token.key), "data": register_serializer.data})

 

# LOGOUT only (post): delete token
class LogoutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, req):
        # user = User.objects.filter(username = req.user).first()
        user = get_object_or_404(User, username=req.user)
        token = get_object_or_404(Token, user=user)
        token.delete()
        return Response({"status": "ok", "message": "Logged out successfully."})
    

# --------------------------------------------------

# Points System : 
#  -- user click on btn, and django will check if already downloaded -> if not downloaded -> reward points
class DownloadAppAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, req, app_id):
        try: 
            app = App.objects.get(id = app_id)
        except:
            return Response({"status": "not", "message": "APP not exists", "errors": "APP not exists"}) 
        
        # also check if app is not active then not reward
        if(not app.is_active):
            return Response({"status": "not", "message": "you cant get points from dead", "errors": "App is inactive"})


        # checking if already in history
        if(DownloadHistory.objects.filter(user_id = req.user, app_id = app)):
            return Response({"status": "not", "message": "Dont be greedy. already in downloaded, if you didnt receive points, wait for admin to verify. or just cry, like me while developing this assignment", "errors": "Already in Downloaed History Wait for admin to verify"})
        
        # checking if screenshto exist
        if(not req.data.get('user_screenshot')):
            return Response({"status": "not", "message": "how we can know if you downloaded the app? upload screenshot"})
        
        # if screenshot already present 
        if(DownloadHistory.objects.filter(user_screenshot=req.data.get('user_screenshot'))):
            return Response({"status": "not", "message": "Please try with different img url, or img name"})



        
        # if not downloaded & screenshot exist, add to history
        download_history = DownloadHistory.objects.create(
            user_id=req.user,
            app_id=app,
            points_earned=app.points,
            user_screenshot = req.data.get('user_screenshot')
        )
        download_history.save()

        # # add pont to user profile, now we will add point through the admin verification
        # user_profile = UserProfile.objects.get(user=req.user)
        # user_profile.points += download_history.points_earned
        # user_profile.save()

        return Response({
            "status": "ok",
            "message": f"point claim req {app.title} confirmed. {download_history.points_earned} points will be awarded after admin verification"
        })
    


# Admin assign points : 
# get user_id, app_id ->  get the downloadHistory object -> update to verified -> give points to USer profile

class AssignPointsApiView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsAdmin]

    def post(self, req) :
        if not (req.data.get('user_id') and req.data.get('app_id')):
            return Response({"status":"not", "message": "provide both user ID and App ID"})
        user_id = req.data.get('user_id')
        app_id = req.data.get('app_id')

        # Download history check if exist:
        # i am not checking if user or app exist btw...
        download_history = DownloadHistory.objects.filter(app_id = app_id, user_id=user_id).first()
        if(not download_history):
            return Response({"status":"not", "message": "Download History with this user_id & app_id not exist"})
        
        # checking if already verified: 
        if(download_history.is_verified):
            return Response({"status":"not", "message": "Wait Wait Wait, User already got the points... you arent rich, & if you are then donate me..."})
        
        # setting verified to true 
        download_history.is_verified = True
        download_history.save()

        # giving points to user 
        user_profile = UserProfile.objects.get(user=user_id)
        user_profile.points += download_history.points_earned
        user_profile.save()

        return Response({
            "status": "ok",
            "message": f"point {download_history.points_earned} assigned to {user_profile.user.username}"
        }) 

