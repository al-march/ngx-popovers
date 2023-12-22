import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Provider } from '@angular/core';
import { NgxTooltip } from './tooltip';
import { NGX_TOOLTIP_CONFIG } from './core/tooltip.injections';
import { NgxTooltipConfig } from './core/tooltip-config';

describe('Tooltip', () => {
  let component: NgxTooltip;
  let fixture: ComponentFixture<NgxTooltip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxTooltip, BrowserAnimationsModule]
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
      imports: [NgxTooltip, BrowserAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(NgxTooltip);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should use the custom config', () => {
    expect(component.config).toEqual(config);
  });
});
