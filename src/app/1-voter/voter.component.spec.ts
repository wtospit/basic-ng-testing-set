import { VoterComponent } from './voter.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('TodosComponent', () => {
  let component: VoterComponent;
  let fixture: ComponentFixture<VoterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should render total voted", () => {
    component.othersVote = 20;
    component.myVote = 1;
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css(".vote-count"));
    let el: HTMLElement = de.nativeElement;

    expect(el.innerText).toContain("21");
  });

  it("should highlight the upvote button if i have voted", () => {
    component.myVote = 1;
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css(".glyphicon-menu-up"));

    expect(de.classes["highlighted"]).toBeTruthy();
  });

  it("should increase total votes when i click the upvote button", () => {
    let button = fixture.debugElement.query(By.css(".glyphicon-menu-up"));
    button.triggerEventHandler("click", null);

    expect(component.totalVotes).toEqual(1);
  });

});
