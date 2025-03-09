import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageDialogComponent } from './page-dialog.component';

describe('PageDialogComponent', () => {
  let component: PageDialogComponent;
  let fixture: ComponentFixture<PageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageDialogComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
