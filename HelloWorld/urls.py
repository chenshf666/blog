"""HelloWorld URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
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
from django.contrib import admin
from django.urls import path,re_path
from django.conf.urls import url

from . import view
from . import testdb,search,search2

from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

urlpatterns = [
    path('',view.home),
    path('htmlcss/',view.htmlcss),
    re_path('^frame',view.frame),
    path('js/',view.js),
    re_path('^jsonp',view.jsonp),
    path('form/',view.form),
    re_path('^new-',view.all),
    
    
    path('register', view.register),
    path('login', view.login),
    path('validate', view.validate),
    path('add_blog', view.add_blog),
    path('get_blogs', view.get_blogs),
    
    path('xdm/',view.xdm),
    path('socket/',view.socket),
    path('blog-submit',view.blog_submit),
    path('hello/', view.hello),
    path('testdb/',testdb.testdb),
    
    url(r'^search-form$', search.search_form),
    url(r'^search$', view.search),
    url(r'^search-post$', search2.search_post),
    url(r'^admin/', admin.site.urls)
]
