import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FloatingComponent } from './floating.component';
import { NgxFloatingConfig } from './core/floating-config';
import { NGX_FLOATING_CONFIG } from './core/floating.injections';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Provider } from '@angular/core';

describe('FloatingComponent', () => {
  let component: FloatingComponent;
  let fixture: ComponentFixture<FloatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatingComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FloatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default options', () => {
    const config = new NgxFloatingConfig();
    expect(component.config).toEqual(config);
    expect(component.placement).toBe(config.placement);
    expect(component.flip).toBe(config.flip);
    expect(component.shift).toBe(config.shift);
    expect(component.offset).toBe(config.offset);
    expect(component.arrow).toBe(config.arrow);
    expect(component.arrowPadding).toBe(config.arrowPadding);
  });
});

describe('FloatingComponent.DI', () => {
  let component: FloatingComponent;
  let fixture: ComponentFixture<FloatingComponent>;

  const config = new NgxFloatingConfig({
    placement: 'left-start',
    arrow: true,
    arrowPadding: 120,
    offset: 30
  });

  beforeEach(async () => {
    const configProvider: Provider = {
      provide: NGX_FLOATING_CONFIG,
      useValue: config
    };

    await TestBed.configureTestingModule({
      providers: [configProvider],
      imports: [FloatingComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FloatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should use the custom config', () => {
    expect(component.config).toEqual(config);
  });
});
