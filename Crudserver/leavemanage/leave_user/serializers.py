from rest_framework import serializers
from django.utils import timezone
from leave_user.models import *
from django.db import transaction
from django.contrib.auth.models import User

# serializer 

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=["username","password"]
    def create(self,validated_data):
          return User.objects.create_user(**validated_data)


class EmployerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Employers
        fields="__all__"
        read_only_fields=["name"]

   


class EmployerLeaveSerializer(serializers.ModelSerializer):
    class Meta:
        model=Employersleave
        fields="__all__"
        read_only_fields=["name","created_at","status"]

    def validate_leave_taken(self,value):
            if value <= timezone.now().date():
                raise serializers.ValidationError("This is a past date")
            return value
    def validate_howmany_days(self,value):
            if value <= 0:
                raise serializers.ValidationError("This days not applicable")
            if value > 7:
                raise serializers.ValidationError("This not availble. its  need medical letter")
            return value
    def validate(self,attrs):
            leave_taken=attrs.get("leave_taken")
            end_leave=attrs.get("end_taken")
            name=attrs.get("name")
            position=attrs.get("position")


            if leave_taken and end_leave:
                if leave_taken > end_leave:
                    raise serializers.ValidationError("This dates is past not applicable")

                
            return attrs

    def create(self,validated_data):
            request=self.context["request"]
            employer=Employers.objects.get(name=request.user)
            validated_data["name"]=employer
            
            return Employersleave.objects.create(**validated_data)   

                