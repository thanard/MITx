
var sys = require("sys"), 
my_http = require("http");  
var url = require('url');
var questions=[{"questionText":"Find x when 2x=3?","options":["0",".5","1","1.5"],"solutionIndex":3},
{"questionText":"What does the graph x^2=y^2 look like?","options":["parabola","eclipse","circle","two lines"],"solutionIndex":3}]; //structure with ...

my_http.createServer(function(request,response){  
    sys.puts("I got kicked");  
    dict=url.parse(request.url,true,true);
    console.log(dict);
    response.writeHeader(200, {"Content-Type": "text/plain","Access-Control-Allow-Origin":'*'});  
    response.write(''+checkAnswer(dict));  
    response.end();  
}).listen(8080);  
sys.puts("Server Running on 8080");

/*
	input:takes in a question index and a student's answers
	output: true if answer is correct
	*/
	function checkAnswer(dict){
		return questions[dict.query.currentQuestionIndex].options[questions[dict.query.currentQuestionIndex].solutionIndex] == dict.query.answer;
	}