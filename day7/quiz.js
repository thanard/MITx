var quiz = (function(){
	var exports={};

	var answers=[]; //answers from the student
var questions=[{"questionText":"Find x when 2x=3?","options":["0",".5","1","1.5"]},
{"questionText":"What does the graph x^2=y^2 look like?","options":["parabola","eclipse","circle","two lines"]}]; //structure with ...
	var score=localStorage['score'];//score of the student 
	var currentQuestionIndex=localStorage['currentQuestionIndex']; //index of the current question we are on
	var bool;

	//when first open the page
	if(score==undefined){
		localStorage['score']=0;
	}
	if(currentQuestionIndex==undefined){
		localStorage['currentQuestionIndex']=0;
	}

	function getQuestionIdx(){
		return currentQuestionIndex
	}

	function getAnswers(){
		var answer = $('input[name="choice'+currentQuestionIndex+'"]:checked').attr('value');

		var req=$.ajax({
			async:false,//execute line by line; otherwise it's gonna be parallel
			url:"http://localhost:8080/",
			data:{currentQuestionIndex:getQuestionIdx(),answer:answer},
			timeout:2000,
		    success: function(response) {
		    	if(msg=='true'){
					bool=true;
				}else{
					bool=false;
				}
				console.log(bool)
				if(answer==undefined){
					$('#displayText').text("Choose an answer");
				}
				else if (bool){
					$('#displayText').text("Correct !");
					incrementScore();
					localStorage['score']=score;
				}else{
					$('#displayText').text("Wrong :(");//, the correct answer is "+questions[currentQuestionIndex].options[questions[currentQuestionIndex].solutionIndex]);
				}
				nextQuestion;
			},
		    error: function () {
		        alert('Server error');
		    }
		})
		// req.done(function(msg){
		// 	if(msg=='true'){
		// 		bool=true;
		// 	}else{
		// 		bool=false;
		// 	}
		// 	console.log(bool)
		// });
	}

	function nextQuestion(){
		currentQuestionIndex++;
		localStorage['currentQuestionIndex']=currentQuestionIndex;
		$('.quiz').empty();
		setup();
	}
	function clear(){
		localStorage.clear();
	}
	/*
	displays the current quiz question to the student
	*/
	function displayQuestion(){
		//if finished the test
		if(currentQuestionIndex==questions.length){
			$('.quiz').append("Your score: "+score+" out of "+questions.length);
			//$('.quiz').append('<button>try again</button>',{id:'tryagainButton'});
			//$('#tryagainButton').on('click',clear);
		}
    	var nextButton = $('<button>next</button>', {class: "button"});
    	var checkButton =$('<button>check answer</button>', {class: "button",id:"checkButton"});
    	var displayText=$('<text></text>',{id:"displayText"});

    	var divQuestions=$('<div>Question '+(parseInt(currentQuestionIndex)+1)+'/'+questions.length+': </div>',{class:'question'});
    	var divOptions=$('<div></div>');
    	var divCheck=$('<div></div>');
    	divQuestions.append(question);
    	divCheck.append(checkButton,nextButton);

		var question = $('<text>'+questions[currentQuestionIndex].questionText+'</text>');
		divQuestions.append(question);
		for(var j=0;j<4;j++){
			var option = $('<input></input>', {type: 'radio',name:"choice"+currentQuestionIndex,value:questions[currentQuestionIndex].options[j], class: "option"});	
			divOptions.append(option,questions[currentQuestionIndex].options[j]);
		}
		$('.quiz').append(divQuestions,divOptions,divCheck,displayText);

		//Which radio button is checked
		

		//Add check answer
		checkButton.on('click',getAnswers);
		nextButton.on('click',nextQuestion);
	}

	/*
	Called when a student gets a question right
	*/
	function incrementScore(){
		score++;
	}

	function setup(){
		displayQuestion();
	}

	exports.setup = setup;
	exports.getQuestionIdx = getQuestionIdx;
	return exports;
})();

$(document).ready(function(){
	// Parse.initialize("1VBf6H1IjnLenYZdgN9Bya31ZEj7WGJpG6AMFDyg", "1Ozd0SpKc2rizijPVqZM5Gxi5WzSGFHmjZoDX6fP");
	// var TestObject = Parse.Object.extend("TestObject");
	// var testObject = new TestObject();
	// testObject.save({foo: "bar"}, {
 //  	success: function(object) {
 //   alert("yay! it worked");
 //  }
//});
	quiz.setup();
	// var req=$.ajax({
	// 	async:false,//execute line by line; otherwise it's gonna be parallel
	// 	url:"http://localhost:8080/",
	// 	data:{currentQuestionIndex:quiz.getQuestionIdx()},
	// })
	// req.done(function(msg){
	// 	console.log(msg);
	// });
	// console.log("what");
});