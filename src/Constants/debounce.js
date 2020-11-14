function debounce(func, wait, immediate) {
	var timeout;
	return function(...args) {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) {
				func.apply(context, args);
			}
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
export default debounce;
// debounce function copied from David Walsh's example - see https://davidwalsh.name/javascript-debounce-function