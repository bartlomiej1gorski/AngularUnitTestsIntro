import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { VoteComponent } from "./vote.component"
import { MockComponent } from "ng-mocks"
import { VoteButtonComponent } from "./vote-button/vote-button.component";

describe('VoteComponent', () => {
    let component: VoteComponent;
    let fixture: ComponentFixture<VoteComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                VoteComponent,
                MockComponent(VoteButtonComponent)
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(VoteComponent);
        component = fixture.componentInstance;
    });

    it('should has 0 votes on component init', () => {
        expect(component.votes).toBe(0);
    })

    it('should increment votes on increment', () => {
        component.increment();

        expect(component.votes).toBe(1);
    })

    it('should NOT decrement votes when votes count is 0 and decrement method is called', () => {
        component.decrement();

        expect(component.votes).toBe(0);
    })

    it('should decrement votes when votes count more than 0 and decrement method is called', () => {
        component.votes = 1;

        component.decrement();

        expect(component.votes).toBe(0);
    })

    it('should call increment method on incremernt button click', () => {
        const incrementButtonDe = fixture.debugElement.query(By.css('button.increment'));
        const incrementButton: HTMLElement = incrementButtonDe.nativeElement;
        const incrementSpy = spyOn(component, 'increment');

        incrementButton.click();

        expect(incrementSpy).toHaveBeenCalled();
    })
})