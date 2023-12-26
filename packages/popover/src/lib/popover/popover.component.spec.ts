import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopoverComponent } from './popover.component';
import { Component, Input, ViewChild } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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

  const popover = () => document.querySelector('#test-popover-content');

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

  it('should toggle by click', () => {
    const btn = fixture.nativeElement.querySelector('button');
    btn.click();
    fixture.detectChanges();

    expect(popover()).toBeInTheDocument();

    btn.click();
    fixture.detectChanges();
    expect(popover()).not.toBeInTheDocument();
  });

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
});

@Component({
  standalone: true,
  template: `
    <button
      #popover
      [ngxPopover]="content"
      [(ngxValue)]="value"
      (ngxValueChange)="onValueChange($event)"
      (show)="onShow()"
      (hide)="onHide()"
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


  onValueChange($event: any) {

  }

  onShow() {

  }

  onHide() {

  }
}
