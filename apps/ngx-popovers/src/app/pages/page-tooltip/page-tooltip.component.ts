import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../components/title/title.component';

@Component({
  selector: 'ngx-popovers-page-tooltip',
  standalone: true,
  imports: [CommonModule, TitleComponent],
  templateUrl: './page-tooltip.component.html',
  styleUrl: './page-tooltip.component.scss'
})
export class PageTooltipComponent {
}
