import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoList } from '../../models/todo.model';
import { TodoListService } from '../../services/todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todoList$: Observable<TodoList>;

  constructor(
    private todoListService: TodoListService
  ) {
    this.todoList$ = this.todoListService.getTodoList();
  }

  ngOnInit(): void {
  }

}
