import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxTooltip } from '@ngx-popovers/tooltip';

@Component({
  selector: 'demo-index',
  imports: [CommonModule, NgxTooltip],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
}
