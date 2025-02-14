from django.db import models

# import user to extend and add points
from django.contrib.auth.models import User

# Models : 

# - USER model with points
class UserProfile(User):
    points = models.PositiveIntegerField(default=0, null=True, blank=True)


# Categories & sub-categores
class Category(models.Model):
    title = models.CharField(max_length=50)
    date_created = models.DateField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return self.title
    

class SubCategory(models.Model):
    title = models.CharField(max_length=50)
    date_created = models.DateField(auto_now_add=True, null=True, blank=True)
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


# APP or Website model
class App(models.Model):
    title = models.CharField(max_length=50)
    points = models.PositiveIntegerField(default=0)
    img = models.ImageField(upload_to="appImg", null=True, blank=True)
    url = models.URLField()
    categories = models.ManyToManyField(Category, blank=True)
    sub_categoies = models.ManyToManyField(SubCategory, blank=True)
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

    def __str__(self):
        return f"{self.user_id} {self.app_id}"
