window.onload = function(){

var myform = document.getElementById('myform');
var pwd = document.getElementById('password');
var textbox = myform.elements['text'];

pwd.addEventListener('focus',function(event){
	//event.target.select();
	event.target.setSelectionRange(0,4);
})



	// 选择和剪切板

	textbox.addEventListener('select',function(event){
		console.log(textbox.value.slice(textbox.selectionStart, textbox.selectionEnd));
	})

	textbox.addEventListener('copy',function(event){
		var clipboardData = (event.clipboardData || window.clipboardData);
		//console.log(clipboardData);
		console.log(clipboardData.setData('text/plain','复制个鸡儿')); //chrome
		console.log(clipboardData.setData('text','复制个鸡儿')); //ie
		event.preventDefault();
	})

	textbox.addEventListener('beforepaste',function(event){
		var clipboardData = (event.clipboardData || window.clipboardData);
		console.log('beforepaste');
		//var data = clipboardData.getData('text/plain');
		console.log(clipboardData.setData('text/plain','粘贴个鸡儿')); //chrome
		console.log(clipboardData.setData('text','粘贴个鸡儿')); //ie

		
	})

	textbox.addEventListener('paste',function(event){
		console.log('paste');
		var clipboardData = (event.clipboardData || window.clipboardData);
		//var data = clipboardData.getData('text/plain');
		console.log(clipboardData.setData('text/plain','粘贴个鸡儿')); //chrome
		console.log(clipboardData.setData('text','粘贴个鸡儿')); //ie
		event.preventDefault();
		
	})
	myform.addEventListener('submit',function(event){
		//event.preventDefault();
		console.log(this.elements['username'].value);
		console.log(this.elements['color']);

		//this.elements['submit-btn'].disabled = true;
	})


	//自动切换到下一个元素
	function focus_to_next_ele(event){
		if(this.value.length >= this.maxLength){
			this.nextElementSibling.focus();
		}
	}

	myform.elements['phone1'].onkeyup = focus_to_next_ele;
	myform.elements['phone2'].onkeyup = focus_to_next_ele;
	myform.elements['phone3'].onkeyup = focus_to_next_ele;

	myform.elements['fanju'].addEventListener('change',function(event){
		myform.elements['username'].value = this.value;
	})
	//验证
	//var myform2 = document.getElementById('myform2');
	//myform2.addEventListener('submit',function(event){
	//	if(!myform2.checkValidity()){
	//		alert('表单格式错误');
	//		event.preventDefault();
	//	}
	//})

	var frame0 = window.frames['richedit'];
	var fdoc = frame0.document;
	console.log(frame0);
	frame0.document.designMode = 'on';

	var buttons = document.getElementById('buttons');
	buttons.addEventListener('click',function(event){
		switch(event.target.id){
			case "backcolor":
				var result = prompt('请输入背景颜色');
				fdoc.execCommand("backcolor",false, result);
				break;
			case "bold":
				fdoc.execCommand('bold',false,null);
				break;
		}
	})

	buttons.addEventListener('input',function(event){
		switch(event.target.id){
			case "fontsize":
				fdoc.execCommand("fontsize",false, event.target.value);
				break;
		}
	})

	var myform3 = document.getElementById('richeditform');
	myform3.addEventListener('submit',function(event){
		myform3.elements['comments'].value = fdoc.body.parentNode.innerHTML;
		event.preventDefault();
	})
}
