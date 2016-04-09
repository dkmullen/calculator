/**Calc*/
var activeInput = '';
var activeDisplay = ko.observable(activeInput);

function ViewModel() {
	this.keyListener = function(n) {
		activeInput += n;
		console.log(activeInput);
	};
}
ko.applyBindings(new ViewModel());