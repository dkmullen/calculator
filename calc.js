/**Calc*/
var topStr = '';
var activeInput = '0';
var topDisplay = ko.observable(topStr);
var activeDisplay = ko.observable(activeInput);

function ViewModel() {
	
	var tempOperand = [];
	var holdingPen = [];
	var operandStr;
	
	self.enterDigit = function(numStr) {
		if (activeInput === '0' && numStr !== '.') {
			activeDisplay(activeInput = numStr);
		} else {
			activeDisplay(activeInput += numStr);
		}
	};
	
	self.storeOperation = function(numStr, operandStr) {
		if (numStr === ''){
			topStr = topStr.slice(0, -3);
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
			tempOperand = [];
			holdingPen = [];
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
		self.storeOperation(activeInput, ' = ');
	};
}
ko.applyBindings(new ViewModel());