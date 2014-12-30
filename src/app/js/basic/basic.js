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

		var template = can.view.mustache("<my-element count={{count}}></my-element>");
		$('#myElement').html(template({count: 45}));

		var templateAnother = can.view.mustache("<my-element-another count={{countAnother}}></my-element-another>");
		$('#myElementAnother').html(templateAnother({countAnother: 55}));

		var Router = can.Control({
			init: function () {
				console.log("called init routes");
			},
			"one route": function (data) {
				console.log("route change-one", data);
				$('#myElementAnother').empty();
				$('#myElement').html(template({count: 45}));
			},
			"two route": function (data) {
				console.log("route change-two", data);
				$('#myElement').empty();
				$('#myElementAnother').html(templateAnother({countAnother: 55}));
			}
		});

		var routes = new Router(document);
		can.route.ready();


	});
})();


//notes:
//scope of can.Component is can.Map which is observable.
//changing the scope object will reflect in the template.
//scope:componentViewModel
// var componentViewMode = can.Map.extends({
//      counter:0,
//	    add:function(){
//         this.attr('count',this.attr('count') + 1);
//      });
