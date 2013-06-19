var data =[0,4,8,8,15,16,23,42];

//var chart =$("<div></div>").addClass("chart");
//$(".chart-container").append(chart);

//data.forEach(function(d){chart.append(d);});
// data.forEach(function(d){
// 	chart.append($("<div></div>").css("width",d*10+"px").text(d))
// })
var x_scale=d3.scale.linear()
	.domain([0,d3.max(data)]).range(["0%","100%"]);
var chart= d3.select(".chart-container").append("div").attr("class","chart");

chart.selectAll("div").data(data).enter().append("div")
	.style("width",x_scale)
	.text(function(d){return d;});
//select all div bound to data enter choose the one that is new, and then apppend to the same thing
//add text,style