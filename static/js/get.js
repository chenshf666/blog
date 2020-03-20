import { m } from './module.js';

console.log(m);

setTimeout(()=>{
	console.log(m.age);
},2000);


setTimeout(()=>{
	m.age = 3000;
},3000);