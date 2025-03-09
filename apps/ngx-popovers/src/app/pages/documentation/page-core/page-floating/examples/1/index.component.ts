import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Arrow, flip, FloatingComponent, offset, shift } from '@ngx-popovers/core';

@Component({
  selector: 'demo-index',
  imports: [
    CommonModule,
    FloatingComponent,
    Arrow
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  middleware = [
    flip(),
    shift(),
    offset(8)
  ];
}
