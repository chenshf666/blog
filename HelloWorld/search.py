# -*- coding: utf-8 -*-
 
from django.http import HttpResponse
from django.shortcuts import render
 
# 表单
def search_form(request):
    return render(request,'search_form.html')
 


