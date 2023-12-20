import { Component, Input } from '@angular/core';


/**
 * Default tooltip component.
 *
 * It can be replaced with DI
 */
@Component({
  standalone: true,
  styles: `
    .ngx-tooltip {
      padding: 4px 10px;
      background: #FFFFFF;
      border: 1px solid #DDDDDD;
      border-radius: 4px;
    }
  `,
  template: `
    <div class="ngx-tooltip">
      {{ text }}
    </div>
  `
})
export class TooltipBase {
  @Input()
  text = '';
}
