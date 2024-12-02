"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# backend/urls.py
# backend/urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from core.views import PostViewSet, TagViewSet
from rest_framework.authtoken.views import obtain_auth_token
from core.views import UserDetailView, PublicPostView
from django.http import JsonResponse
from core.models import Post # type: ignore
from core.serializers import PostSerializer


router = routers.DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'tags', TagViewSet)

def public_post_list(request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return JsonResponse(serializer.data, safe=False)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'), 
    path('api/user/', UserDetailView.as_view(), name='user-detail'),
    path('public/posts/', public_post_list, name = 'public-post-posts'),

]
