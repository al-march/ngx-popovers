import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopoverComponent } from './popover.component';
import { Component, Input, ViewChild } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { awaitTime } from '@ngx-popovers/core';

describe('PopoverComponent', () => {
  let component: PopoverTest;
  let fixture: ComponentFixture<PopoverTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopoverTest, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const popover = () => document.querySelector('#test-popover-content') as HTMLElement;

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be open by value', () => {
    fixture.componentRef.setInput('value', true);
    fixture.detectChanges();
    expect(popover()).toBeInTheDocument();
  });

  it('should be close by value', () => {
    fixture.componentRef.setInput('value', false);
    fixture.detectChanges();
    expect(popover()).not.toBeInTheDocument();
  });

  it('should open/close programmatically', async () => {
    component.popover.open();
    fixture.detectChanges();
    expect(popover()).toBeInTheDocument();
    expect(component.value).toBeTruthy();

    component.popover.close();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(popover()).not.toBeInTheDocument();
    expect(component.value).toBeFalsy();
  });

  it('should toggle by click', async () => {
    const btn = fixture.nativeElement.querySelector('button');
    btn.click();
    fixture.detectChanges();

    expect(popover()).toBeInTheDocument();

    btn.click();
    fixture.detectChanges();
    await awaitTime();
    expect(popover()).not.toBeInTheDocument();
  });

  it('should not open when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const btn = fixture.nativeElement.querySelector('button');
    btn.click();

    fixture.detectChanges();
    expect(popover()).not.toBeInTheDocument();
  })

  it('should emit value changes', () => {
    const valueChange = jest.spyOn(component, 'onValueChange');
    component.popover.open();
    fixture.detectChanges();

    expect(valueChange).toHaveBeenCalledWith(true);

    component.popover.close();
    fixture.detectChanges();

    expect(valueChange).toHaveBeenCalledWith(false);
  });

  it('should emit show/hide', () => {
    const show = jest.spyOn(component, 'onShow');
    const hide = jest.spyOn(component, 'onHide');
    const btn = fixture.nativeElement.querySelector('button');

    btn.click();
    fixture.detectChanges();

    expect(show).toHaveBeenCalled();

    btn.click();
    fixture.detectChanges();

    expect(hide).toHaveBeenCalled();
  });

  it('should emit click inside', () => {
    fixture.componentRef.setInput('value', true);
    fixture.detectChanges();

    const inside = jest.spyOn(component, 'onInsideClicked');
    popover().click();
    expect(inside).toHaveBeenCalled();
    expect(inside).toHaveBeenCalledWith(popover());
  });

  it('should emit click outside', () => {
    fixture.componentRef.setInput('value', true);
    fixture.detectChanges();

    const outside = jest.spyOn(component, 'onOutsideClicked');
    document.body.click();
    expect(outside).toHaveBeenCalled();
    expect(outside).toHaveBeenCalledWith(document.body);
  });

  it('should not emit click outside when closed', () => {
    const outside = jest.spyOn(component, 'onOutsideClicked');
    document.body.click();
    expect(outside).not.toHaveBeenCalled();
  });
});

@Component({
  standalone: true,
  template: `
    <button
      #popover
      [ngxPopover]="content"
      [(ngxValue)]="value"
      [disabled]="disabled"
      (ngxValueChange)="onValueChange($event)"
      (show)="onShow()"
      (hide)="onHide()"
      (clickedOutside)="onOutsideClicked($event)"
      (clickedInside)="onInsideClicked($event)"
    >
      button
    </button>
    <ng-template #content>
        <div id="test-popover-content">
            <p>popover content</p>
        </div>
    </ng-template>
  `,
  imports: [
    PopoverComponent
  ]
})
class PopoverTest {
  @ViewChild('popover', { static: true })
  popover!: PopoverComponent;

  @Input()
  value = false;

  @Input()
  disabled = false;

  onValueChange($event: any) {}

  onShow() {}

  onHide() {}

  onInsideClicked($event: Element) {}

  onOutsideClicked($event: Element) {}
}
