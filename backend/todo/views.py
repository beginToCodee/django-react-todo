from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Todo
from .serializers import *
from rest_framework import status
from django.http import Http404
from django.contrib.auth.models import User
from rest_framework.authentication import SessionAuthentication,BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import check_password,make_password
from django.contrib.auth import login,logout
from rest_framework.exceptions import APIException
from .permissions import IsOwnerOnly



# Create your views here.


class TodoListView(APIView):
	authentication_classes = [SessionAuthentication,BasicAuthentication]
	permission_classes = [IsAuthenticated]
	def get(self,request):
		if request.user.is_superuser:
			todos = Todo.objects.all()
		else:
			todos = Todo.objects.filter(owner=request.user)
		serializer = TodoSerializer(todos,many=True)
		return Response(serializer.data,status=status.HTTP_200_OK)

	def post(self,request):
		data = request.data
		# print(request.user)
		data['owner']=request.user.id
		serializer = TodoSerializer(data=data)
		# print(serializer)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data,status=status.HTTP_201_CREATED)
		return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class TodoDetailView(APIView):
	authentication_classes = [SessionAuthentication,BasicAuthentication]
	permission_classes = [IsAuthenticated,IsOwnerOnly]
	def get_object(self,pk):

		try:
			todo = Todo.objects.get(pk=pk)
			self.check_object_permissions(self.request, todo)
			return todo
		except Todo.DoesNotExist:
			raise Http404
	def get(self,request,pk):
		todo = self.get_object(pk)
		serializer = TodoSerializer(todo)
		return Response(serializer.data,status=status.HTTP_200_OK)

	def put(self,request,pk):
		todo = self.get_object(pk)
		serializer = TodoSerializer(todo,data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data,status=status.HTTP_200_OK)
		return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

	def delete(self,request,pk):
		todo = self.get_object(pk)
		todo.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)
		



class UserList(APIView):
	def get(self,request):
		users = User.objects.all()
		serializer = UserSerializer(users,many=True)

		return Response(serializer.data,status=status.HTTP_200_OK)



class UserDetail(APIView):
	authentication_classes = [SessionAuthentication,BasicAuthentication]
	permission_classes = [IsAuthenticated]

	def get_object(self,user_id):
		try:
			user = User.objects.get(id=user_id)
			# self.check_object_permissions(self.request, user.profile)
			return user
		except :
			pass

	def get(self,request,user_id):
		user = self.get_object(user_id)
		serializer = UserSerializer(user,many=False)
		return Response(serializer.data,status=status.HTTP_200_OK)

	def put(self,request,user_id):
		user = self.get_object(user_id)
		serializer = UserSerializer(user,data=request.data,partial=True)
		if serializer.is_valid():
			
			user = serializer.save()
			
			return Response(serializer.data,status=status.HTTP_200_OK)
		return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
	def post(self,request):
		serializer = LoginSerializer(data=request.data)
		if serializer.is_valid():
			user = serializer.validated_data['user']
			login(request,user)
			user=request.user
			serializer = UserSerializer(user,many=False)
			return Response(serializer.data,status=status.HTTP_200_OK)
		return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class UserLogout(APIView):
	authentication_classes = [SessionAuthentication,BasicAuthentication]
	permission_classes = [IsAuthenticated]
	def get(self,request):
		user =request.user
		logout(request)
		message = {'detail':"Successfully Logout the user"}
		return Response(message,status=status.HTTP_200_OK)




class UserRegister(APIView):
	def post(self,request):

		serializer = SignUpSerializer(data=request.data)
		if serializer.is_valid():
			data = dict(serializer.validated_data)
			user = User(username=data['username'],password=data['password'])
			user.save()
			login(request,user)
			serializer = UserSerializer(user,many=False)
			
			return Response(serializer.data,status=status.HTTP_201_CREATED)

		return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)




class IsLoggedIn(APIView):
	authentication_classes = [SessionAuthentication,BasicAuthentication]
	permission_classes = [IsAuthenticated]
	def get(self,request):

		serializer = UserSerializer(request.user,many=False)
		
		return Response(serializer.data,status=status.HTTP_200_OK)




class UploadAvatar(APIView):
	authentication_classes = [SessionAuthentication,BasicAuthentication]
	permission_classes = [IsAuthenticated]
	def post(self,request):
		profile = request.user.profile
		print(type(request.FILES.get('avatar')))
		profile.avatar = request.FILES.get('avatar')
		profile.save()
		serializer = UserSerializer(profile.user,many=False)

		return Response(serializer.data,status=status.HTTP_206_PARTIAL_CONTENT)

