from django.shortcuts import render
 
def hello(request):
    context          = {}
    context['hello'] = 'Hello World!'
    context['a'] = 3
    context['b'] = 2
    context['athlete_list'] = ['打怪','种田','放牧']
    return render(request, 'hello.html', context)
