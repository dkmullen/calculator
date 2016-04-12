/**Calc*/
var topStr = '';
var activeInput = '0';
var topDisplay = ko.observable(topStr);
var activeDisplay = ko.observable(activeInput);

function ViewModel() {
	
	var a, b;
	
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
		
		topStr += (numStr + operandStr);
		topDisplay(topStr);
		activeInput = '';
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
}
ko.applyBindings(new ViewModel());