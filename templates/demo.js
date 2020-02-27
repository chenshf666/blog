// 在函数中不声明变量直接使用会导致创建全局变量
function test0(){var message='hello';}
function test1(){message = 'hi';}

test1();test0();console.log(message);

//Number类型最大最小值
Number.MAX_VALUE,Number.MIN_VALUE
Number.POSITIVE_INFINITY,Number.NAGATIVE_INFINITY

//任何涉及NaN的操作都会返回false，因此使用isNaN
console.log('NaN==NaN',NaN==NaN)
console.log('isNaN(10)',isNaN(10))
console.log('isNaN("10")',isNaN("10"))
console.log('isNaN("0x10f")',isNaN("0x10"))
console.log('isNaN("a0x10")',isNaN("a0x10"))
console.log('isNaN("10better")',isNaN("0x10e"))
console.log('isNaN(NaN)',isNaN(NaN))


var num = 0;
outermost:
for(var i = 0; i < 10; i++){
	for(var j = 0 ; j < 10; j++){
		if(j==1){
			continue outermost;
		}
		num++;
	}
}

console.log(num);

//不建议使用with
o = new Object();
o['a'] = 'abcd';
o['b'] = 'bcde';

with(o){
	console.log(a)
	console.log(b)
}

//使用arguments访问参数列表
function showArguments(a,b,c,d,e){
	console.log(arguments.length);
}

showArguments('aaa',1,2,3);
showArguments('bbb','3');

//ECMAScript 中的所有参数传递的都是值，不可能通过引用传递参数。
var a = [1,2,3];
function test_para_pass(a){
	a[0] = 11;
}

test_para_pass(a);
console.log(a);