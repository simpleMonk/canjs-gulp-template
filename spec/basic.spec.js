"use strict";

var expect = chai.expect;

describe("module:todo", function () {

	it("should run tests", function () {
		expect(1).to.equal(1);
	});

	it("should load canjs", function () {
		expect(can.VERSION).to.equal("2.1.4");
	});


});