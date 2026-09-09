from django.db import models
from django.contrib.auth.models import User 
    


# Create your models here.

class Employers(models.Model):
    name=models.OneToOneField(User,on_delete=models.CASCADE,related_name="names")
    company=models.CharField(max_length=100)
    position=models.CharField(max_length=100)
    created_at=models.DateTimeField(auto_now_add=True)

class Employersleave(models.Model):
    leave_status=[("APPROVE","approve"),
                  ("REQUESTED","requested"),
                  ("CANCELLED","cancelled")
                  ]
    name=models.ForeignKey(Employers,on_delete=models.CASCADE,related_name="name_relation")
    reason=models.CharField(max_length=400,null=False)
    howmany_days=models.IntegerField(null=False,)
    created_at=models.DateTimeField(auto_now_add=True)
    leave_taken=models.DateField(null=False)
    end_leave=models.DateField(null=False)
    status=models.CharField(choices=leave_status,default="REQUESTED")