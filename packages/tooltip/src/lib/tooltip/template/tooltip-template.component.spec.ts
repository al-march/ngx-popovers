import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { TooltipTemplate } from './tooltip-template.component';
import { TooltipBase } from '../core/tooltip-base.component';
import { By } from '@angular/platform-browser';

describe('TooltipComponent', () => {
  let component: TooltipTemplate;
  let fixture: ComponentFixture<TooltipTemplate>;

  const nativeEl = () => fixture.nativeElement as HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TooltipTemplate]
    }).compileComponents();

    fixture = TestBed.createComponent(TooltipTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be rendered', () => {
    expect(nativeEl()).toBeInTheDocument();
  });

  it('should emit mousemove', () => {
    const onMouseMove = jest.spyOn(component, 'onMousemove');

    const event = new MouseEvent('mousemove');
    nativeEl().dispatchEvent(event);
    expect(onMouseMove).toHaveBeenCalled();
    expect(onMouseMove).toHaveBeenCalledWith(event);
  });

  it('should emit hovered event with mousemove', () => {
    const emit = jest.spyOn(component.hovered, 'emit');

    const event = new MouseEvent('mousemove');
    nativeEl().dispatchEvent(event);

    expect(emit).toHaveBeenCalled();
    expect(emit).toHaveBeenCalledWith(true);
  });

  it('should emit mouseleave event', () => {
    const onMouseLeave = jest.spyOn(component, 'onMouseleave');

    const event = new MouseEvent('mouseleave');
    nativeEl().dispatchEvent(event);
    expect(onMouseLeave).toHaveBeenCalled();
    expect(onMouseLeave).toHaveBeenCalledWith(event);
  });

  it('should emit hovered event with mouseleave', () => {
    component.isHovered.set(true);
    const emit = jest.spyOn(component.hovered, 'emit');

    const event = new MouseEvent('mouseleave');
    nativeEl().dispatchEvent(event);

    expect(emit).toHaveBeenCalled();
    expect(emit).toHaveBeenCalledWith(false);
  });

  @Component({
    template: `text: {{ text }}`,
    standalone: true
  })
  class TestComponent extends TooltipBase {
  }

  it('should render a component', () => {
    fixture.componentRef.setInput('component', TestComponent);
    fixture.detectChanges();

    const comp = fixture.debugElement.query(By.directive(TestComponent));
    expect(comp.nativeElement).toBeInTheDocument();
  });

  it('should render tooltip text', () => {
    const text = 'lorem';

    fixture.componentRef.setInput('component', TestComponent);
    fixture.componentRef.setInput('text', text);
    fixture.detectChanges();

    const comp = fixture.debugElement.query(By.directive(TestComponent));
    expect(comp.nativeElement).toHaveTextContent(text);
  });
});

