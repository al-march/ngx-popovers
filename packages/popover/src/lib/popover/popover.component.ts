import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
  signal,
  TemplateRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Derivable, FlipOptions, OffsetOptions, ShiftOptions } from '@ngx-popovers/core';
import { FloatingArrowComponent, FloatingComponent } from '@ngx-popovers/floating';
import { Placement } from '@floating-ui/dom';
import { NGX_POPOVER_CONFIG } from '../core/popover.injections';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: '[ngxPopover]',
  exportAs: 'ngxPopover',
  standalone: true,
  imports: [CommonModule, FloatingComponent, FloatingArrowComponent],
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate(140, style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate(100, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class PopoverComponent {
  private config = inject(NGX_POPOVER_CONFIG);

  @Input('ngxPopover')
  template?: TemplateRef<any>;

  @Input()
  placement: Placement = this.config.placement;

  @Input()
  flip?: FlipOptions | Derivable<FlipOptions> = this.config.flip;

  @Input()
  shift?: ShiftOptions | Derivable<ShiftOptions> = this.config.shift;

  @Input()
  offset?: OffsetOptions = this.config.offset;

  @Input()
  arrow = this.config.arrow;

  @Input()
  arrowPadding = this.config.arrowPadding;

  /**
   * Updates floating element automatically
   */
  @Input()
  autoUpdate = this.config.autoUpdate;

  /**
   * HTMLElement where floating renders
   */
  @Input()
  bindTo = this.config.bindTo;

  @Input()
  ngxValue = false;

  @Output()
  ngxValueChange = new EventEmitter();

  @Output()
  show = new EventEmitter();

  @Output()
  hide = new EventEmitter();

  isAnimating = signal(false);

  get trigger() {
    return this.el.nativeElement;
  }

  constructor(
    private el: ElementRef
  ) {}

  @HostListener('click', ['$event'])
  onClick() {
    if (this.ngxValue) {
      this.close();
      this.hide.emit();
    } else {
      this.open();
      this.show.emit();
    }
  }

  open() {
    this.isAnimating.set(true);
    this.ngxValue = true;
    this.ngxValueChange.emit(true);
  }

  close() {
    this.isAnimating.set(true);
    this.ngxValue = false;
    this.ngxValueChange.emit(false);
  }
}
