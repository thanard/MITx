var data =[0,4,8,8,15,16,23,42];

//var chart =$("<div></div>").addClass("chart");
//$(".chart-container").append(chart);

//data.forEach(function(d){chart.append(d);});
// data.forEach(function(d){
// 	chart.append($("<div></div>").css("width",d*10+"px").text(d))
// })
var chart_height=300;
var chart_width=300;

var y_scale=d3.scale.linear()
	.domain([0,d3.max(data)]).range([0,chart_height]);

var x_scale=d3.scale.ordinal()
	.domain(d3.keys(data)).rangeBands([0,chart_height]);

var chart= d3.select(".chart-container").append("svg")
	.attr("class","chart")
	.attr("height",chart_height)
	.attr("width",chart_width);

chart.selectAll("rect").data(data)
	.enter().append("rect")
	.attr("width",x_scale.rangeBand())
	.attr("height",y_scale)
	.attr("x",function(d,i){return x_scale(i);})
	.attr("y",function(d){return chart_height-y_scale(d);});//20*i

chart.selectAll("text").data(data)
	.enter().append("text")
	.attr("y",function(d){return chart_height-y_scale(d)+3;})
	.attr("x",function(d,i){return x_scale(i)+x_scale.rangeBand()/2;})//(i+.5)*20;
	.attr("dy","0.7em")
	.attr("text-anchor","middle")
	.text(function(d){return d;});
//select all div bound to data enter choose the one that is new, and then apppend to the same thing
//add text,style