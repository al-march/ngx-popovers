import { Component, ElementRef, EventEmitter, HostListener, Input, Output, signal, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Derivable, FlipOptions, OffsetOptions, PortalComponent, ShiftOptions } from '@ngx-popovers/core';
import { FloatingComponent } from '@ngx-popovers/floating';
import { Placement } from '@floating-ui/dom';

@Component({
  selector: '[ngxPopover]',
  exportAs: 'ngxPopover',
  standalone: true,
  imports: [CommonModule, PortalComponent, FloatingComponent],
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.scss'
})
export class PopoverComponent {
  @Input('ngxPopover')
  template?: TemplateRef<any>;

  @Input()
  placement: Placement = 'bottom';

  @Input()
  flip?: FlipOptions | Derivable<FlipOptions>;

  @Input()
  shift?: ShiftOptions | Derivable<ShiftOptions>;

  @Input()
  offset?: OffsetOptions;

  @Output()
  show = new EventEmitter();

  @Output()
  hide = new EventEmitter();

  isShow = signal(false);

  get trigger() {
    return this.el.nativeElement;
  }

  constructor(
    private el: ElementRef
  ) {}

  @HostListener('click', ['$event'])
  onClick() {
    if (this.isShow()) {
      this.close();
      this.hide.emit();
    } else {
      this.open();
      this.show.emit();
    }
  }

  open() {
    this.isShow.set(true);
  }

  close() {
    this.isShow.set(false);
  }
}
