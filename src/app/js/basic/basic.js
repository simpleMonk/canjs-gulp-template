$(function () {
	"use strict";
	can.Component.extend({
		tag: "my-element",
		template: "<div can-click='clickMe'>Hello!-{{ count}}</div>",
		scope: {
			count: '@',
			init: function (context, options) {
				console.log(context, options);
				if (!this.attr('count')) {
					this.attr('count', 0);
				}

			},
			clickMe: function (context, el, ev) {
				console.log('Click Liked', context, el, ev, typeof this.attr('count'));
				var countVal = parseInt(this.attr('count'), 10);
				this.attr('count', countVal + 1);
			}
		}

	});

	var template = can.view.mustache("<my-element count={{count}}></my-element>");
	$('#myElement').html(template({count: 45}));

});