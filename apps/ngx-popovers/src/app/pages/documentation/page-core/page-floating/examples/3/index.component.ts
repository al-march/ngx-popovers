import { Component, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Arrow, FloatingComponent, NGX_FLOATING_CONFIG, NgxFloatingConfig, offset } from '@ngx-popovers/core';

export const FloatingConfigProvider: Provider = {
  provide: NGX_FLOATING_CONFIG,
  useValue: new NgxFloatingConfig({
    placement: 'right-start',
    autoUpdate: true,
    middleware: [
      offset(40)
    ]
  })
};

@Component({
  selector: 'demo-index',
  standalone: true,
  imports: [CommonModule, Arrow, FloatingComponent],
  providers: [FloatingConfigProvider],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
}
