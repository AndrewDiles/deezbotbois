function debounce (cpuIntensiveFunction, delay) {
	let timeout;
	return function() {
		let context = this, args = arguments;
		let recursiveFunction = function() {
			timeout = null;
			cpuIntensiveFunction.apply(context, args);
		}
		let call = !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(recursiveFunction,delay);
		if (call) cpuIntensiveFunction.apply(context, args);
	}
}
export default debounce;
// debounce function follows David Walsh's example - see https://davidwalsh.name/javascript-debounce-function