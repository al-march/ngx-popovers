import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocSectionComponent } from './doc-section.component';

describe('DocSectionComponent', () => {
  let component: DocSectionComponent;
  let fixture: ComponentFixture<DocSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocSectionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DocSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
