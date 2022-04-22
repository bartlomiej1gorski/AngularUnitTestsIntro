import { ComponentFixture, fakeAsync, flush, flushMicrotasks, inject, TestBed, tick } from '@angular/core/testing';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EMPTY, of, throwError } from 'rxjs';
import { TodoItem } from '../../models/todo-item.model';
import { TodoListService } from '../../services/todo-list.service';
import { AddTodoItemComponent } from './add-todo-item.component';
import { Component } from '@angular/core';

@Component({})
class TodoListComponentStub {
}

describe('AddTodoItemComponent', () => {
  let component: AddTodoItemComponent;
  let fixture: ComponentFixture<AddTodoItemComponent>;
  let globalService: jasmine.SpyObj<TodoListService>;

  beforeEach(() => {
    globalService = jasmine.createSpyObj<TodoListService>('TodoListService', ['addTodoItem']);
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTodoItemComponent, TodoListComponentStub],
      providers: [
        {
          provide: TodoListService,
          useValue: globalService
        }
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          {
            path: 'todo',
            component: TodoListComponentStub
          }
        ])
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTodoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('valid form', () => {
    beforeEach(() => {
      component.todoItemForm.controls['name'].setValue('name');
      component.todoItemForm.controls['description'].setValue('description');
    })

    it('should call add on submit', inject([TodoListService], (todoListService: jasmine.SpyObj<TodoListService>) => {
      todoListService.addTodoItem.and.returnValue(EMPTY);

      component.submit();

      expect(todoListService.addTodoItem).toHaveBeenCalled();
    }));

    it('should show alert with proper message when addTodoItem throws error', () => {
      // Option 1: Inject service using TestBed.inject
      const todoListService = TestBed.inject(TodoListService) as jasmine.SpyObj<TodoListService>;

      todoListService.addTodoItem.and.returnValue(throwError(() => new Error('error')));

      spyOn(window, 'alert');

      component.submit();

      expect(window.alert).toHaveBeenCalledOnceWith('Failed');
    });

    // Option 2: Inject service using inject method
    it('should show alert with proper message when addTodoItem success', inject([TodoListService], (todoListService: jasmine.SpyObj<TodoListService>) => {
      todoListService.addTodoItem.and.returnValue(of(new TodoItem.Response('id', 'name', 'desc')));
      spyOn(window, 'alert');

      component.submit();

      expect(window.alert).toHaveBeenCalledOnceWith('Success');
    }));

    // Option 3: Inject service using global scope variable
    it('should navigate to /todo when addTodoItem success', () => {
      globalService.addTodoItem.and.returnValue(of(new TodoItem.Response('id', 'name', 'desc')));

      const router = TestBed.inject(Router)
      spyOn(router, 'navigate');

      component.submit();

      expect(router.navigate).toHaveBeenCalledOnceWith(['/todo']);
    });
  })

  describe('valid inform', () => {
    let nameControl: AbstractControl;
    let descriptionControl: AbstractControl;

    beforeEach(() => {
      nameControl = component.todoItemForm.controls['name'];
      descriptionControl = component.todoItemForm.controls['description'];
    });

    it('should show error message when name field is empty and field is marked as touched', () => {
      nameControl.setValue('');
      nameControl.markAsTouched();
      fixture.detectChanges();

      const errorMessage = fixture.debugElement.query(By.css('#name ~ .invalid-feedback'))
      expect(errorMessage).toBeDefined();
    })

    it('should NOT show error message when name field is empty and field is marked as untouched', () => {
      nameControl.setValue('');
      fixture.detectChanges();

      const errorMessage = fixture.debugElement.query(By.css('#name ~ .invalid-feedback'))
      expect(errorMessage).toBeNull();
    })

    it('should NOT show error message when name field is NOT empty and field is marked as touched', () => {
      nameControl.setValue('test');
      fixture.detectChanges();

      const errorMessage = fixture.debugElement.query(By.css('#name ~ .invalid-feedback'))
      expect(errorMessage).toBeNull();
    })
  })
});
