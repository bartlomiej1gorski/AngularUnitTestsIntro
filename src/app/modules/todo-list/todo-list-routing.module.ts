import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTodoItemComponent } from './components/add-todo-item/add-todo-item.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';

const routes: Routes = [
  {
    path: '',
    component: TodoListComponent
  },
  {
    path: 'add',
    component: AddTodoItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoListRoutingModule { }
