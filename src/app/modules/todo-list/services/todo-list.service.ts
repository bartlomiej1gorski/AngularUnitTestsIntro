import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoList } from '../models/todo.model';
import { Observable } from 'rxjs';
import { TodoItem } from '../models/todo-item.model';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor(
    private http: HttpClient
  ) { }

  getTodoList(): Observable<TodoList> {
    return this.http.get<TodoList>('http://localhost:5000/todolist');
  }

  addTodoItem(model: TodoItem.Request): Observable<TodoItem.Response> {
    return this.http.post<TodoItem.Response>('http://localhost:5000/todolist', model);
  }
}
