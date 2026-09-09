from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from leave_user.models import *
from leave_user.serializers import *
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import action
# Create your views here.

class UserViews(viewsets.ModelViewSet):
    serializer_class=UserSerializer
    queryset=User.objects.all()

class EmployersProfileView(viewsets.ModelViewSet):
  
    serializer_class=EmployerSerializer
    queryset=Employers.objects.all()

    def perform_create(self, serializer):
        serializer.save(name=self.request.user)

class EmployersLeaveView(viewsets.ModelViewSet):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]
    serializer_class= EmployerLeaveSerializer
    queryset=Employersleave.objects.all()

    def get_queryset(self):

        if self.request.user.is_staff:
            return Employersleave.objects.all()
        
        employer = Employers.objects.get(name=self.request.user)
        return Employersleave.objects.filter(name=employer)


    @action(detail=True, methods=["post"])
    def cancel(self, request, pk=None):

     leave = self.get_object()

     if leave.status != "REQUESTED":
        return Response(
            {"message": "Only requested leave can be cancelled"},
            status=status.HTTP_400_BAD_REQUEST
        )

     leave.status = "CANCELLED"
     leave.save()

     return Response(
        {
            "message": "Leave cancelled successfully",
            "status": leave.status
        },
        status=status.HTTP_200_OK
    )
    @action(detail=True, methods=["post"])
    def approve(self,request,pk=None):
        if not request.user.is_staff:
            return Response(
                {"message":"only admin can approve leave"},
                status=status.HTTP_403_FORBIDDEN
            )
        leave=self.get_object()

        if leave.status != "REQUESTED":
            return Response(
            {"message": "Only requested leave can be approved"},
            status=status.HTTP_400_BAD_REQUEST
        )
        leave.status = "APPROVE"
        leave.save()
        return Response(
        {
            "message": "Leave approved successfully",
            "status": leave.status
        },
        status=status.HTTP_200_OK
    )


    @action(detail=True, methods=["post"])
    def cancelled(self, request, pk=None):
          if not request.user.is_staff:
           return Response(
            {"message": "Only admin can reject leave"},
            status=status.HTTP_403_FORBIDDEN
        )
          leave=self.get_object()


          if leave.status != "REQUESTED":
             return Response(
            {"message": "Only requested leave can be rejected"},
            status=status.HTTP_400_BAD_REQUEST
        )

          leave.status = "CANCELLED"
          leave.save()
          return Response(
                  {
                      "message": "Leave cancelled successfully",
                      "status": leave.status
                  },
                  status=status.HTTP_200_OK)




    def update(self, request, *args, **kwargs):
        return Response( {"message": "Update not allowed"},status=status.HTTP_405_METHOD_NOT_ALLOWED)

