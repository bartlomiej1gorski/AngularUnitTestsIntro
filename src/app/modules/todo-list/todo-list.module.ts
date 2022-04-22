import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoListRoutingModule } from './todo-list-routing.module';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { AddTodoItemComponent } from './components/add-todo-item/add-todo-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TodoListComponent,
    AddTodoItemComponent
  ],
  imports: [
    CommonModule,
    TodoListRoutingModule,
    NgbAlertModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TodoListModule { }
