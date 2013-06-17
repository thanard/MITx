var quiz = (function(){
	var exports={};

	var questions=[{"questionText":"Find x when 2x=3?","options":["0",".5","1","1.5"],"solutionIndex":3},
	{"questionText":"What does the graph x^2=y^2 look like?","options":["parabola","eclipse","circle","two lines"],"solutionIndex":3}]; //structure with ...

	var answers=[]; //answers from the student

	var score=localStorage['score'];//score of the student 
	var currentQuestionIndex=localStorage['currentQuestionIndex']; //index of the current question we are on

	//when first open the page
	if(score==undefined){
		localStorage['score']=0;
	}
	if(currentQuestionIndex==undefined){
		localStorage['currentQuestionIndex']=0;
	}

	/*
	input:takes in a question index and a student's answers
	output: true if answer is correct
	*/
	function checkAnswer(ans){
		return questions[currentQuestionIndex].options[questions[currentQuestionIndex].solutionIndex] == ans;
	}

	function getAnswers(){
		var answer = $('input[name="choice'+currentQuestionIndex+'"]:checked').attr('value');
    	var displayText=$('<text></text>');

		console.log(answer);
		if(answer==undefined){
			displayText.text("Choose an answer");
			//$('.quiz').append("Choose an answer");
		}
		else if (checkAnswer(answer)){
			displayText.text("Right");
			//$('.quiz').append("Right");
			incrementScore();
			localStorage['score']=score;
		}else{
			displayText.text("Wrong");
			//$('.quiz').append("Wrong");
		}
		$('.quiz').append(displayText)
		nextQuestion;
	}

	function nextQuestion(){
		currentQuestionIndex++;
		localStorage['currentQuestionIndex']=currentQuestionIndex;
		$('.quiz').empty();
		setup();
	}
	/*
	displays the current quiz question to the student
	*/
	function displayQuestion(){
		//if finished the test
		if(currentQuestionIndex==questions.length){
			$('.quiz').append("Your score: "+score+" out of "+questions.length);
		}
    	var nextButton = $('<button>next</button>', {class: "button"});
    	var checkButton =$('<button>check answer</button>', {class: "button"});

    	var divQuestions=$('<div>Question '+(parseInt(currentQuestionIndex)+1)+'/'+questions.length+': </div>',{class:'question'});
    	var divOptions=$('<div></div>');
    	var divCheck=$('<div></div>');
    	divQuestions.append(question);
    	divCheck.append(checkButton,nextButton);

		var question = $('<text>'+questions[currentQuestionIndex].questionText+'</text>');
		divQuestions.append(question);
		console.log("here");
		for(var j=0;j<4;j++){
			var option = $('<input></input>', {type: 'radio',name:"choice"+currentQuestionIndex,value:questions[currentQuestionIndex].options[j], class: "option"});	
			divOptions.append(option,questions[currentQuestionIndex].options[j]);
		}
		$('.quiz').append(divQuestions,divOptions,divCheck);

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
	var req=$.ajax({
		async:false,//execute line by line; otherwise it's gonna be parallel
		url:"http://localhost:8080/",
		data:{id:10}
	})
	req.done(function(msg){
		console.log(msg);
	});
	console.log("what");
});