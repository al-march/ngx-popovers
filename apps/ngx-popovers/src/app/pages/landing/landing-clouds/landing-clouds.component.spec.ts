import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingCloudsComponent } from './landing-clouds.component';

describe('LandingCloudsComponent', () => {
  let component: LandingCloudsComponent;
  let fixture: ComponentFixture<LandingCloudsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingCloudsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingCloudsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
