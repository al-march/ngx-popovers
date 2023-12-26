import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagePortalComponent } from './page-portal.component';

describe('PagePortalComponent', () => {
  let component: PagePortalComponent;
  let fixture: ComponentFixture<PagePortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagePortalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PagePortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
