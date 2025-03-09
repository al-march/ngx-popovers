import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingExFlipComponent } from './landing-ex-flip.component';

describe('LandingExFlipComponent', () => {
  let component: LandingExFlipComponent;
  let fixture: ComponentFixture<LandingExFlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingExFlipComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LandingExFlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
