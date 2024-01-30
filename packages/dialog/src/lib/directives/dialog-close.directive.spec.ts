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
        <div id="close-id" ngx-dialog-close></div>
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

describe('DialogCloseDirective', () => {
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

  const closeEl = (): HTMLElement => document.querySelector('#close-id')!;

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog by directive', () => {
    const close = jest.spyOn(dialog(), 'close');
    closeEl().click();
    fixture.detectChanges();

    expect(close).toHaveBeenCalled();
  });
});
