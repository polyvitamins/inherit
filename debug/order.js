var assert = require('should');
var inherit = require('./../'+require('./../package.json').main);

var a = function() {
    this.test = this.getB();
};
var b = function() {};
b.prototype.getB = function() { return 'b'; };
var ab = inherit(a, [b]);
ab();