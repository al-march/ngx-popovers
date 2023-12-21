import { AfterViewInit, Component, ElementRef, inject, Input, OnChanges, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Derivable,
  flip,
  FlipOptions,
  FloatingService,
  offset,
  OffsetOptions,
  Placement,
  PortalComponent,
  shift,
  ShiftOptions
} from '@ngx-popovers/core';

@Component({
  selector: 'ngx-floating',
  standalone: true,
  imports: [CommonModule, PortalComponent],
  providers: [FloatingService],
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

  floatingService = inject(FloatingService);

  async ngAfterViewInit() {
    await this.bind();
  }

  async ngOnChanges() {
    await this.bind();
  }

  async bind() {
    const trigger = this.trigger;
    const floating = this.floatingRef?.nativeElement;
    if (trigger && floating) {
      const { x, y } = await this.floatingService.computePosition(trigger, floating, {
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
