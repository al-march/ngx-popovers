import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocNavigationComponent } from './doc-navigation.component';

describe('DocNavigationComponent', () => {
  let component: DocNavigationComponent;
  let fixture: ComponentFixture<DocNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocNavigationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
