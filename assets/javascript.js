var correctQ = 0, incorrectQ = 0, currentQ = 0, totalQ = 10, secondsQ = 10, secondsA = 4, correctIndex = 0, nextQuestion, NextQuestionI = 0;
var qBar, aBar, currentSeconds = secondsQ;
var correctQDiv = $("#correct-q-div"), incorrectQDiv = $("#incorrect-q-div"), currentQDiv = $("#current-q-div");
var question = $("#question").text("Click the button below to begin the trivia session. You will have " + secondsQ + " seconds to answer each question. There will be " + totalQ + " questions. Be quick, be smart!");
var ans1 = $("<h4 num=1>"), ans2 = $("<h4 num=2>"), ans3 = $("<h4 num=3>"), ans4 = $("<h4 num=4>"), answers = [ans1, ans2, ans3, ans4];
var startButton = $("<button>").text("Start the Trivia!").on("click", startGame);
var timerBar = $("#timer-bar").attr("value", secondsQ).attr("max", secondsQ);

var answersCol = $("#answers-col").append(startButton);
answersCol.append(startButton);

var allQuestions = [
    ["When was the idea of the atom first introduced?","450 BC","365 AD","1050 AD","1640 AD",1],
    ["How many times stronger is an earthquake of Richter Scale 8 than of Richter Scale 4?","2 times","4 times","1,000 times","10,000 times",4],
    ["Which planet has the most moons?","Jupiter","Saturn","Uranus","Neptune",3],
    ["Which of these measures wind speed?","Altimeter","Anemometer","Barometer","Fanometer",2],
    ["Who invented the first battery?","Benjamin Franklin","Luigi Galvani","Nikola Tesla","Alessandro Volta",4],
    ["Which of these measures the amount of damage done by an earthquake?","Kanamori Scale","Mercalli Scale","Richter Scale","Selvaggi Scale",2],
    ["How many pencils could be made with the carbon in a human body?","42","144","413","9000",4],
    ["Which of these is Johannes Kepler best known for?","Laws of Motion","Laws of Universal Gravitation","Laws of Thermodynamics","Laws of Planetary Motion",4],
    ["Which of these evolved first?","Tyrannosaurus","Tree","Shark","Cockroach",3],
    ["Which is the symbol for Silver?","AG","AU","PB","SI",1],
    ["When was the steam turbine invented?","2nd Century BC","1st Century AD","17th Century AD","18th Century AD",2],
    ["Which of these is Earth's lowest atmospheric layer?","Exosphere","Mesosphere","Stratosphere","Troposphere",2],
    ["How long does light take to travel from the Sun to Earth?","8 seconds","8 minutes","8 hours","8 days",1],
    ["Which of the following has the fewest chromosomes?","Anteater","Flower","Human","Silkworm",3],
    ["Who is the inventor of dynamite?","Alfred Nobel","George Washington Carver","Robert Bunsen","Sam Winchester",1],
    ["What is the symbol for Potassium?","K","P","PO","R",1],
    ["Who invented the telescope?","Galileo Galilei","Hans Lippershey","Isaac Newton","Johannes Kepler",2],
    ["Which is the largest moon in the solar system?","Callisto","Europa","Ganymede","Luna",3],
    ["Which is the hottest planet in the solar system?","Mercury","Venus","Earth","Mars",2],
    ["Which of these is NOT a metamorphic rock?","Gneiss","Marble","Obsidian","Slate",3],
    ["Which planet has the highest density?","Venus","Earth","Jupiter","Neptune",2],
    ["Which planet is the windiest?","Venus","Jupiter","Saturn","Neptune",4],
    ["What is the most actively volcanic body in the solar system?","Venus","Earth","Ganymede","Io",4],
    ["Which is the only letter that does not appear in the Periodic Table?","J","Q","V","Z",1],
    ["Who wrote the first algorithm intended to be carried out by a machine?","Ada Lovelace","Alex Turing","Claude Shannon","Marvin Minsky",1],
    ["When was the first fire extinguisher patented?","1694","1723","1887","1902",2],
    ["Which is the standard unit of kinetic energy?","Calorie","Joule","Newton","Watt",2],
    ["Which of these is the hottest?","Earth's Core","Lightning","The Sun's Surface","Venus' Surface",2],
    ["What is the name for the bones in the human hand?","Betacarpals","Betatarsals","Metacarpals","Metatarsals",3],
    ["Which term describs the formation of a new species?","Evolution","Extrapolation","Mutation","Speciation",4],
    ["Which is NOT a gas at room temperature?","Flourine","Krypton","Lithium","Neon",3],
    ["In the equation 'E=mc²', what does 'c' stand for?","Energy","Planck Constant","Speed of Light","Uncertainty Limit",3]
];
var possibleQuestions = allQuestions;

function startGame() {
    possibleQuestions = allQuestions;
    answersCol.empty();
    answersCol.append(ans1, ans2, ans3, ans4);
    correctQ = 0;
    correctQDiv.text("Correct: " + correctQ);
    incorrectQ = 0;
    incorrectQDiv.text("Incorrect: " + incorrectQ);
    currentQ = 0;
    currentQDiv.text("Question " + currentQ + " of " + totalQ);
    newQuestion();
}

function newQuestion() {
    currentQ++;
    currentQDiv.text("Question " + currentQ + " of " + totalQ);
    nextQuestionI = Math.floor(Math.random() * possibleQuestions.length);
    nextQuestion = possibleQuestions[nextQuestionI];
    possibleQuestions.splice(nextQuestionI, 1);

    question.text(nextQuestion[0]);
    ans1.text(nextQuestion[1]).removeClass("right wrong");
    ans2.text(nextQuestion[2]).removeClass("right wrong");
    ans3.text(nextQuestion[3]).removeClass("right wrong");
    ans4.text(nextQuestion[4]).removeClass("right wrong");
    correctIndex = nextQuestion[5];
    answersCol.one("click", "h4", checkAnswer);
    questionCountdown();
}

function checkAnswer() {
    clearInterval(qBar);
    if ($(this).attr("num") == correctIndex) {
        $(this).addClass("right");
        correctQ++;
        correctQDiv.text("Correct: " + correctQ);
        answerCountdown();
    }
    else {
        $(this).addClass("wrong");
        outOfTime();
    }
}

function outOfTime() {
    answersCol.off();
    answers[correctIndex-1].addClass("right");
    incorrectQ++;
    incorrectQDiv.text("Incorrect: " + incorrectQ);
    answerCountdown();
}

function questionCountdown() {
    currentSeconds = secondsQ;
    timerBar.attr("max", secondsQ).attr("value", currentSeconds);
    qBar = setInterval(function() {
        currentSeconds--;
        timerBar.attr("value", currentSeconds);
        if (currentSeconds === 0) {
            clearInterval(qBar);
            outOfTime();
        }
    }, 1000 * 1);
}

function answerCountdown() {
    currentSeconds = 0;
    timerBar.attr("max", secondsA).attr("value", currentSeconds);
    aBar = setInterval(function() {
        currentSeconds++;
        timerBar.attr("value", currentSeconds);
        if (currentSeconds === secondsA) {
            clearInterval(aBar);
            if (currentQ < totalQ) {
                newQuestion();
            }
            else {
                results();
            }
        }
    }, 1000 * 1);
}

function results() {
    question.text("All questions have been answered. You correctly answered " + correctQ + " questions out of " + totalQ + ". You missed " + incorrectQ + ". Would you like to play again?");
    answersCol.empty();
    answersCol.append(startButton);
}