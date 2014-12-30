(function () {
	"use strict";

	$(function () {
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

		//component with events
		can.Component.extend({
			tag: "my-element-another",
			template: "<div>Hello!-{{ count}}</div>",
			scope: {
				count: '@',
				init: function (context, options) {
					if (!this.attr('count')) {
						this.attr('count', 0);
					}
				}
			},
			events: {
				click: function () {
					var countVal = parseInt(this.scope.attr('count'), 10);
					this.scope.attr('count', countVal + 1);
				}
			}

		});

		var template = can.view.mustache("<my-element count={{count}}></my-element><hr/><my-element-another count={{countAnother}}></my-element-another>");
		$('#myElement').html(template({count: 45, countAnother: 55}));

	});
})();