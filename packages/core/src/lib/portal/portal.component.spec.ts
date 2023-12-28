import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortalComponent } from './portal.component';
import { Component, Input } from '@angular/core';

const testContentId = 'test-id';

describe('PortalComponent', () => {
  let component: PortalComponentTest;
  let fixture: ComponentFixture<PortalComponentTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalComponentTest]
    }).compileComponents();

    fixture = TestBed.createComponent(PortalComponentTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  const parentId = 'parent-id';

  const createParent = () => {
    const parent = document.createElement('div');
    parent.id = parentId;
    document.body.appendChild(parent);
    return parent;
  };

  const content = () => document.querySelector(`#${testContentId}`) as HTMLElement;


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render content into body by default', () => {
    expect(fixture.nativeElement).not.toHaveTextContent(testContentId);

    expect(content()).toBeInTheDocument();
    expect(content()).toHaveTextContent(testContentId);
  });

  it('should render content by bindTo (HTMLElement)', () => {
    const parent = createParent();
    fixture.componentRef.setInput('bindTo', parent);
    fixture.detectChanges();

    // Should be rendered into parent
    expect(content()).toBeInTheDocument();
    expect(content().parentElement?.id).toBe(parent.id);
  });

  it('should render content by bindTo (querySelector)', () => {
    const parent = createParent();
    fixture.componentRef.setInput('bindTo', `#${parentId}`);
    fixture.detectChanges();

    // Should be rendered into parent
    expect(content()).toBeInTheDocument();
    expect(content().parentElement?.id).toBe(parent.id);
  });
});

@Component({
  standalone: true,
  imports: [
    PortalComponent
  ],
  template: `
    <ngx-portal [bindTo]="bindTo"><div [id]="testId">{{ testId }}</div></ngx-portal>
  `
})
class PortalComponentTest {
  testId = testContentId;

  @Input()
  bindTo?: HTMLElement | string;
}
