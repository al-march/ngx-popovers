import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingExPlacementComponent } from './landing-ex-placement.component';

describe('LandingExPlacementComponent', () => {
  let component: LandingExPlacementComponent;
  let fixture: ComponentFixture<LandingExPlacementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingExPlacementComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LandingExPlacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
