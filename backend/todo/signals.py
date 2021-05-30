


from django.dispatch import receiver
from django.db.models.signals import pre_save,post_save
from todo.models import Profile
from django.contrib.auth.models import User


@receiver(post_save,sender=User)
def createProfile(sender,**kwargs):
	instance = kwargs.get('instance')
	# print(instance)
	profile = Profile.objects.filter(user=instance).first()
	if profile is None:
		profile = Profile(user=instance)
		profile.save()
