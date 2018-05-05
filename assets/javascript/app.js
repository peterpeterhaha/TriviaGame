var triviaQuestions = [{
	question: "What submachine gun allows you to run at the same speed as though you were holding a Glock in Counterstrike?",
	answerList: ["PP Bizon", "UMP-45", "P90", "MP5"],
	answer: 0
},{
	question: "In Baldur's Gate, what is the name of Minsc's pet hamster?",
	answerList: ["Boo", "Schmee", "Baby", "Rat"],
	answer: 0
},{
	question: "Who is the final boss in Divinity Original Sin?",
	answerList: ["Vaelanna", "The Void Dragon", "Braccus Rex", "Leandra"],
	answer: 1
},{
	question: "Sonic's friend Tails is a two tailed what?",
	answerList: ["Skunk", "Mouse", "Fox", "Squirrel"],
	answer: 2
},{
	question: "In Starcraft Brood War, Fenix, the fallen Protoss hero comes back as what unit after his first death?",
	answerList: ["Zealot", "Carrier", "Dark Templar", "Dragoon"],
	answer: 3
},{
	question: "Who is the main character in Final Fantasy VIII",
	answerList: ["Squall", "Barret", "Sephiroth", "Cloud"],
	answer: 0
},{
	question: "Rust was initially a mod of what game?",
	answerList: ["Max Payne", "Counterstrike Source", "Unreal Tournament", "H1Z1"],
	answer: 1
},{
	question: "What is your character's name in Bioshock Infinite",
	answerList: ["Andrew Ryan", "Big Daddy", "Booker DeWitt", "Zachary Hale Comstock"],
	answer: 2
},{
	question: "Metro 2033 is set in what country?",
	answerList: ["USA", "Russia", "Germany", "North Korea"],
	answer: 1
},{
	question: "Path of Exile is a clone of what game?",
	answerList: ["Battle Chess", "World of Warcraft", "Starcraft", "Diablo"],
	answer: 3
},{
	question: "Megaman's dog's name was?",
	answerList: ["Rush", "R2-D2", "Ruff", "Zero"],
	answer: 0
},{
	question: "Which of these characters can NOT shoot a Hadouken?",
	answerList: ["Megaman X", "Blanka", "Gouken", "Ryu"],
	answer: 1
},{
	question: "In Final Fantasy 9, the Black Mage that joins your party is named?",
	answerList: ["Moogle", "Zidane", "Cloud", "Vivi"],
	answer: 3
},{
	question: "How many songs are in Beat Saber?",
	answerList: ["20", "30", "50", "Only 10!"],
	answer: 3
},{
	question: "How many pieces are there to the TriForce in Zelda?",
	answerList: ["0", "1", "2", "3"],
	answer: 3
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right! +1 Int",
	incorrect: "Incorrect -3 Health",
	endTime: "Out of time! Game Over Loser!",
	finished: "High Score!"
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); 
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}
