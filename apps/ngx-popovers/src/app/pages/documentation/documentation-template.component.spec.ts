import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentationTemplateComponent } from './documentation-template.component';

describe('DocumentationTemplateComponent', () => {
  let component: DocumentationTemplateComponent;
  let fixture: ComponentFixture<DocumentationTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentationTemplateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentationTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
