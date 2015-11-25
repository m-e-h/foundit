// Open the first Tab by default.
var ready = function(fn) {

	// Sanity check
	if (typeof fn !== 'function') return;

	// If document is already loaded, run method
	if (document.readyState === 'complete') {
		return fn();
	}

	// Otherwise, wait until document is loaded
	document.addEventListener('DOMContentLoaded', fn, false);

};


ready(function() {
	var first_tab = document.getElementsByClassName("mdl-tabs__tab")[0];
	var first_panel = document.getElementsByClassName("mdl-tabs__panel")[0];
	first_tab.classList.toggle("is-active");
	first_panel.classList.toggle("is-active");
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIE9wZW4gdGhlIGZpcnN0IFRhYiBieSBkZWZhdWx0LlxudmFyIHJlYWR5ID0gZnVuY3Rpb24oZm4pIHtcblxuXHQvLyBTYW5pdHkgY2hlY2tcblx0aWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuO1xuXG5cdC8vIElmIGRvY3VtZW50IGlzIGFscmVhZHkgbG9hZGVkLCBydW4gbWV0aG9kXG5cdGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XG5cdFx0cmV0dXJuIGZuKCk7XG5cdH1cblxuXHQvLyBPdGhlcndpc2UsIHdhaXQgdW50aWwgZG9jdW1lbnQgaXMgbG9hZGVkXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmbiwgZmFsc2UpO1xuXG59O1xuXG5cbnJlYWR5KGZ1bmN0aW9uKCkge1xuXHR2YXIgZmlyc3RfdGFiID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm1kbC10YWJzX190YWJcIilbMF07XG5cdHZhciBmaXJzdF9wYW5lbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJtZGwtdGFic19fcGFuZWxcIilbMF07XG5cdGZpcnN0X3RhYi5jbGFzc0xpc3QudG9nZ2xlKFwiaXMtYWN0aXZlXCIpO1xuXHRmaXJzdF9wYW5lbC5jbGFzc0xpc3QudG9nZ2xlKFwiaXMtYWN0aXZlXCIpO1xufSk7XG4iXSwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
