import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageFloatingComponent } from './page-floating.component';

describe('PageFloatingComponent', () => {
  let component: PageFloatingComponent;
  let fixture: ComponentFixture<PageFloatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageFloatingComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PageFloatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
