import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { PopoverModule } from '../popover.module';
import { Arrow, awaitTime } from '@ngx-popovers/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { PopoverComponent } from './popover.component';

@Component({
  standalone: true,
  template: `
    <ngx-popover
      [(value)]="value"
    >
      <button>Trigger</button>
      
      <ng-template ngx-popover-template>
        <p id="popover-content">Lorem ipsum dolor.</p>
      </ng-template>
      
      <ngx-arrow />
    </ngx-popover>
  `,
  imports: [PopoverModule, Arrow]
})
class PopoverTest {
  @Input()
  value = false;
}

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

  const popover = (): PopoverComponent => fixture.debugElement
    .query(By.directive(PopoverComponent))
    .componentInstance;

  const pTrigger = (): HTMLElement => document.querySelector('ngx-popover')!;
  const pContent = (): HTMLElement => document.querySelector('#popover-content')!;

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set anchor by default', () => {
    expect(popover().anchor).toBe(document.querySelector('ngx-popover'));
  });

  describe('initial close state', () => {
    it('should open on trigger clicked', () => {
      pTrigger().click();
      fixture.detectChanges();

      expect(pContent()).toBeInTheDocument();
    });

    it('should open programmatically', () => {
      popover().open();
      fixture.detectChanges();
      expect(pContent()).toBeInTheDocument();
    });

    it('should emit show when opens', () => {
      const show = jest.spyOn(popover().show, 'emit');
      popover().open();
      fixture.detectChanges();

      expect(show).toHaveBeenCalled();
    });

    it('should emit animationStart when opens', async () => {
      const start = jest.spyOn(popover().animationStart, 'emit');
      popover().open();
      fixture.detectChanges();
      await awaitTime();
      expect(start).toHaveBeenCalled();
    });

    it('should emit computePosition', async () => {
      const compute = jest.spyOn(popover().computePosition, 'emit');
      popover().open();
      fixture.detectChanges();
      await awaitTime();
      expect(compute).toHaveBeenCalled();
    });

    it('should change value', () => {
      const value = popover().value;
      fixture.componentRef.setInput('value', true);
      fixture.detectChanges();

      expect(value).not.toBe(component.value);
    });

    it('should not toggle if disabled', async () => {
      popover().disabled = true;
      pTrigger().click();
      fixture.detectChanges();

      await awaitTime();
      expect(pContent()).not.toBeInTheDocument();
    });
  });

  describe('initial open state', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('value', true);
      fixture.detectChanges();
    });

    it('should render an arrow', () => {
      const arrow = document.querySelector('ngx-arrow');
      expect(arrow).toBeInTheDocument();
    });

    it('should close on trigger clicked', async () => {
      pTrigger().click();
      fixture.detectChanges();
      await awaitTime();
      expect(pContent()).not.toBeInTheDocument();
    });

    it('should close programmatically', async () => {
      popover().close();
      fixture.detectChanges();
      await awaitTime();
      expect(pContent()).not.toBeInTheDocument();
    });

    it('should emit hide when closes', () => {
      const hide = jest.spyOn(popover().hide, 'emit');

      fixture.componentRef.setInput('value', false);
      fixture.detectChanges();
      expect(hide).toHaveBeenCalled();
    });

    it('should emit animationDone when closes', async () => {
      const done = jest.spyOn(popover().animationDone, 'emit');
      popover().close();
      fixture.detectChanges();
      await awaitTime();
      expect(done).toHaveBeenCalled();
    });

    it('should change value', () => {
      const value = popover().value;
      fixture.componentRef.setInput('value', false);
      fixture.detectChanges();

      expect(value).not.toBe(component.value);
    });

    it('should emit click inside', () => {
      const inside = jest.spyOn(popover().clickedInside, 'emit');

      pContent().click();
      fixture.detectChanges();
      expect(inside).toHaveBeenCalled();
      expect(inside).toHaveBeenCalledWith(pContent());
    });

    it('should emit click outside', () => {
      const outside = jest.spyOn(popover().clickedOutside, 'emit');

      document.body.click();
      fixture.detectChanges();
      expect(outside).toHaveBeenCalled();
      expect(outside).toHaveBeenCalledWith(document.body);
    });

    it('should not toggle if disabled', async () => {
      popover().disabled = true;
      pTrigger().click();
      fixture.detectChanges();

      await awaitTime();
      expect(pContent()).toBeInTheDocument();
    });

    it('should close if clicked outside', async () => {
      const close = jest.spyOn(popover().hide, 'emit');
      document.body.click();
      fixture.detectChanges();

      await awaitTime();
      expect(close).toHaveBeenCalled();
      expect(popover().value).toBeFalsy();
    });

    it('should not close if clicked outside', async () => {
      popover().closeOnClickedOutside = false;
      const close = jest.spyOn(popover().hide, 'emit');
      document.body.click();
      fixture.detectChanges();

      await awaitTime();
      expect(close).not.toHaveBeenCalled();
      expect(popover().value).not.toBeFalsy();
    });
  });
});
