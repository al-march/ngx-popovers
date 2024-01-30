import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { NgxDialog } from '../dialog.module';
import { DialogComponent } from '../dialog';

@Component({
  template: `
    <ngx-dialog [value]="true">
      <ng-template ngx-dialog-template>
        <div id="test-template"></div>
      </ng-template>
    </ngx-dialog>
  `,
  standalone: true,
  imports: [
    NgxDialog
  ]
})
class DialogCloseTest {
}

describe('DialogTemplateDirective', () => {
  let component: DialogCloseTest;
  let fixture: ComponentFixture<DialogCloseTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCloseTest, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogCloseTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const dialog = (): DialogComponent => fixture.debugElement
    .query(By.directive(DialogComponent))
    .componentInstance;

  const template = (): HTMLElement => document.querySelector('#test-template')!;

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set template', () => {
    expect(dialog().templateRef).toBeTruthy();
  });

  it('should show template', () => {
    expect(template()).toBeInTheDocument();
  });
});
