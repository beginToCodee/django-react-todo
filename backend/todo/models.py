from django.db import models


# Create your models here.

class DateTimeTracker(models.Model):
	created_date = models.DateField(auto_now_add=True)
	updated_date = models.DateField(auto_now = True)
	
	# updated_time = models.TimeField(auto_now=True)

	class Meta:
		abstract = True

class Todo(DateTimeTracker):
	title = models.CharField(max_length =100)
	description = models.CharField(max_length=200)
	complete = models.BooleanField(default=False)
	owner = models.ForeignKey('auth.User',related_name='todo',on_delete=models.CASCADE)
	


class Profile(models.Model):
	user = models.OneToOneField('auth.User',on_delete=models.CASCADE,related_name="profile",primary_key=True)
	contact = models.CharField(max_length=20,blank=True)
	bio = models.CharField(max_length=120,blank=True)
	address = models.CharField(max_length=100,blank=True)
	avatar = models.ImageField(upload_to='media/',blank=True)


	def __str__(self):
		return self.user.username

	
