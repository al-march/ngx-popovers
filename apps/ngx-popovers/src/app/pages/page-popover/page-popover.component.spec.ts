import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagePopoverComponent } from './page-popover.component';

describe('PagePopoverComponent', () => {
  let component: PagePopoverComponent;
  let fixture: ComponentFixture<PagePopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagePopoverComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PagePopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
