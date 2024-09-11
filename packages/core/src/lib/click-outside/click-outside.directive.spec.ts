import { ClickOutsideDirective, ClickOutsideEvent } from './click-outside.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

@Component({
  template: `
    <div
      id="test-id"
      (ngxClickOutside)="click($event)"
      (inside)="inside($event)"
      (outside)="outside($event)"
    ></div>
  `,
  imports: [ClickOutsideDirective],
  standalone: true
})
class ClickOutsideDirectiveTest {
  inside: (event: EventTarget) => void = jest.fn();
  outside: (event: EventTarget) => void = jest.fn();
  click: (event: ClickOutsideEvent) => void = jest.fn();
}

describe('ClickOutsideDirective', () => {
  let elRef: HTMLElement;
  let component: ClickOutsideDirectiveTest;
  let fixture: ComponentFixture<ClickOutsideDirectiveTest>;

  beforeEach(async () => {
    elRef = document.createElement('div');
    document.body.appendChild(elRef);

    await TestBed.configureTestingModule({
      imports: [ClickOutsideDirectiveTest]
    }).compileComponents();

    fixture = TestBed.createComponent(ClickOutsideDirectiveTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const content = (): HTMLElement => document.querySelector('#test-id')!;

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should emit inside click', () => {
    content().click();
    const event: ClickOutsideEvent = {
      inside: true,
      outside: false,
      target: content()
    };
    expect(component.inside).toHaveBeenCalledWith(event.target);
    expect(component.click).toHaveBeenCalledWith(event);
  });

  it('should emit outside click', () => {
    document.body.click();
    const event: ClickOutsideEvent = {
      inside: false,
      outside: true,
      target: document.body
    };
    expect(component.outside).toHaveBeenCalledWith(event.target);
    expect(component.click).toHaveBeenCalledWith(event);
  });
});
