import { Component } from '@angular/core';
import { PopoverModule } from '../popover.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PopoverComponent } from '../popover/popover.component';
import { By } from '@angular/platform-browser';
import { ByQuery } from '../utils/test-utils';
import { awaitTime } from '@ngx-popovers/core';


@Component({
  standalone: true,
  template: `
    <ngx-popover>  
      <button id="not-anchor"></button>
      <button id="is-anchor" ngx-popover-anchor></button>
      
      <ng-template ngx-popover-template>
        <p id="popover-content">Lorem ipsum dolor.</p>
      </ng-template>
    </ngx-popover>
  `,
  imports: [PopoverModule]
})
class PopoverTest {
}

describe('PopoverAnchorDirective', () => {
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open by anchor', async () => {
    const show = jest.spyOn(popover().show, 'emit');
    ByQuery('#is-anchor').click();
    fixture.detectChanges();
    await awaitTime();
    expect(show).toHaveBeenCalled();
    expect(popover().value).toBeTruthy();
  });

  it('should not open by default trigger', async () => {
    const show = jest.spyOn(popover().show, 'emit');
    ByQuery('ngx-popover').click();
    fixture.detectChanges();
    await awaitTime();
    expect(show).not.toHaveBeenCalled();
    expect(popover().value).not.toBeTruthy();
  });

  it('should not open by not-anchor', async () => {
    const show = jest.spyOn(popover().show, 'emit');
    ByQuery('#not-anchor').click();
    fixture.detectChanges();
    await awaitTime();
    expect(show).not.toHaveBeenCalled();
    expect(popover().value).not.toBeTruthy();
  });
});
