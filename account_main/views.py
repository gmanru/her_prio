from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response

# from rest_framework.authtoken.views import ObtainAuthToken
# from rest_framework.authtoken.models import Token
from django.contrib.auth import logout, get_user_model
from rest_framework.permissions import AllowAny

from account_main.models import AppUser
import jwt
import bcrypt
import json
import sys

from django.utils.decorators import method_decorator

from account_main import forms
import datetime
import json

# from .serializers import MyTokenObtainPairSerializer, AppUserSerializer
# from rest_framework_simplejwt.tokens import RefreshToken


# Google: django class based views

# class RegistrationView(CreateView):
#     def get_object(self, object, id):
#         return User.objects.get(user_id=id)

#     def get(self, request):
#         existing_user = self.get_object(request.POST.get("user_id"))

#     def post(self, request):
#         pass

class LogoutSessionView(APIView):

    def post(self, request, *args, **kwargs):
        logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)


# Create your views here.
@csrf_exempt
def signup(request):
    if request.method == 'POST':
        try:
            params = json.loads(request.body)
            # print(params)
            first_name = params['first_name']
            last_name = params['last_name']
            username = params['username']
            email = params['email']
            phone = params['phone']
            password = params['password']

            # password = bytes(password, encoding='utf-8')
            # hashed_password = bcrypt.hashpw(password, bcrypt.gensalt(rounds=15))

            user = User.objects.filter(email=email)
            print("user")
            print(len(user))
            if len(user) > 1:
                return JsonResponse({'err':'true', 'message' : 'Email Already Taken'})
            else:
                user = User.objects.filter(username=username)
                if len(user) > 1:
                    return JsonResponse({'err':'true', 'message' : 'Username Already Taken'})
                else:
                    password = bytes(password, encoding='utf-8')
                    hashed_password = bcrypt.hashpw(password, bcrypt.gensalt(14))
                    payload = {"first_name":first_name, "last_name":last_name, "email":email, "phone":phone, "username":username}

                    encoded_jwt = jwt.encode(payload, 'secret', algorithm='HS256')

                    # data = json.dumps(encoded_jwt, default=str)
                    data = encoded_jwt.decode('utf-8')
                    # print(data)
                    user = User(first_name=first_name, last_name=last_name, username=username, email=email, password=hashed_password, phone=phone)
                    user.save()
                    return JsonResponse({'err':'false', 'message':'Sign Up Successful', 'data':data})
        except Exception as err:
            errMessage = f"Oops! {sys.exc_info()[1]}"
            return JsonResponse({'err':'true', 'message' : errMessage})            

@csrf_exempt
def signin(request):
    if request.method == 'POST':
        try:
            params = json.loads(request.body)
            print(params)
            username = params['username']
            password = params['password']
            password = bytes(params['password'], encoding='utf-8')

            user = User.objects.filter(username=username)
            if len(user) == 0:
                return JsonResponse({'err':'true', 'message' : 'User Does not Exist'})
            else:
                user_details = list(user.values())
                # print(user_details[0]['password'])
                hashed = user_details[0]['password'] #it gives me a string which have the byte array
                hashed = bytes(hashed, 'utf-8') # i convert this staring into bytes
                print(hashed[2:-1]) 
                hashed = hashed[2:-1] # slice the b forn the prefix and got the original byte hashed array
                # print(type(hashed.decode('utf-8')))
                # print(bytes(hashed, 'utf-8'))
                print(password)
                # print(password.encode('utf-8'))
                # print(bytes(params['password'], encoding='utf-8'))
                # checked = bcrypt.checkpw(password, hashed)
                # password.encode('utf-8'), hashed_password.encode('utf-8')
                # print(checked)
                if bcrypt.checkpw(password, hashed):
                    first_name = user_details[0]['first_name']
                    last_name = user_details[0]['last_name']
                    email = user_details[0]['email']
                    phone = user_details[0]['phone']
                    username = user_details[0]['username']
                    payload = {"first_name":first_name, "last_name":last_name, "email":email, "phone":phone, "username":username}
                    encoded_jwt = jwt.encode(payload, 'secret', algorithm='HS256')
                    data = encoded_jwt.decode('utf-8')
                    return JsonResponse({'err':'false', 'message' : 'User Exists and password matched', 'data':data})
                else:
                    return JsonResponse({'err':'true', 'message' : 'Wrong Password'})
        except Exception as err:
            errMessage = f"Oops! {sys.exc_info()[1]}"
            return JsonResponse({'err':'true', 'message' : errMessage})

# +79126017665
# Zxcvbn1029

class AppUserCreate(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, format='json'):
        serializer = AppUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class LogoutAndBlacklistRefreshTokenForUserView(APIView):
#     permission_classes = (AllowAny,)
#     authentication_classes = ()

#     def post(self, request):
#         try:
#             refresh_token = request.data["refresh_token"]
#             token = RefreshToken(refresh_token)
#             token.blacklist()
#             return Response(status=status.HTTP_205_RESET_CONTENT)
#         except Exception as e:
#             return Response(status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        success = False
        params = request.data
        print("PPPPPPPPARAMAS:    ", params)
        if request.session.get("token") == None and params != {}:
            request.session['token'] = params.get("token")
            
            request.session.modified = True
            success = True

        return Response({"user": "asdasd"})

class LogoutView(APIView):
    def get(self, request):
        success = False
        print("СЕССИЯ: ", request.session)
        if request.session.get("token"):
            print("РАЗ        ЛОГИНИВАЕМСЯ", request.session.get("token"))
            del request.session['token']
            success = True

        return Response({"user": "asdasd"})

@csrf_exempt
def login(request):
    success = False
    params = json.loads(request.body)
    if request.method == 'POST' and request.session.get("token") == None and params != {}:
        request.session['token'] = params.get("token")
        
        request.session.modified = True
        success = True
        
    return JsonResponse({'status': 'ok', 'success': success})

@csrf_exempt
def logout(request):
    success = False
    print("СЕССИЯ: ", request.session)
    if request.method == 'GET' and request.session.get("token"):
        print("ИЗИ РАЗ        ЛОГИНИМСЯ", request.session.get("token"))
        del request.session['token']
        success = True

    return JsonResponse({'status': 'ok', 'success': success})

@csrf_exempt
def set_user_data(request):
    success = False
    request_params = json.loads(request.body.decode('utf-8'))
    print("REQUESSSSSSSSSSSST: ", json.loads(request.body.decode('utf-8')))
    if request.method == 'POST':
        user_id = request_params.get("user_id")
        first_name = request_params.get("first_name")
        print("DDDDDDDDD:     ", first_name)
        last_name = request_params.get("last_name")
        username = "USERNAME"
        email = request_params.get("email")

        
        user, created = User.objects.get_or_create(user_id=request_params.get("user_id"))

        birthday = '2000-1-1'
        if request_params.get("birthday") != "":
            birthday = request_params.get("birthday")

        phone = request_params.get("phone")
        avatar = request_params.get("avatar")

        user.first_name = first_name
        user.last_name = last_name
        user.username = username
        user.email = email
        user.birthday = birthday
        user.phone = phone
        user.avatar = avatar

        user.save()

        success = True

    return JsonResponse({'success': success})
