function runBanner(id){

    var radius = 8;
    var width  = $(id).width();
    var height = $(id).height();

    var randomX = d3.random.normal(width,  width);
    var randomY = d3.random.normal(80, 35);

    var points = d3.range(width * 50).map(
	function(){ return [randomX(), randomY()]; });

    var color = d3.scale.linear()
	.domain([0, 20])
	.range(["#7d99ff", "black"])
	.interpolate(d3.interpolateLab);

    var hexbin = d3.hexbin()
	.size([width, height])
	.radius(radius);

    var x = d3.scale.identity()
	.domain([0, width]);

    var y = d3.scale.linear()
	.domain([0, height])
	.range([height, 0]);

    var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom")
	.tickSize(6, -height);

    var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left")
	.tickSize(6, -width);

    var svg = d3.select(id).append("svg")
	.attr("id", "hex-svg")
	.attr("width", "100%")
	.attr("height", "100%")
	.append("g");

    svg.append("clipPath")
	.attr("id", "clip")
	.append("rect")
	.attr("class", "mesh")
	.attr("width", "100%")
	.attr("height", "100%");

    svg.append("g")
	.attr("clip-path", "url(#clip)")
	.selectAll(".hexagon")
	.data(hexbin(points))
	.enter().append("path")
	.attr("class", "hexagon")
	.attr("d", hexbin.hexagon())
	.attr("transform", function(d) {
	    return "translate(" + d.x + "," + d.y + ")"; 
	})
	.style("fill", function(d) { 
	    return color(d.length); 
	})
	.style("stroke", function(d){ 
	    return color(d.length);
	})
	.style("stroke-width", 1)

	.style("opacity", function(d) { 
	    return d.length * 0.1;
	});


    svg.append("rect")
	.attr("x", 0)
	.attr("y", 0)
    	.attr("width", "100%")
    	.attr("height","76px")
	.style("fill", "black")
	.style("stroke", "black")
	.style("stroke-width", 1);
}
