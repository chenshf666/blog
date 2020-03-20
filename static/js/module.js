let m = {
	name:'weige',
	age:666,
};
export {m};


setTimeout(()=>{
	m.age = 1000;
},1000);


setTimeout(()=>{
	console.log(m.age);
},4000);