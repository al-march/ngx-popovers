import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortalComponent } from './portal.component';
import { Component } from '@angular/core';

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render content into body', () => {
    expect(fixture.nativeElement).not.toHaveTextContent(testContentId)

    const component = document.querySelector(`#${testContentId}`);
    expect(component).toBeInTheDocument();
    expect(component).toHaveTextContent(testContentId);
  });
});

@Component({
  standalone: true,
  imports: [
    PortalComponent
  ],
  template: `
      <ngx-portal><div [id]="testId">{{testId}}</div></ngx-portal>
  `
})
class PortalComponentTest {
  testId = testContentId;
}
