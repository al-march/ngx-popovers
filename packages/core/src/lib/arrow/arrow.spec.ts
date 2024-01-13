import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Arrow } from './arrow';
import { FloatingComponent } from '@ngx-popovers/core';
import { signal } from '@angular/core';

const FloatingMock = {
  arrowStyles: signal({}),
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
    component.ngAfterViewInit();
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
    const left = '10px';
    const top = '10px';
    FloatingMock.arrowStyles.set({ left, top });
    fixture.detectChanges();

    const arrow = component.arrowRef!.nativeElement;
    expect(arrow.style.left).toBe(left);
    expect(arrow.style.top).toBe(top);
  });
});
