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
      imports: [FloatingComponent, BrowserAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FloatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const floating = () => document.querySelector('.floating') as HTMLElement;

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default options', () => {
    const config = new NgxFloatingConfig();
    expect(component.placement).toBe(config.placement);
    expect(component.autoUpdate).toBe(config.autoUpdate);
    expect(component.bindTo).toBe(config.bindTo);
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

  it('should not save cleanup func if autoUpdate === false', () => {
    fixture.componentRef.setInput('trigger', document.body);
    fixture.componentRef.setInput('autoUpdate', false);
    fixture.detectChanges();

    expect(component.cleanup).not.toBeTruthy();
  });

  it('should emit when click inside', () => {
    const inside = jest.spyOn(component.clickedInside, 'emit');
    floating().click();
    expect(inside).toHaveBeenCalled();
    expect(inside).toHaveBeenCalledWith(floating());
  });

  it('should emit when click outside', () => {
    const outside = jest.spyOn(component.clickedOutside, 'emit');
    document.body.click();
    expect(outside).toHaveBeenCalled();
    expect(outside).toHaveBeenCalledWith(document.body);
  });

  it('should create observable with computePositions', async () => {
    const compute = jest.spyOn(component.computePositionReturn, 'emit');
    fixture.componentRef.setInput('trigger', document.body);
    fixture.componentRef.setInput('autoUpdate', false);
    fixture.detectChanges();

    component.computePosition$.subscribe(data => {
      if (data) {
        expect(data).toBeTruthy();
      } else {
        expect(data).not.toBeTruthy();
      }
    });

    await component.bind();
    await new Promise(r => setTimeout(r));
    expect(compute).toHaveBeenCalled();
  })
});

describe('FloatingComponent.DI', () => {
  let component: FloatingComponent;
  let fixture: ComponentFixture<FloatingComponent>;

  const config = new NgxFloatingConfig({
    placement: 'left-start',
    autoUpdate: false,
    bindTo: document.body
  });

  beforeEach(async () => {
    const configProvider: Provider = {
      provide: NGX_FLOATING_CONFIG,
      useValue: config
    };

    await TestBed.configureTestingModule({
      providers: [configProvider],
      imports: [FloatingComponent, BrowserAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FloatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should use the custom config', () => {
    expect(component.config).toEqual(config);
  });
});
