const readlineSync = require('readline-sync');

/*

we need:
1. instructions, mabye about what kind of inputs we accept
2. end state(s)
3. a way to accept and check inputs

i realized that process.stdin.once actually accepts an arbitrary number of inputs, and will stop reading stdin only when "process.exit()" is called, so it could work and use return as the 'key' to end that particular turn...

quality of life improvements:
rename oneCount and zeroCount,

*/

const colors = ["r", "o", "y", "g", "b", "p"];

let answer = "";

//generates random answer
for (let i=0; i<4; i++) {
	answer += colors[Math.floor(Math.random()*6)];
}

let allInputs = new Array(10).fill("    ");
let allResults = new Array(10).fill("    ");

let turnCounter = 0;

printGameState();
takeTurn();

function takeTurn() {
	let validInput = false;
	let guess = "";

	while (!validInput) {
		guess = readlineSync.question("Enter a guess: ");

		validInput = isValidInput(guess);

		if (!validInput)
			console.log(`Your guess must be 4 of the letters: ${colors}.`);
	}

	allInputs[turnCounter] = guess;
	allResults[turnCounter] = compareInputToAnswer(guess, answer);

	printGameState();

	if (allResults[turnCounter] == "1111") {
		console.log(`You win!!! The answer was "${answer}".`);
	}
	else {
		turnCounter++;

		if (turnCounter < 10) {
			takeTurn();
		} 
		else {
			console.log(`Sorry, you lose :(. The answer was "${answer}".`);
		}
	}
}

function isValidInput(input) {
	if (input.length !== 4)
		return false;

	for (let i = 0; i < 4; i++) {
		if (!colors.includes(input[i]))
			return false;
	}

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

	console.log(`The answer may contain the colors: ${colors}.`);

	for (let i = 9; i >= 0; i--) {
		console.log((i+1) + ". " + allInputs[i] + "  " + allResults[i]);
	}
}
