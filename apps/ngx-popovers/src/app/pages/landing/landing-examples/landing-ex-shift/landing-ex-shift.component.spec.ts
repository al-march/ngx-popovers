import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingExShiftComponent } from './landing-ex-shift.component';

describe('LandingExShiftComponent', () => {
  let component: LandingExShiftComponent;
  let fixture: ComponentFixture<LandingExShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingExShiftComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LandingExShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
