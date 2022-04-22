import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;


  beforeEach(() => {
    // no need to compileComponents if you're using webpack, since it bundles template and component into the same file
    // it's added by default by ng cli, so others .spec.ts files call that method

    TestBed.configureTestingModule({
      declarations: [LoadingComponent]
    });

    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render loader', () => {
    component.ngOnChanges();
    fixture.detectChanges();

    const loader = fixture.debugElement.query(By.css('.loader'));
    expect(loader.nativeElement).toBeDefined();
  });
});
