import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { PopoverModule } from '@ngx-popovers/popover';
import { PopoverComponent } from '../popover/popover.component';
import { By } from '@angular/platform-browser';
import { awaitTime } from '@ngx-popovers/core';
import { ByQuery } from '../utils/test-utils';

@Component({
  standalone: true,
  template: `
    <ngx-popover value="true">      
      <ng-template ngx-popover-template>
        <p id="popover-content">Lorem ipsum dolor.</p>
        <button id="popover-close" ngx-popover-close></button>
      </ng-template>
    </ngx-popover>
  `,
  imports: [PopoverModule]
})
class PopoverTest {
}

describe('PopoverCloseDirective', () => {
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

  it('should be opened', () => {
    expect(ByQuery('#popover-content')).toBeInTheDocument();
  });

  it('should close by click on directive', async () => {
    const hide = jest.spyOn(popover().hide, 'emit');
    ByQuery('#popover-close').click();
    fixture.detectChanges();
    await awaitTime();

    expect(hide).toHaveBeenCalled();
    expect(popover().value).toBeFalsy();
  });
});
