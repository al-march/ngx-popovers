import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Arrow } from './arrow';
import { FloatingComponent } from '@ngx-popovers/core';
import { Subject } from 'rxjs';

const FloatingMock = {
  computePosition$: new Subject<any>(),
  setArrow: (arrow: Arrow) => {}
};

describe('FloatingArrowComponent', () => {
  let component: Arrow;
  let fixture: ComponentFixture<Arrow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Arrow],
      providers: [{
        provide: FloatingComponent,
        useValue: FloatingMock
      }]
    }).compileComponents();

    fixture = TestBed.createComponent(Arrow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set arrow to floating ngAfterViewInit', async () => {
    const setArrow = jest.spyOn(FloatingMock, 'setArrow');
    await component.ngAfterViewInit();
    fixture.detectChanges();
    expect(setArrow).toHaveBeenCalled();
  });

  it('should set arrow after Input changes', () => {
    const setArrow = jest.spyOn(FloatingMock, 'setArrow');
    fixture.componentRef.setInput('padding', 0);
    fixture.detectChanges();
    expect(setArrow).toHaveBeenCalled();
  });

  it('should set styles', () => {
    const x = 10;
    const y = 10;

    FloatingMock.computePosition$.next({
      middlewareData: { arrow: { x, y } },
      placement: 'left'
    });
    fixture.detectChanges();

    const arrow = component.arrowRef!.nativeElement;
    expect(arrow.style.left).toBe(x + 'px');
    expect(arrow.style.top).toBe(y + 'px');
  });

  it('should get the correct side', () => {
    expect(component.getSide('top-end')).toBe('bottom');
    expect(component.getSide('left-start')).toBe('right');
    expect(component.getSide('bottom')).toBe('top');
    expect(component.getSide('right-end')).toBe('left');
  });
});
