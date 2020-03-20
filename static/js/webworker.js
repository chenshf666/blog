var i = 0;
function increase(){
	i++;
	postMessage(i);
	setTimeout(increase,1000);
}

increase();