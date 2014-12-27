"use strict";

var Todo = can.Construct.extend({
	init: function (todo) {
		this.name = todo.name;
		this.isCompleted = false;
	}
}, {});