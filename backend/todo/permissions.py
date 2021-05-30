from rest_framework.permissions import BasePermission


class IsOwnerOnly(BasePermission):

	def has_object_permission(self,request,view,obj):
		print(request.user==obj.owner)
		return request.user==obj.owner or request.user.is_superuser