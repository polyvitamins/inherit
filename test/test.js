var assert = require('should');
var inherit = require('./../'+require('./../package.json').main);


/*
The logic is a condition that A is a main function, 
B - an auxiliary function. Initialization of B must occur before A, 
since A can use the results of execution B.
*/
describe('Simple inheritance', function() {
	var a = function() { this.test += 'b'; };
	var b = function() { this.test = 'a'; };
	var ab = inherit(a, [b]);
	var c = function() { this.test += 'c'; }
	var abc = inherit(c, ab);
	describe('The correct sequence', function() {
		it ('B must executes before A', function() {
			assert.equal((new ab()).test, 'ab');
		});

		it ('AB must executes before C', function() {
			assert.equal((new abc()).test, 'abc');
		});
	});
});

/*
The logic is a condition that A use prototype methods of B, so that
prototype of B should be mixed up before function A executing 
*/
describe('Inheritance with prototypes', function() {
	var a = function() {
		this.test = this.getB();
	};
	var b = function() {};
	b.prototype.getB = function() { return 'b'; };
	var ab = inherit(a, [b]);
	
	it ('AB must have prototype of B before executing', function(){
		assert.equal((new ab()).test, 'b');
	});
});