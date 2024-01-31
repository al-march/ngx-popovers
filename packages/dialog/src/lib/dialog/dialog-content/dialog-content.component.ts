import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input, OnDestroy,
  Output,
  TemplateRef
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { PreventScrollingDirective } from './prevent-scrolling.directive';

@Component({
  selector: 'ngx-dialog-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog-content.component.html',
  styleUrl: './dialog-content.component.scss',
  hostDirectives: [PreventScrollingDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'tabindex': '0'
  }
})
export class DialogContentComponent implements AfterViewInit, OnDestroy {
  readonly el = inject(ElementRef);
  readonly doc = inject(DOCUMENT);

  @Input({ required: true })
  template!: TemplateRef<unknown>;

  @Output()
  close = new EventEmitter();

  /**
   * prevActiveEl is a focused element in the document
   * before the dialog content is init.
   */
  prevActiveEl: Element | null = null;

  @HostListener('keydown.esc', ['$event'])
  onEscPressed() {
    this.close.emit();
  }

  ngAfterViewInit() {
    this.prevActiveEl = this.doc.activeElement;
    this.el.nativeElement.focus();
  }

  ngOnDestroy() {
    if (this.prevActiveEl instanceof HTMLElement) {
      this.prevActiveEl.focus();
    }
  }
}
