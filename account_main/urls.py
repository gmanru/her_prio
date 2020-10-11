from django.contrib import admin
from django.urls import path, include, re_path
from account_main import views
# from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('signin/', views.signin, name='signin'),
    path('set_user_data/', views.set_user_data, name="set_user_data"),
    # path('login/', views.login, name="login"),
    # path('logout/', views.LogoutView.as_view(), name="logout"),
    # path('login1/', views.LoginView.as_view(), name="login1"),
    # path('token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='token_create'),  # override sjwt stock token
    # path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('user/create/', views.AppUserCreate.as_view(), name="create_user"),
    # path('blacklist/', views.LogoutAndBlacklistRefreshTokenForUserView.as_view(), name='blacklist'),
    # path('login/', include('rest_social_auth.urls_token')),
    path('lll/', include('social_django.urls')),

    # path('login/', include('rest_social_auth.urls_jwt_pair')),
    # path('login/', include('rest_social_auth.urls_jwt_sliding')),
    # path('login/', include('rest_social_auth.urls_jwt')),
    # path('login/', include('rest_social_auth.urls_knox')),

    # re_path(r'^logout/session/$', views.LogoutSessionView.as_view(), name='logout_session'),
]
