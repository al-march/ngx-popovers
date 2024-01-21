import { Component } from '@angular/core';
import { PopoverModule } from '../popover.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PopoverComponent } from '../popover/popover.component';
import { By } from '@angular/platform-browser';

@Component({
  standalone: true,
  template: `
    <ngx-popover value="true">      
      <ng-template ngx-popover-template>
        <p id="popover-content">Lorem ipsum dolor.</p>
      </ng-template>
    </ngx-popover>
  `,
  imports: [PopoverModule]
})
class PopoverTest {
}

describe('PopoverTemplateDirective', () => {
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

  const template = (): HTMLElement => fixture.debugElement
    .query(By.css('#popover-content'))
    .nativeElement;

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set template', () => {
    expect(popover().template).toBeTruthy();
  });

  it('should show template', () => {
    expect(template()).toBeInTheDocument();
  });
});
