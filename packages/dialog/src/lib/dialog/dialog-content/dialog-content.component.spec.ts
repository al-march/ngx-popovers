import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogContentComponent } from './dialog-content.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({
  template: `
    <ngx-dialog-content
      [template]="template"
    />
    
    <ng-template #template>
      <p id="content-test-id">content</p>
    </ng-template>
  `,
  standalone: true,
  imports: [
    DialogContentComponent
  ]
})
class DialogContentTest {}

describe('DialogContentComponent', () => {
  let component: DialogContentTest;
  let fixture: ComponentFixture<DialogContentTest>;
  let btn: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogContentTest]
    }).compileComponents();

    btn = document.createElement('button');
    document.body.appendChild(btn);
    btn.focus();

    fixture = TestBed.createComponent(DialogContentTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const content = (): DialogContentComponent => fixture.debugElement
    .query(By.directive(DialogContentComponent))
    .componentInstance;

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render content', () => {
    expect(document.querySelector('#content-test-id')).toBeInTheDocument();
  })

  it('should focus native element', async () => {
    expect(document.activeElement).toBe(content().el.nativeElement);
  });

  it('should save previous focus', () => {
    expect(content().prevActiveEl).toBe(btn);
  })

  it('should return focus to an element after destroy', async () => {
    fixture.destroy();
    expect(document.activeElement).toBe(btn);
  });
});
