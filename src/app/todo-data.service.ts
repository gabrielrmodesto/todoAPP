import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable()
export class TodoDataService {
	lastID: number = 0;

	//placeholder for todos
	todos: Todo[] = [];

	constructor() { }

	//simulate POST route: /todo
	addTodo(todo: Todo): TodoDataService{
		if(!todo.id){
			todo.id = ++this.lastID;
		}
		this.todos.push(todo);
		return this;
	}

	//simulate DELETE route: /todo/:id
	deleteTodoById(id: number): TodoDataService{
		this.todos = this.todos.filter(todo => todo.id !== id);
		return this;
	}

	//simulate PUT route: /todo/:id
	updateTodoById(id: number, values: Object = {}): Todo{
		let todo = this.getTodoById(id);
		if(!todo){
			return null;
		}
		Object.assign(todo, values);
		return todo;
	}

	//simulate GET /todos
	getAllTodos(): Todo[]{
		return this.todos;
	}

	//simulate GET /todos/:id
	getTodoById(id: number): Todo{
		return this.todos.filter(todo => todo.id === id).pop();
	}

	//toggle todo id
	toggleTodoComplete(todo: Todo){
		let updatedTodo = this.updateTodoById(todo.id,{
			complete: !todo.complete
		});
		return updatedTodo;
	}
}
