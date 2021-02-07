from django.db import models
from django.contrib.auth.models import User


class Lead(models.Model):
  name = models.CharField(max_length=250)
  email = models.CharField(max_length=180, unique=True)
  message = models.CharField(max_length=500, blank=True)
  created_at = models.DateTimeField(auto_now_add=True)

  owner = models.ForeignKey(User, related_name='leads', on_delete=models.CASCADE, null=True)

  class Meta:
    ordering = ['-created_at']