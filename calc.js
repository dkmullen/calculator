/**Calc*/
var topStr = '';
var activeInput = ('0');
var topDisplay = ko.observable(topStr);
var activeDisplay = ko.observable(activeInput);

function ViewModel() {


	var click = new Audio();
	click.src = 'click.wav';
	function playClick() {
		click.play();
	}

	var tempOperand = [];
	var holdingPen = [];
	var operandStr;
	var memory = null;

	/**
	 * Functions that writes to the main display (activeDisplay). Checks for a
	 * decimal, calls formatNumber (which adds commas) for the str before the
	 * decimal and not for what follows.
	 * @function
	 * @param n Usually the variable activeInput
	 */
	self.display = function(n) {
		if (n.indexOf('.') === -1) {
			activeDisplay(self.formatNumber(n));
		} else {
			var v = n.split('.');
			activeDisplay(self.formatNumber(v[0]) + '.' + v[1]);
		}
	};

	/**
	 * @function memoryPlus
	 * Adds to memory in response to button press
	 */
	self.memoryPlus = function() {
		playClick();
		memory += parseFloat(activeInput);
	};

	/**
	 * @function memoryMinus
	 * Subtracts from memory in response to button press
	 */
	self.memoryMinus = function() {
		playClick();
		memory -= parseFloat(activeInput);
	};

	/**
	 * @function memoryRecall
	 * Puts memory content on the display in response to button press
	 */
	self.memoryRecall = function() {
		if (memory !== null) {
			playClick();
			activeInput = memory.toString();
			display(activeInput);
		}
	};

	/**
	 * @function memoryClear
	 * Empties memory in response to button press
	 */
	self.memoryClear = function() {
		playClick();
		memory = null;
	};

	self.backSpace = function() {
		activeInput = activeInput.slice(0, -1);
		if (activeInput === '') {
			playClick();
			activeInput = '0';
		}
		activeDisplay(activeInput);
	};

	self.clearEntry = function() {
		playClick();
		activeInput = '0';
		activeDisplay(activeInput);
	};

	self.enterDigit = function(numStr) {
		if (activeInput.length < 19) {
			playClick();
			if (activeInput === '0' && numStr !== '.') {
				activeDisplay(activeInput = numStr);
			}
			else {
				activeInput += numStr;
				display(activeInput);
			}
		}
	};

	/**
	 * @function formatNumber
	 * Adds commas to larger numbers
	 * Credit: By Tom Pawlak at https://blog.tompawlak.org/number-currency-formatting-javascript
	 */
	self.formatNumber = function(n) {
		return n.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	};

	/**
	 * A function to store the current operand and to update the top string.
	 * If numStr is empty and the new operand is something other than =,
	 * removes the old operand in top string and replaces it with the new.
	 * Otherwise, pushes the numStr to the holding pen and adds the new operand
	 * to operandStr. Calls performCalc when there is enough data to do so.
	 * Called by the operand functions.
	 * @function
	 */
	self.storeOperation = function(numStr, operandStr) {
		if (numStr === '' && operandStr !== ' = '){
			topStr = topStr.slice(0, -3);
			tempOperand.pop();
			tempOperand.push(operandStr);
		}
		else {
			holdingPen.push(parseFloat(numStr));
			tempOperand.push(operandStr);
		}
		topStr += (numStr + operandStr);
			topDisplay(topStr);
			activeInput = '';
		if (holdingPen.length === 2) {
			self.performCalc();
		}
	};

	/**
	 * A function to accept the operand and do the calculation. Called by
	 * storeOperation when the 'holdingPen' contains two numbers.
	 * @function
	 */
	self.performCalc = function() {
		switch (tempOperand[0]) {
        case ' + ':
            activeInput = holdingPen[0] + holdingPen[1];
			self.display(activeInput.toString());
            break;
		case ' - ':
            activeInput = holdingPen[0] - holdingPen[1];
			self.display(activeInput.toString());
            break;
		case ' * ':
            activeInput = holdingPen[0] * holdingPen[1];
			self.display(activeInput.toString());
            break;
		case ' / ':
            activeInput = holdingPen[0] / holdingPen[1];
			self.display(activeInput.toString());
            break;
		}

		/* When the equals sign is entered, this finishes up the calculation and
		   clears out everything but the display of the result */
		if (tempOperand[1] === ' = ') {
			topStr = '';
			topDisplay(topStr);
			holdingPen = [];
			tempOperand = [];

		}

		/* If another operand besides equals is entered, the number is stored,
		   and 'shift is used to remove the first element in tempOperand (the
		   operand just used) and activeInput is cleared (but not the display) */
		else {
			holdingPen = [activeInput];
			tempOperand.shift();
			activeInput = '';
		}
	};

	/* These number functions simply pass the digit (as a str) to enterDigit.
	   Tied to the buttons on the calculator */
	self.zero = function() {
		self.enterDigit('0');
	};

	self.one = function() {
		self.enterDigit('1');
	};

	self.two = function() {
		self.enterDigit('2');
	};

	self.three = function() {
		self.enterDigit('3');
	};

	self.four = function() {
		self.enterDigit('4');
	};

	self.five = function() {
		self.enterDigit('5');
	};

	self.six = function() {
		self.enterDigit('6');
	};

	self.seven = function() {
		self.enterDigit('7');
	};

	self.eight = function() {
		self.enterDigit('8');
	};

	self.nine = function() {
		self.enterDigit('9');
	};

	/* Adds the decimal but only if none exists previously (indexOf == -1 means
	   it isn't present in the string) */
	self.point = function() {
		if(activeInput.indexOf('.') === -1) {
			playClick();
			self.enterDigit('.');
		}
	};

	/**
	 * A function to clear and reset everything
	 * @function
	 */
	self.C = function() {
		playClick();
		topDisplay('');
		activeDisplay(activeInput = '0');
		topStr = '';
		tempOperand = [];
		holdingPen = [];
	};

	/* A series of functions that pass the current number and entered operand
	   to storeOperation */
	self.plus = function() {
		playClick();
		self.storeOperation(activeInput, ' + ');
	};

	self.minus = function() {
		playClick();
		self.storeOperation(activeInput, ' - ');
	};

	self.times = function() {
		playClick();
		self.storeOperation(activeInput, ' * ');
	};

	self.divide = function() {
		playClick();
		self.storeOperation(activeInput, ' / ');
	};

	/* Sends the equals operand IF another operand has been sent first AND
	   if there is something in activeInput */
	self.equals = function() {
		if (tempOperand.length === 1 && activeInput !== '') {
			playClick();
			self.storeOperation(activeInput, ' = ');
		}
	};

	self.percent = function() {
		if (holdingPen.length > 0 && activeInput !== '') {
			var n = self.roundToTwo((parseFloat(activeInput)/100) * holdingPen[0]);
			activeInput = n.toString();
			playClick();
			activeDisplay(activeInput);
		}
	};

	/**
	 * A helper function. 'e+2' and 'e-2' are ten squared and ten to the neg 2.
	 * The function effectively moves the decimal two places, rounds, and
	 * moves it back.
	 * Source: https://blog.tompawlak.org/number-currency-formatting-javascript
	 * @function
	 */
	self.roundToTwo = function(num) {
		return +(Math.round(num + 'e+2')  + 'e-2');
	};

	/**
	 * A function to handle keyboard input
	 * @function
	 */
	self.handleInput = function(input, allowedKeys) {
		switch (input) {
			case 'backspace':
				self.backSpace();
				break;
			case 'ENTER':
				self.equals();
				break;
			case '0':
				self.zero();
				break;
			case '1':
				self.one();
				break;
			case '2':
				self.two();
				break;
			case '3':
				self.three();
				break;
			case '4':
				self.four();
				break;
			case '5':
				self.five();
				break;
			case '6':
				self.six();
				break;
			case '7':
				self.seven();
				break;
			case '8':
				self.eight();
				break;
			case '9':
				self.nine();
				break;
			case '*':
				self.times();
				break;
			case '+':
				self.plus();
				break;
			case '-':
				self.minus();
				break;
			case '.':
				self.point();
				break;
			case '/':
				self.divide();
				break;
		}
	};

	document.addEventListener('keypress', function(e) {
		var allowedKeys = {
			8: 'backspace',
			13: 'ENTER',
			48: '0',
			49: '1',
			50: '2',
			51: '3',
			52: '4',
			53: '5',
			54: '6',
			55: '7',
			56: '8',
			57: '9',
			42: '*',
			43: '+',
			45: '-',
			46: '.',
			61: '=',
			47: '/'
		};
		self.handleInput(allowedKeys[e.keyCode]);
	});
}
ko.applyBindings(new ViewModel());
