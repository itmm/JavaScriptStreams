function ones() { return stream_cons(1, ones) }

function integers(from) {
	return stream_cons(from, function() {
		return stream_add(ones(), integers(from));
	});
}

function filter_primes(s) {
	var num = stream_car(s);
	return stream_cons(num, function() {
		return filter_primes(stream_filter(s, function(v) { return v % num; }));
	});
}

var primes = filter_primes(integers(2));
var result = document.getElementById("result");

function cell(content) {
	var cell = document.createElement("td");
	cell.appendChild(document.createTextNode(content));
	return cell;
}

for (var i = 1; i <= 20; ++i) {
	var row = document.createElement("tr");
	row.appendChild(cell("pi(" + i + ")"));
	row.appendChild(cell("=="));
	row.appendChild(cell("" + stream_car(primes)));
	result.appendChild(row);
	primes = stream_cdr(primes);
}		
