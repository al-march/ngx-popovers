import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Arrow, FloatingComponent } from "@ngx-popovers/core";

@Component({
  selector: 'demo-index',
  standalone: true,
  imports: [
    FloatingComponent,
    Arrow
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent { }
