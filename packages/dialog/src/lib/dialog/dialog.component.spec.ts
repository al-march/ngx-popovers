import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NgxDialog } from '../dialog.module';
import { DialogComponent } from './dialog.component';
import { awaitTime } from '@ngx-popovers/core';


@Component({
  template: `
    <ngx-dialog>
      <button id="trigger-test-id" ngx-dialog-trigger>Dialog</button>
      
      <ng-template ngx-dialog-template>
        <div id="content-test-id">
          content
        </div>
      </ng-template>
    </ngx-dialog>
  `,
  standalone: true,
  imports: [
    NgxDialog
  ]
})
class DialogTest {

}

describe('DialogComponent', () => {
  let component: DialogTest;
  let fixture: ComponentFixture<DialogTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogTest, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const dialog = (): DialogComponent => fixture.debugElement
    .query(By.directive(DialogComponent))
    .componentInstance;

  const dTrigger = (): HTMLElement => document.querySelector('#trigger-test-id')!;
  const dContent = (): HTMLElement => document.querySelector('#content-test-id')!;
  const dBackdrop = (): HTMLElement => document.querySelector('.ngx-dialog-backdrop')!;

  const open = async () => {
    dialog().open();
    fixture.detectChanges();
    await awaitTime();
  };

  const close = async () => {
    dialog().close();
    fixture.detectChanges();
    await awaitTime();
  };


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a trigger', () => {
    expect(dTrigger()).toBeInTheDocument();
  });

  it('should not render a content', () => {
    expect(dContent()).not.toBeInTheDocument();
  });

  it('should open by click on trigger', async () => {
    dTrigger().click();
    fixture.detectChanges();
    await awaitTime();

    expect(dialog().value).toBeTruthy();
    expect(dContent()).toBeInTheDocument();
  });

  it('should open by instance', async () => {
    await open();

    expect(dialog().value).toBeTruthy();
    expect(dContent()).toBeInTheDocument();
  });

  it('should render a backdrop', async () => {
    await open();
    expect(dBackdrop()).toBeInTheDocument();
  });

  it('should close by click on the backdrop', async () => {
    await open();

    dBackdrop().click();
    fixture.detectChanges();
    await awaitTime();

    expect(dContent()).not.toBeInTheDocument();
    expect(dialog().value).toBeFalsy();
  });

  it('should not close by click on the backdrop', async () => {
    dialog().closeOnBackdropClick = false;
    await open();

    dBackdrop().click();
    fixture.detectChanges();
    await awaitTime();

    expect(dContent()).toBeInTheDocument();
    expect(dialog().value).toBeTruthy();
  });

  it('should emit open/close events', async () => {
    const valueChange = jest.spyOn(dialog().valueChange, 'emit');
    const show = jest.spyOn(dialog().show, 'emit');
    const hide = jest.spyOn(dialog().hide, 'emit');

    await open();

    expect(valueChange).toHaveBeenCalledWith(true);
    expect(show).toHaveBeenCalled();

    await close();

    expect(valueChange).toHaveBeenCalledWith(false);
    expect(hide).toHaveBeenCalled();
  });

  it('should emit animation events', async () => {
    const start = jest.spyOn(dialog().animationStart, 'emit');
    const done = jest.spyOn(dialog().animationDone, 'emit');

    await open();
    expect(start).toHaveBeenCalled();
    await close();
    expect(done).toHaveBeenCalled();
  });

  it('should set the content class', async () => {
    dialog().contentClass = 'content-class';
    await open();

    const div = document.querySelector('.ngx-dialog-content')!;
    expect(div.classList.contains('content-class')).toBeTruthy();
  });

  it('should set the backdrop class', async () => {
    dialog().backdropClass = 'backdrop-class';
    await open();

    expect(dBackdrop().classList.contains('backdrop-class')).toBeTruthy();
  });
});
