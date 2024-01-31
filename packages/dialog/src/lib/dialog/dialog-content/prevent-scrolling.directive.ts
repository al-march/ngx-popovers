import { Directive, inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

const disableKeys = new Set([
  'ArrowUp',
  'ArrowDown',
  'Space',
  'Numpad9',
  'Numpad3'
]);

/**
 * Disable all scrolling events
 */
@Directive({
  selector: '[ngxPreventScrolling]',
  standalone: true
})
export class PreventScrollingDirective implements OnInit, OnDestroy {
  private readonly doc = inject(DOCUMENT);

  ngOnInit(): void {
    this.disable();
  }

  ngOnDestroy(): void {
    this.enable();
  }

  disable() {
    this.doc.addEventListener('DOMMouseScroll', this.prevent, false);
    this.doc.addEventListener('wheel', this.prevent, { passive: false });
    this.doc.addEventListener('touchmove', this.prevent, { passive: false });
    this.doc.addEventListener('keydown', this.preventKeys, false);
  }

  enable() {
    this.doc.removeEventListener('DOMMouseScroll', this.prevent);
    this.doc.removeEventListener('wheel', this.prevent);
    this.doc.removeEventListener('touchmove', this.prevent);
    this.doc.removeEventListener('keydown', this.preventKeys);
  }

  prevent = (event: Event) => {
    event.preventDefault();
  };

  preventKeys = (event: KeyboardEvent) => {
    if (disableKeys.has(event.code)) {
      event.preventDefault();
    }
  };
}
