import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { NgxDialog } from '../dialog.module';
import { DialogComponent } from '../dialog';

@Component({
  template: `
    <ngx-dialog [value]="false">
      <button id="test-trigger" ngx-dialog-trigger>trigger</button>

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

describe('DialogTriggerDirective', () => {
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

  const trigger = (): HTMLElement => document.querySelector('#test-trigger')!;
  const template = (): HTMLElement => document.querySelector('#test-template')!;

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open by click on the trigger', () => {
    expect(template()).not.toBeInTheDocument();

    const open = jest.spyOn(dialog(), 'open');
    trigger().click();
    fixture.detectChanges();

    expect(open).toHaveBeenCalled();
    expect(template()).toBeInTheDocument();
  });
});
