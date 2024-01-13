import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageArrowComponent } from './page-arrow.component';

describe('PageArrowComponent', () => {
  let component: PageArrowComponent;
  let fixture: ComponentFixture<PageArrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageArrowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
