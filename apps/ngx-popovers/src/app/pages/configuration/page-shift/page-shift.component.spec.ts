import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageShiftComponent } from './page-shift.component';

describe('PageShiftComponent', () => {
  let component: PageShiftComponent;
  let fixture: ComponentFixture<PageShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageShiftComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PageShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
