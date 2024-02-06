from django.db import models


# Create your models here.
class Todo(models.Model):
    body = models.CharField(max_length=300)
    completed = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.body)
