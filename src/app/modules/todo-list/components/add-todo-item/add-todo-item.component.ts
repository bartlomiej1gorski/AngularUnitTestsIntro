import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoItem } from '../../models/todo-item.model';
import { TodoListService } from '../../services/todo-list.service';

@Component({
  selector: 'app-add-todo-item',
  templateUrl: './add-todo-item.component.html',
  styleUrls: ['./add-todo-item.component.scss']
})
export class AddTodoItemComponent {
  todoItemForm: FormGroup;

  constructor(
    fb: FormBuilder,
    private router: Router,
    private todoListService: TodoListService
  ) {
    this.todoItemForm = fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })
  }

  public submit() {
    if (this.todoItemForm.invalid) {
      return;
    }

    this.add();
  }

  private add() {
    const todoItemRequest = this.getTodoItemRequest();
    this.todoListService.addTodoItem(todoItemRequest).subscribe({
      next: () => {
        alert('Success');
        this.router.navigate(['/todo'])
      },
      error: () => {
        alert('Failed');
      }
    })
  }

  private getTodoItemRequest(): TodoItem.Request {
    return {
      name: this.todoItemForm.controls['name'].value,
      description: this.todoItemForm.controls['description'].value,
    }
  }

}
