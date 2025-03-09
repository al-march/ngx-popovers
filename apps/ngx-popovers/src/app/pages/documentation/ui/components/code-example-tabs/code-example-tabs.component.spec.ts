import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodeExampleTabsComponent } from './code-example-tabs.component';

describe('CodeExampleTabsComponent', () => {
  let component: CodeExampleTabsComponent;
  let fixture: ComponentFixture<CodeExampleTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeExampleTabsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CodeExampleTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
