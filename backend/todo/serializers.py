from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password,check_password




class TodoSerializer(serializers.ModelSerializer):
	# owner = serializers.ReadOnlyField(source='owner.username')
	class Meta:
		model = Todo
		fields = ('id','title','complete','description','created_date','updated_date','owner')


class ProfileSerializer(serializers.ModelSerializer):
	class Meta:
		model = Profile
		fields = ('address','bio','avatar','user','contact')

		read_only_fields = ['user','avatar']



class UserSerializer(serializers.ModelSerializer):
	todo = serializers.PrimaryKeyRelatedField(many=True,queryset=Todo.objects.all())
	profile = ProfileSerializer(many=False)
	class Meta:
		model = User
		fields = ('id','username','todo','first_name','last_name','email','profile')
		read_only_fields = ['todo']


	def update(self,instance,validated_data):
		try:
			profile_data = dict(validated_data.pop('profile'))
		except:
			profile_data = {}
		profile = instance.profile
		instance.first_name = validated_data.get('first_name',instance.first_name)
		instance.last_name = validated_data.get('last_name',instance.last_name)
		instance.email = validated_data.get('email',instance.email)
		instance.save()
		if profile_data:
			# profile_data['user'] = instance.id
			serializer = ProfileSerializer(profile,data=profile_data,partial=True)

			if serializer.is_valid():
				serializer.save()


			else:
				print(serializer.errors)
		# else:
		# 	# profile = instance.profile
		# 	profile.save()
		# profile = Profile.objects.filter(user=instance).first()
		# instance = profile.user
			
		return instance






class SignUpSerializer(serializers.Serializer):
	username = serializers.CharField(max_length=150)
	password = serializers.CharField(max_length=100)
	re_password = serializers.CharField(max_length=100)

	def validate(self,validated_data):
		data = dict(validated_data)
		username = data.get('username','')
		password = data.get('password','')
		re_password = data.get('re_password','')
		if username and password and re_password:
			user = User.objects.filter(username=username).first()
			if user:
				error = {
					'username':["This username is already exists"]
				}
			else:
				if password == re_password:
					if password.isdigit():
						error = {
							'password':["only numeric values is not allowed"]
						}
					elif len(password)<8:
						error = {
							'password':["greater than 7 characters are must required"]
						}
					else:
						validated_data.pop('re_password')
						validated_data['password'] = make_password(validated_data['password'])

						return validated_data

				else:
					error = {
						're_password':["Both password is not match"]
					}
		raise serializers.ValidationError(error)


class LoginSerializer(serializers.Serializer):
	username = serializers.CharField(max_length=150)
	password = serializers.CharField(max_length=100)

	def validate(self,validated_data):
		data = dict(validated_data)
		username = data.get('username','')
		password = data.get('password','')
		if username and password:
			user = User.objects.filter(username=username).first()
			
			if user:
				if check_password(password,user.password):
					validated_data['user'] = user
					# temp_serializer = ProfileSerializer(user.profile,many=False)
					# print(temp_serializer.data)
					return validated_data
				else:
					error = {
					'password':["Password is not match"]
					}
			else:
				error = {
				'username':["This username is not exist"]
				}
		raise serializers.ValidationError(error)







		

		
	

