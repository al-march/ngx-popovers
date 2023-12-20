import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TooltipTemplate } from './tooltip-template.component';

describe('TooltipComponent', () => {
  let component: TooltipTemplate;
  let fixture: ComponentFixture<TooltipTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TooltipTemplate],
    }).compileComponents();

    fixture = TestBed.createComponent(TooltipTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
