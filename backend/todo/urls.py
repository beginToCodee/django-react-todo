from django.urls import path
from .views import *


urlpatterns = [
	path('', TodoListView.as_view()),
	path('<int:pk>/',TodoDetailView.as_view()),
	path('users/',UserList.as_view()),
	path('users/<int:user_id>/',UserDetail.as_view()),
	path("login/",UserLogin.as_view()),
	path("logout/",UserLogout.as_view()),
	path('signup/',UserRegister.as_view()),
	path('check-auth/',IsLoggedIn.as_view()),
	path('upload-avatar/',UploadAvatar.as_view()),
]