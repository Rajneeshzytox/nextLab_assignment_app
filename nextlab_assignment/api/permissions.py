from rest_framework import permissions

# iF user -> user_profile -> role == admin, 
# then return true

# For Checking if user is admin or not

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return request.user.profile.role == 'admin'
        return False
