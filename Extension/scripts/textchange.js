$(function() {
    $(".normalTextSmall").html(function(i, text) {
        return String(text).replace(/$bo/gi, "<b>")
		.replace(/\$\/bo/gi, "</b>")
		.replace(/\$re/gi, '<font color="red">')
		.replace(/\$\/re/gi, "</font>")
		.replace(/\$gr/gi, '<font color="green">')
		.replace(/\$\/gr/gi, "</font>")
		.replace(/\$bl/gi, '<font color="blue">')
		.replace(/\$\/bl/gi, "</font>")
		.replace(/\$h1/gi, "<h1>")
		.replace(/\$\/h1/gi, "</h1>")
		.replace(/\$h2/gi, "<h2>")
		.replace(/\$\/h2/gi, "</h2>")
		.replace(/\$i/gi, "<i>")
		.replace(/\$\/i/gi, "</i>")
		.replace(/\$u/gi, "<u>")
		.replace(/\$\/u/gi, "</u>")
		.replace(/\$s/gi, "<small>")
		.replace(/\$\/s/gi, "</small>")
    });
});