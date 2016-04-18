/**Calc*/
var topStr = '';
var activeInput = '0';
var topDisplay = ko.observable(topStr);
var activeDisplay = ko.observable(activeInput);

function ViewModel() {
	
	var tempOperand = [];
	var holdingPen = [];
	var operandStr;
	var memory = null;
	
	self.memoryPlus = function() {
		memory += parseFloat(activeInput);
	};
	
	self.memoryMinus = function() {
		memory -= parseFloat(activeInput);
	};
	
	self.memoryRecall = function() {
		if (memory !== null) {
			activeInput = memory.toString();
			activeDisplay(activeInput);
		}
	};
	self.memoryClear = function() {
		memory = null;
	};
	
	self.backSpace = function() {
		activeInput = activeInput.slice(0, -1);
		if (activeInput === '') {
			activeInput = '0';
		}
		activeDisplay(activeInput);
	};
	
	self.clearEntry = function() {
		activeInput = '0';
		activeDisplay(activeInput);
	};
	
	self.enterDigit = function(numStr) {
		if (activeInput === '0' && numStr !== '.') {
			activeDisplay(activeInput = numStr);
		} else {
			activeDisplay(activeInput += numStr);
		}
	};
	
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
	
	self.performCalc = function() {
		switch (tempOperand[0]) {
        case ' + ':
            activeInput = holdingPen[0] + holdingPen[1];
			activeDisplay(activeInput);
            break;
		case ' - ':
            activeInput = holdingPen[0] - holdingPen[1];
			activeDisplay(activeInput);
            break;
		case ' * ':
            activeInput = holdingPen[0] * holdingPen[1];
			activeDisplay(activeInput);
            break;
		case ' / ':
            activeInput = holdingPen[0] / holdingPen[1];
			activeDisplay(activeInput);
            break;
		}
		if (tempOperand[1] === ' = ') {
			topStr = '';
			topDisplay(topStr);
			holdingPen = [];
			tempOperand = [];
			//activeInput = '';
			
		}	
		else {
			holdingPen = [activeInput];
			tempOperand.shift();
			activeInput = '';
		}
	};
	
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
	
	self.point = function() {
		if(activeInput.indexOf('.') === -1) {
			self.enterDigit('.');
		}
	};
	
	self.C = function() {
		topDisplay('');
		activeDisplay(activeInput = '0');
		topStr = '';
		tempOperand = [];
		holdingPen = [];
	};
	
	self.plus = function() {
		self.storeOperation(activeInput, ' + ');
	};
	
	self.minus = function() {
		self.storeOperation(activeInput, ' - ');
	};
	
	self.times = function() {
		self.storeOperation(activeInput, ' * ');
	};
	
	self.divide = function() {
		self.storeOperation(activeInput, ' / ');
	};
	
	self.equals = function() {
		if (tempOperand.length === 1 && activeInput !== '') {
			self.storeOperation(activeInput, ' = ');
		}
	};
	
	self.percent = function() {
		if (holdingPen.length > 0 && activeInput !== '') {
			var n = self.roundToTwo((parseFloat(activeInput)/100) * holdingPen[0]);
			activeInput = n.toString();
			activeDisplay(activeInput);
		}
	};
	
	self.roundToTwo = function(num) {
		return +(Math.round(num + 'e+2')  + 'e-2');
	};
	
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
			08: 'backspace',
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