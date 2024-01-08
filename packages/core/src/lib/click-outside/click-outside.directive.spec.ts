import { ClickOutsideDirective } from './click-outside.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

@Component({
  template: `
    <div
      id="test-id"
      ngxClickOutside
      (inside)="inside($event)"
      (outside)="outside($event)"
    ></div>
  `,
  imports: [ClickOutsideDirective],
  standalone: true
})
class ClickOutsideDirectiveTest {
  inside($event: EventTarget) {}

  outside($event: EventTarget) {}
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

  const content = () => document.querySelector('#test-id') as HTMLElement;

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should emit inside click', () => {
    const inside = jest.spyOn(component, 'inside');
    content().click();
    expect(inside).toHaveBeenCalled();
    expect(inside).toHaveBeenCalledWith(content());
  });

  it('should emit outside click', () => {
    const outside = jest.spyOn(component, 'outside');
    document.body.click();
    expect(outside).toHaveBeenCalled();
    expect(outside).toHaveBeenCalledWith(document.body);
  })
});
