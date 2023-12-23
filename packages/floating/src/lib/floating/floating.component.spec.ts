import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FloatingComponent } from './floating.component';
import { NgxFloatingConfig } from './core/floating-config';
import { NGX_FLOATING_CONFIG } from './core/floating.injections';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Provider } from '@angular/core';
import { Placement } from '@floating-ui/dom';

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

  it('should has arrow', () => {
    const trigger = document.body;
    fixture.componentRef.setInput('trigger', trigger);
    fixture.componentRef.setInput('arrow', true);
    fixture.detectChanges();

    const arrow = document.querySelector('.floating__arrow');
    const arrowBase = arrow?.querySelector('.arrow');
    expect(arrow).toBeInTheDocument();
    expect(arrowBase).toBeInTheDocument();
  });

  it('should get correct side', () => {
    expect(component.getSide('top-end')).toBe('bottom');
    expect(component.getSide('left-start')).toBe('right');
    expect(component.getSide('bottom')).toBe('top');
    expect(component.getSide('right-end')).toBe('left');
  });

  it('should call bind when placement changes', () => {
    const bind = jest.spyOn(component, 'bind');

    fixture.componentRef.setInput('placement', 'top');
    fixture.detectChanges();
    expect(bind).toHaveBeenCalled();
  });

  it('should call bind when any prop changes', () => {
    const bind = jest.spyOn(component, 'bind');
    component.ngOnChanges();
    expect(bind).toHaveBeenCalled();
  });

  it('should call bind after content init', () => {
    const bind = jest.spyOn(component, 'bind');
    component.ngAfterViewInit();
    expect(bind).toHaveBeenCalled();
  });

  it('should save and call cleanup func', async () => {
    fixture.componentRef.setInput('trigger', document.body);
    fixture.detectChanges();

    expect(component.cleanup).toBeTruthy();

    const cleanup = jest.spyOn(component, 'cleanup');
    fixture.componentRef.setInput('placement', 'top');
    fixture.detectChanges();

    expect(cleanup).toHaveBeenCalled();
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
