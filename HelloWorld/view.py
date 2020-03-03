from django.shortcuts import render
from django.http import HttpResponse
import os
from django.views.decorators.clickjacking import xframe_options_exempt
from django.views.decorators.clickjacking import xframe_options_deny
from django.views.decorators.clickjacking import xframe_options_sameorigin

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))



def hello(request):
    context          = {}
    context['hello'] = 'Hello World!'
    context['a'] = 3
    context['b'] = 2
    context['athlete_list'] = ['打怪','种田','放牧']
    return render(request, 'hello.html', context)

def home(request):
    ren = render(request,'home.html',{})
    print(ren['Content-Type'])
    return ren

def htmlcss(request):
    return render(request,'htmlcss.html',{})

def js(request):
    return render(request,'js.html',{})

def blog_submit(request):
    if request.method == 'POST':
        myFile = request.FILES.get("f", None)
        if myFile:
            dir = os.path.join(os.path.join(BASE_DIR, 'static'),'images')
            destination = open(os.path.join(dir, myFile.name),
                               'wb+')
            for chunk in myFile.chunks():
                destination.write(chunk)
            destination.close()
    return render(request,'home.html',{})


@xframe_options_exempt
def frame(request):
    return render(request,request.path_info[1:]+'.html',{})

def all(request):
    return render(request,request.path_info[5:]+'.html',{})

def form(request):
    return render(request,'form.html',{});

def xdm(request):
    return render(request,'xdm.html',{});

    # 接收请求数据
def search(request):
    request.encoding='utf-8'
    if 'q' in request.GET and request.GET['q']:
        message = '你搜索的内容为: ' + request.GET['q']
    else:
        message = '你提交了空表单'
    return HttpResponse(message)


def jsonp(request):
    callbackFunction = request.GET['callback'];
    return HttpResponse(callbackFunction+"({name:'chenshf',age:17})");


from dwebsocket.decorators import accept_websocket
@accept_websocket
def socket(request):
    if request.is_websocket():
        print('1')
        request.websocket.send('下载完成'.encode('utf-8'))
        msg = request.websocket.wait()
        print('-----',msg,'-------')
        ms = request.websocket.wait()
        print('-----',ms,'-------')
    #while True:
    #    continue

#dwebsocket有两种装饰器：require_websocket和accept_websocekt，使用require_websocket装饰器会导致视图函数无法接收导致正常的http请求，一般情况使用accept_websocket方式就可以了，
# 
# dwebsocket的一些内置方法：
# 
# request.is_websocket（）：判断请求是否是websocket方式，是返回true，否则返回false
# request.websocket： 当请求为websocket的时候，会在request中增加一个websocket属性，
# WebSocket.wait（） 返回客户端发送的一条消息，没有收到消息则会导致阻塞
# WebSocket.read（） 和wait一样可以接受返回的消息，只是这种是非阻塞的，没有消息返回None
# WebSocket.count_messages（）返回消息的数量
# WebSocket.has_messages（）返回是否有新的消息过来
# WebSocket.send（message）像客户端发送消息，message为byte类型