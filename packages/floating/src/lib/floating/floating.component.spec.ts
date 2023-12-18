import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FloatingComponent } from './floating.component';

describe('FloatingComponent', () => {
  let component: FloatingComponent;
  let fixture: ComponentFixture<FloatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatingComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FloatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
