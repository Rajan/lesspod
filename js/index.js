'use strict';

// import another component
import main from './main.js';
import doT from 'dot';
main();
function dotTest() {
	var tempFn = doT.template("<h1>Here is a sample template {{=it.foo}}</h1>");
	var resultText = tempFn({foo: 'with doT'});
	console.log('resultText is ' + resultText);
}
window.onload = function(){
	dotTest();
};
