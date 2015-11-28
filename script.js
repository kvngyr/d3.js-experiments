
// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 1200 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(30);

// Define the line
var valueline = d3.svg.line()
    .x(function(d) { return x(d.start_time); })
    .y(function(d) { return y(d.total); });

// Adds the svg canvas
var svg = d3.select("body")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function make_x_axis() {
    return d3.svg.axis()
        .scale(x)
         .orient("bottom")
         .ticks(5);
}

function make_y_axis() {
    return d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(15);
}

// Get the data
d3.csv("qtgardens-all.csv", function(error, data) {
    data.forEach(function(d) {
        // d.start_time = parseDate(d.start_time);
        d.start_time = d.start_time;
        d.total = +d.total;
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.start_time; }));
    y.domain([d3.min(data, function(d) { return d.total; }) - 5, d3.max(data, function(d) { return d.total; }) + 5]);

    // Add the valueline path.
    svg.append("path")
        .attr("class", "line")
        .attr("d", valueline(data));

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    svg.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(0," + height + ")")
        .call(make_x_axis()
            .tickSize(-height, 0, 0)
            .tickFormat("")
        );

    svg.append("g")
        .attr("class", "grid")
        .call(make_y_axis()
            .tickSize(-width, 0, 0)
            .tickFormat("")
        );

});
