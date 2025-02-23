# Imports
from django.urls import path, include

# login
from rest_framework.authtoken.views import obtain_auth_token

# router for viewsets: 
from rest_framework.routers import DefaultRouter

# Import Views
from .views import *

# ---- Routers ----
router = DefaultRouter()
router.register(r"categories", CategoryViewSet, basename='category')
router.register(r"sub-categories", SubCategoryViewSet, basename='sub-category')
router.register(r"apps", AppViewSet, basename='apps')
# router.register(r"profile", UserProfileViewSet, basename='profile')

# Endpoints
urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name="register"),
    path('login/', obtain_auth_token, name="login"),
    path('logout/', LogoutView.as_view(), name="logout"),

    path('history/', DownloadHistoryAPIView.as_view(), name='history'),
    path('profile/', UserProfileUpdateDeleteApiView.as_view(), name='profile'),
    path('get-apps/', GetAppAPIView.as_view(), name='all-apps'),

    path('verified/', AssignPointsApiView.as_view(), name="assign-points"),
    path('download/<int:app_id>/', DownloadAppAPIView.as_view(), name="download-app"),
    path('user-with/<int:appId>/', AppUserDownloadHistoryAPIView.as_view(), name="history-users-with-app"),

    # routes
    path('', include(router.urls)),
]
