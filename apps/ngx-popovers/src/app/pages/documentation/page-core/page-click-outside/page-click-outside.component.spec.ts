import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageClickOutsideComponent } from './page-click-outside.component';

describe('PageClickOutsideComponent', () => {
  let component: PageClickOutsideComponent;
  let fixture: ComponentFixture<PageClickOutsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageClickOutsideComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PageClickOutsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
