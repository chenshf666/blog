from django.shortcuts import render,redirect
from django.http import HttpResponse
import os
from django.views.decorators.clickjacking import xframe_options_exempt
from django.views.decorators.clickjacking import xframe_options_deny
from django.views.decorators.clickjacking import xframe_options_sameorigin
from django.views.decorators.cache import cache_control
from TestModel.models import User, Blog



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

@cache_control(must_revalidate=False, max_age=3600)
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
    name = request.path_info[5:];
    if name == 'xss-search':
        print(request.POST['search'])
        return render(request, name+'.html',{'content':request.POST['search']})
    if name == 'cookie':
        rep = render(request, name+'.html',{})
        rep.set_cookie('sid','123456',max_age=100,path='/')
        rep.set_signed_cookie('saltid','1111',salt='iamsalt')
        return rep
    return render(request,name+'.html',{})

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
from django.views.decorators.csrf import csrf_exempt,csrf_protect
import json

def blog(request):
    return render(request,'index.html',{})
@csrf_exempt
def register(request):
    post_content = json.loads(request.body, encoding='utf-8')
    username = post_content['username']
    password = post_content['password']
    if User.objects.filter(username=username):
        return HttpResponse(json.dumps({'status':1,'msg':'已经被注册'}))
    else:
      try:
          user = User(id=User.objects.count(), username=username, password=password)
          user.save()
          return HttpResponse(json.dumps({'status':0,'msg':'注册成功'}))
      except:
          return HttpResponse(json.dumps({'status':2,'msg':'发生异常'}))

import time
import jwt

secret_key = 'hewuifoiwhfijsiodhfijiowioejriioweuroiwueio'

@csrf_exempt
def login(request):
    post_content = json.loads(request.body, encoding='utf-8')
    username = post_content['username']
    password = post_content['password']
    result = User.objects.filter(username=username,password=password)
    if result:
        payload = {
          'id': result[0].id,
          'username':username,
          'exp':int(time.time()+3600) # 有效期3600秒
        }
        encoded = jwt.encode(payload,secret_key,algorithm='HS256')
        token = str(encoded,encoding="utf-8")
        return HttpResponse(json.dumps({'status':0,'msg':'登录成功','token':token}), content_type="application/json")
    else:
        return HttpResponse(json.dumps({'status':1,'msg':'用户名不存在或者密码错误'}), content_type="application/json")

@csrf_exempt
def validate(request):
    post_content = json.loads(request.body, encoding='utf-8')
    token = post_content['token']
    try:
        decoded =jwt.decode(token,secret_key,algorithm='HS256')
    except:
        return HttpResponse(json.dumps({'status':1}))
    username = decoded['username']
    return HttpResponse(json.dumps({'status':0, 'username':username}))
    

@csrf_exempt
def add_blog(request):
    post_content = request.POST#json.loads(request.body, encoding='utf-8')
    token = post_content['token']
    content = post_content['content']
    title = post_content['title']


    try:
        decoded = jwt.decode(token, secret_key, algorithms='HS256')
    except:
        return HttpResponse(json.dumps({'status':1, 'msg':'身份验证失败，请重新登录'}))

    author_id = decoded['id']
    try:
        blog = Blog(author_id=author_id, content=content, title=title, )
        blog.save()

        id = str(blog.id)
        urls = []
        dir = os.path.join(os.path.join(BASE_DIR, 'uploads'), 'images')
        for key in request.FILES:
            img = request.FILES[key]
            destination = open(os.path.join(dir, id+'____'+key),
                                   'wb+')
            for chunk in img.chunks():
                destination.write(chunk)
            destination.close()
            urls.append('/uploads/images/'+id+'____'+key)

        blog.urls = json.dumps(urls)
        blog.save()
        return HttpResponse(json.dumps({'status':0, 'msg':'发布成功'}))
    except Exception as e:
        print(e)
        return HttpResponse(json.dumps({'status':2, 'msg':'发生异常'}))


from django.core import serializers
def get_blogs(request):
    page = int(request.GET['page'])
    author = request.GET['author']
    try:
        if len(author) > 0:
            author_id = User.objects.filter(username=author)[0].id
            queryResult = Blog.objects.filter(author_id=author_id).order_by('-time').all()[page*10:(page+1)*10]
        else:
            queryResult = Blog.objects.order_by('-time').all()[page * 10:(page + 1) * 10]
    except:
        queryResult = []
    blogs = []
    for r in queryResult:
        blogs.append({
            'id':r.id,
            'author':r.author.username,
            'title':r.title,
            'content':r.content[:500],
        })
    json_data = json.dumps(blogs)

    return HttpResponse(json_data)


def get_single_blog(request):
    id = request.GET['id']
    blog = Blog.objects.get(id=id)
    dict = {
        'id':id,
        'author_id':blog.author.id,
        'author':blog.author.username,
        'title':blog.title,
        'content':blog.content,
        'img_urls':blog.urls,
        'create_time':blog.time.strftime('%Y-%m-%d %H:%M:%S'),
    }

    return HttpResponse(json.dumps(dict))

@csrf_exempt
def delete_blog(request):
    post_content = json.loads(request.body, encoding='utf-8')
    id = post_content['id']
    token = post_content['token']
    try:
        decoded = jwt.decode(token, secret_key, algorithm='HS256')
    except:
        return HttpResponse(json.dumps({'status': 1, 'msg':'身份验证失败，请重新登录'}))
    author_id = decoded['id']
    blogs = Blog.objects.filter(id=id,author_id=author_id)
    if blogs:
        try:
            urls = json.loads(blogs[0].urls)
            for path in urls:
                imgPath = os.path.join(BASE_DIR, path[1:])
                if os.path.exists(imgPath):
                    os.remove(imgPath)
            blogs[0].delete()
            return HttpResponse(json.dumps({'status': 0, 'msg': '删除成功'}))
        except:
            return HttpResponse(json.dumps({'status': 2, 'msg': '发生异常'}))
    else:
        return HttpResponse(json.dumps({'status': 1, 'msg': '身份验证失败，请重新登录'}))



