import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageTooltipComponent } from './page-tooltip.component';

describe('PageTooltipComponent', () => {
  let component: PageTooltipComponent;
  let fixture: ComponentFixture<PageTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageTooltipComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PageTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
