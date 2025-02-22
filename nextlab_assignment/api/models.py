from django.db import models

# import user to extend and add points
from django.contrib.auth.models import User

# Models : 

# # - USER model with points
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")

    role_choices = [('admin', 'Admin'), ('user', 'User')]

    role = models.CharField(max_length=20, choices=role_choices, default='user')

    points = models.PositiveIntegerField(default=0, null=True, blank=True)

    def __str__(self):
        return f"{self.user.username}'s profile"



# Categories & sub-categores
class Category(models.Model):
    title = models.CharField(max_length=50)
    date_created = models.DateField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return self.title
    

class SubCategory(models.Model):
    title = models.CharField(max_length=50)
    date_created = models.DateField(auto_now_add=True, null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.title


# APP or Website model
class App(models.Model):
    title = models.CharField(max_length=50)
    points = models.PositiveIntegerField(default=0)
    img = models.URLField(null=True, blank=True)
    url = models.URLField()
    categories = models.ManyToManyField(Category, blank=True)
    sub_categories = models.ManyToManyField(SubCategory, blank=True)
    is_active = models.BooleanField(default=True)
    date_created = models.DateField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return self.title



# Download History of app, to check if user already downloaded the app or not
class DownloadHistory(models.Model):
    app_id = models.ForeignKey(App, on_delete=models.CASCADE, related_name="download_history_app")

    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="download_history_user")
    
    date = models.DateTimeField(auto_now_add=True)

    points_earned = models.PositiveIntegerField()

    is_verified = models.BooleanField(default=False)

    user_screenshot = models.URLField(unique=True)

    def __str__(self):
        return f"{self.user_id} {self.app_id}"



