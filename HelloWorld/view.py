from django.shortcuts import render
from django.http import HttpResponse
import os


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def hello(request):
    context          = {}
    context['hello'] = 'Hello World!'
    context['a'] = 3
    context['b'] = 2
    context['athlete_list'] = ['打怪','种田','放牧']
    return render(request, 'hello.html', context)


def home(request):
	return render(request,'home.html',{})

def htmlcss(request):
    return render(request,'htmlcss.html',{})

def js(request):
    return render(request,'js.html',{})

def blog_submit(request):
    if request.method == 'POST':
        myFile = request.FILES.get("f", None)
        if myFile:
            dir = os.path.join(os.path.join(BASE_DIR, 'static'),'profiles')
            destination = open(os.path.join(dir, myFile.name),
                               'wb+')
            for chunk in myFile.chunks():
                destination.write(chunk)
            destination.close()
    return render(request,'home.html',{})


def frame(request):
    return render(request,request.path_info[1:]+'.html',{})