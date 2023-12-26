import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageFlipComponent } from './page-flip.component';

describe('PageFlipComponent', () => {
  let component: PageFlipComponent;
  let fixture: ComponentFixture<PageFlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageFlipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PageFlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
