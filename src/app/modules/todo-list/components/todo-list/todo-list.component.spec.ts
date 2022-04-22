import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TodoListComponent } from './todo-list.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { TodoListService } from '../../services/todo-list.service';
import { delay, of } from 'rxjs';
import { TodoList } from '../../models/todo.model';
import { TodoItem } from '../../models/todo-item.model';
import { By } from '@angular/platform-browser';
import { LoadingComponent } from 'src/app/components/shared/loading/loading.component';
import { MockModule } from 'ng-mocks';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todoService: jasmine.SpyObj<TodoListService>;

  beforeEach(() => {
    todoService = jasmine.createSpyObj<TodoListService>(['getTodoList']);
  });

  const initComponent = () => {
    TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      providers: [
        {
          provide: TodoListService,
          useValue: todoService
        }
      ],
      imports: [
        HttpClientTestingModule,
        MockModule(SharedModule)
      ]
    });

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  it('should create', () => {
    initComponent();
    expect(component).toBeTruthy();
  });

  it('should render as many items as service returns', () => {
    // as todoList$ is assigned in the contructor
    // we need to override service method behaviour (1) before we create component instance (2)
    //
    // if we don't want to create separate method (like initComponent) and still want be able to override service method behavior 
    // we need to move todoList$ to a ngOnInit method and run fixture.detectChanges()

    const todolist = new TodoList('1', [new TodoItem.Response('1', 'name', 'desc'), new TodoItem.Response('2', 'name', 'desc')]);
    todoService.getTodoList.and.returnValue(of(todolist)); // (1)

    initComponent(); // (2)

    expect(fixture.debugElement.queryAll(By.css('.todo-item')).length).toBe(todolist.todoItems.length);
  });

  it('should render loading component while waiting for getTodoList to return value', fakeAsync(() => {
    const todolist = new TodoList('1', [new TodoItem.Response('1', 'name', 'desc'), new TodoItem.Response('2', 'name', 'desc')]);
    todoService.getTodoList.and.returnValue(of(todolist).pipe(delay(1000)));
    initComponent();

    expect(fixture.debugElement.queryAll(By.directive(LoadingComponent)).length).toBe(1);

    tick(1000);
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.directive(LoadingComponent)).length).toBe(0);
  }));
});
