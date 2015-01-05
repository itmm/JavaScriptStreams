/**
 * JavaScript Streams (jss), imitating Scheme Streams in JavaScript
 */
 
function stream_cons(a, b) { return { car: a, cdr: b}; }
function stream_car(s) { return s.car; }
function stream_cdr(s) { return s.cdr(); }

function stream_map(a, b, f) {
	return stream_cons(f(stream_car(a), stream_car(b)), function () {
		return stream_map(stream_cdr(a), stream_cdr(b), f);
	});
}

function stream_add(a, b) { return stream_map(a, b, function(a, b) { return a + b; }); }

function stream_filter(s, p) {
	if (!p(stream_car(s))) { return stream_filter(stream_cdr(s), p); }
	return stream_cons(stream_car(s), function() {
		return stream_filter(stream_cdr(s), p);
	});
}
