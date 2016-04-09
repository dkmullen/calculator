/**Calc*/
var activeInput = '0';
var activeDisplay = ko.observable(activeInput);

function ViewModel() {
	self.enterDigit = function(n) {
		activeDisplay(activeInput += n);
	};
	
	self.zero = function() {
		self.enterDigit(0);
	};	
	
	self.one = function() {
		self.enterDigit(1);
	};
	
	self.two = function() {
		self.enterDigit(2);
	};
	
	self.three = function() {
		self.enterDigit(3);
	};
	
	self.four = function() {
		self.enterDigit(4);
	};

	self.five = function() {
		self.enterDigit(5);
	};
	
	self.six = function() {
		self.enterDigit(6);
	};
	
	self.seven = function() {
		self.enterDigit(7);
	};
	
	self.eight = function() {
		self.enterDigit(8);
	};
	
	self.nine = function() {
		self.enterDigit(9);
	};
	
	self.point = function() {
		self.enterDigit('.');
	};
	}
ko.applyBindings(new ViewModel());