/*

we need:
1. instructions, mabye about what kind of inputs we accept
2. end state(s)
3. a way to accept and check inputs

i realized that process.stdin.once actually accepts an arbitrary number of inputs, and will stop reading stdin only when "process.exit()" is called, so it could work and use return as the 'key' to end that particular turn...

quality of life improvements:
rename oneCount and zeroCount,

*/

let colors = ["r", "o", "y", "g", "b", "p"];

let answer = "";

//generates random answer
for (let i=0; i<4; i++) {
	answer += colors[Math.floor(Math.random()*6)]
}

let allInputs = new Array(10).fill("    ");
let allResults = new Array(10).fill("    ");

let currentInput = "rogy";

allInputs[0] = currentInput;
allResults[0] = compareInputToAnswer(currentInput, answer);

let turnCounter = 1;

takeTurn();

function takeTurn() {
	process.stdin.setEncoding('utf8');
	process.stdin.once('data', function(t) {
		if (!(isValidInput(t))) {
			console.log(`Not a valid input! The valid inputs are: ${colors}`);
		}



		printGameState();

	});
}

function isValidInput(input) {
	return true;
}

// 1 is correct color and position, 0 is correct color incorrect position
function compareInputToAnswer(input, answer) {
	let localInput = [...input];
	let localAnswer = [...answer];

	let oneCount = "";

	//check for exact matches
	for (let i=0; i < localInput.length; i++) {
		if (localInput[i] === localAnswer[i]) {
			oneCount += "1"; //check if oneCount is updating correctly..?
			localInput[i] = " ";
			localAnswer[i] = " ";
		}
	}

	let zeroCount = "";

	//check for color in the pattern
	for (let i=0; i < localInput.length; i++) {
		if (localInput[i] === " ") continue;

		for (let j=0; j < localAnswer.length; j++) {
			if (localInput[i] === localAnswer[j]) {
				zeroCount += "0";
				localInput[i] = " ";
				localAnswer[j] = " ";
				break;
			}
		}
	}

	return oneCount + zeroCount;
}

function printGameState() {
	process.stdout.write('\033c');

	for (let i = 9; i >= 0; i--) {
		console.log((i+1) + ". " + allInputs[i] + "  " + allResults[i]);
	}
}
