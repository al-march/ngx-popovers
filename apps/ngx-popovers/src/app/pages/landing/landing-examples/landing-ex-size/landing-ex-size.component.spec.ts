import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingExSizeComponent } from './landing-ex-size.component';

describe('LandingExSizeComponent', () => {
  let component: LandingExSizeComponent;
  let fixture: ComponentFixture<LandingExSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingExSizeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LandingExSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
