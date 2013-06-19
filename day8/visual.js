var data =data[0].map(function(d){return d.y;});

//var chart =$("<div></div>").addClass("chart");
//$(".chart-container").append(chart);

//data.forEach(function(d){chart.append(d);});
// data.forEach(function(d){
// 	chart.append($("<div></div>").css("width",d*10+"px").text(d))
// })
var outer_height=600;
var outer_width=600;

var margin={top:20,right:20,bottom:20,left:20};
var chart_height=outer_height-margin.top-margin.bottom
var chart_width=outer_width-margin.left - margin.right

var y_scale=d3.scale.linear()
	.domain([0,d3.max(data)]).range([0,chart_height]);

var x_scale=d3.scale.ordinal()
	.domain(d3.keys(data)).rangeBands([0,chart_height]);

var chart= d3.select(".chart-container").append("svg")
	.attr("class","chart")
	.attr("height",outer_height)
	.attr("width",outer_width)
	.append("g")
	.attr("transform","translate("+ margin.left + "," +margin.top + ")");//g-group element

chart.selectAll(".y-scale-label").data(y_scale.ticks(10))
	.enter().append("text")
	.attr("class","y-scale-label")
	.attr("x",0)
	.attr("y",function(d){return chart_height-y_scale(d);})
	.attr("dx",-margin.left/8)
	.attr("dy","0.3em")
	.attr("text-anchor","end")
	.text(String);

chart.selectAll("line").data(y_scale.ticks(10))
	.enter().append("line")
	.attr("x1",0)
	.attr("x2",chart_width)
	.attr("y1",function(d){return chart_height-y_scale(d);})
	.attr("y2",function(d){return chart_height-y_scale(d);});

chart.selectAll("rect").data(data)
	.enter().append("rect")
	.attr("width",x_scale.rangeBand())
	.attr("height",y_scale)
	.attr("x",function(d,i){return x_scale(i);})
	.attr("y",function(d){return chart_height-y_scale(d);});

chart.selectAll(".bar-label").data(data)
	.enter().append("text")
	.attr("class","bar-label")
	.attr("y",function(d){return chart_height-y_scale(d)+3;})
	.attr("x",function(d,i){return x_scale(i)+x_scale.rangeBand()/2;})
	.attr("dy","0.7em")
	.attr("text-anchor","middle")
	.text(function(d){return d;});

//select all div bound to data enter choose the one that is new, and then apppend to the same thing
//add text,style