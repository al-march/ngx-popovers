import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  signal,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalComponent } from '@ngx-popovers/core';
import {
  computePosition,
  Derivable,
  flip,
  FlipOptions,
  offset,
  OffsetOptions,
  Placement,
  shift,
  ShiftOptions
} from '@floating-ui/dom';

@Component({
  selector: 'ngx-floating',
  standalone: true,
  imports: [CommonModule, PortalComponent],
  templateUrl: './floating.component.html',
  styleUrl: './floating.component.css'
})
export class FloatingComponent implements AfterViewInit, OnChanges {
  @ViewChild('floating')
  floatingRef?: ElementRef<HTMLElement>;

  @Input()
  trigger?: HTMLElement;

  @Input()
  placement: Placement = 'bottom';

  @Input()
  flip?: FlipOptions | Derivable<FlipOptions>;

  @Input()
  shift?: ShiftOptions | Derivable<ShiftOptions>;

  @Input()
  offset?: OffsetOptions;

  coords = signal({ x: 0, y: 0 });
  needTransition = signal(false);

  async ngAfterViewInit() {
    await this.bind();

    // Set transition styles after the first coords applied
    setTimeout(() => {
      this.needTransition.set(true);
    });
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['placement'].currentValue) {
      await this.bind();
    }
  }

  async bind() {
    const trigger = this.trigger;
    const floating = this.floatingRef?.nativeElement;
    if (trigger && floating) {
      const { x, y } = await computePosition(trigger, floating, {
        placement: this.placement,
        middleware: [
          flip(this.flip),
          shift(this.shift),
          offset(this.offset)
        ]
      });
      this.coords.set({ x, y });
    }
  }
}
