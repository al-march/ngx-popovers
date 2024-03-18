import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageGettingStartedComponent } from './page-getting-started.component';

describe('PageGettingStartedComponent', () => {
  let component: PageGettingStartedComponent;
  let fixture: ComponentFixture<PageGettingStartedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageGettingStartedComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PageGettingStartedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
