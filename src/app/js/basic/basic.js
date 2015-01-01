(function () {
	"use strict";
	$(function () {

		can.fixture('GET /todos', function () {
			return  [
				{description: "Task One", shortDescription: "Short description 1"},
				{description: "Task Two", shortDescription: "Short description 2"}
			];
		});

		var Todo = can.Model.extend({
			findAll: 'GET /todos'
		}, {});

		var TodoViewModel = can.Control.extend({
			defaults: {
				view: "#todoList"
			}
		}, {
			init: function (element, options) {
				var self = this;
				Todo.findAll({}, function (todos) {
					self.element.html(can.view(self.options.view, {todos: todos}));
				});
			},
			'li click': function (element, event) {
				var li = element.closest('li');
				// get the model
				var todo = li.data('todo');
				li.trigger('selected', todo);
			}

		});

		var EditorViewModel = can.Control.extend({
			setTodo: function (todo) {
				this.options.todo = todo;
				this.on();
				this.element.val(this.options.todo.shortDescription);

			},
			'change': function (el, evt) {
				var todo = this.options.todo;
				todo.attr('shortDescription', this.element.val());
				//todo.save();
			}
		});

		var editor = new EditorViewModel("#editTodoItem");

		$("#todoListView").bind('selected', function (event, todo) {
			editor.setTodo(todo);
		});


		var Router = can.Control({
			init: function () {
				console.log('Router init');
				$("#title").html("<h1>Home Page</h1>");
				$("#todoListView").empty();
			},
			'todos route': function () {
				$("#title").html("<h1>Todo Page</h1>");
				var todoControl = new TodoViewModel("#todoListView");
			}
		});

		can.route("todos");

		var router = new Router(document.body);

		can.route.ready();
	});

})();

