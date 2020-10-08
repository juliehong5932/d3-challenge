// @TODO: YOUR CODE HERE!
function makeResponsive() {

var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var stateData = d3.csv("assets/data/data.csv").then(function(stateData){
    stateData.forEach(function(d){
        d.poverty = +d.poverty;
        d.healthcare = +d.healthcare;
        console.log(d);
    });
    // console.log(stateData);
});

var xLinearScale = d3.scaleLinear()
    .domain(d3.extent(stateData, d => d.poverty))
    .range([0, width]);
    // console.log(xLinearScale);

var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(stateData, d => d.healthcare)])
    .range([height, 0]);

var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);

chartGroup.append("g")
    .attr('transform', `translate(0, ${height})`)
    .call(bottomAxis);

chartGroup.append("g")
    .call(leftAxis);



chartGroup.selectAll("circle")
    .data(stateData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "12")
    .attr("fill", "blue")
    .attr("opacity", .5);

// chartGroup.append('text')
    

}

makeResponsive();
