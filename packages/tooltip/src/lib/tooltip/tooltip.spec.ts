import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component, Provider } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NgxTooltip } from './tooltip';
import { NGX_TOOLTIP_CONFIG } from './core/tooltip.injections';
import { NgxTooltipConfig } from './core/tooltip-config';

describe('Tooltip', () => {
  let component: NgxTooltip;
  let fixture: ComponentFixture<NgxTooltip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxTooltip, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(NgxTooltip);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default options', () => {
    const config = new NgxTooltipConfig();
    expect(component.config).toEqual(config);
    expect(component.placement).toBe(config.placement);
    expect(component.debounce).toBe(config.debounce);
    expect(component.flip).toBe(config.flip);
    expect(component.shift).toBe(config.shift);
    expect(component.offset).toBe(config.offset);
    expect(component.arrow).toBe(config.arrow);
    expect(component.arrowPadding).toBe(config.arrowPadding);
  });
});

describe('Tooltip.DI', () => {
  let component: NgxTooltip;
  let fixture: ComponentFixture<NgxTooltip>;

  const config = new NgxTooltipConfig({
    placement: 'left-start',
    debounce: 1000,
    arrow: true,
    arrowPadding: 120,
    offset: 30
  });

  beforeEach(async () => {
    const configProvider: Provider = {
      provide: NGX_TOOLTIP_CONFIG,
      useValue: config
    };

    await TestBed.configureTestingModule({
      providers: [configProvider],
      imports: [NgxTooltip, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(NgxTooltip);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should use the custom config', () => {
    expect(component.config).toEqual(config);
  });
});

describe('Tooltip.DOM', () => {
  const tooltipText = 'tooltip text';

  @Component({
    template: `
      <button [ngxTooltip]="tooltipText">Button</button>
    `,
    imports: [NgxTooltip],
    standalone: true
  })
  class NgxTooltipTest {
    tooltipText = tooltipText;
  }

  let component: NgxTooltipTest;
  let fixture: ComponentFixture<NgxTooltipTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxTooltipTest, NoopAnimationsModule],
      providers: [
        {
          provide: NGX_TOOLTIP_CONFIG,
          useValue: new NgxTooltipConfig({
            debounce: 0
          })
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NgxTooltipTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const button = () => fixture.debugElement.query(By.css('button'));
  const tooltip = () => fixture.debugElement.query(By.directive(NgxTooltip));
  const tooltipInstance = () => tooltip().componentInstance as NgxTooltip;

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should open tooltip after mousemove', async () => {
    const mousemove = new MouseEvent('mousemove');
    button().nativeElement.dispatchEvent(mousemove);

    await fixture.whenStable();
    fixture.detectChanges();

    expect(tooltipInstance().isTooltipCreated()).toBeTruthy();
    expect(tooltipInstance().tooltipText).toBe(tooltipText);

    let floatingEl = document.querySelector('.floating');
    expect(floatingEl).toBeInTheDocument();
    expect(floatingEl).toHaveTextContent(tooltipText);
  });

  it('should close tooltip after mouseleave', async () => {
    const mousemove = new MouseEvent('mousemove');
    button().nativeElement.dispatchEvent(mousemove);
    const mouseleave = new MouseEvent('mouseleave');
    button().nativeElement.dispatchEvent(mouseleave);

    await fixture.whenStable();
    fixture.detectChanges();

    expect(tooltipInstance().isTooltipCreated()).toBeFalsy();
    const floatingEl = document.querySelector('.floating');
    expect(floatingEl).not.toBeInTheDocument();
  });
});

