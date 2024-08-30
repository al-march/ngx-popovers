import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '@demo/pages/documentation/ui/components/title/title.component';

@Component({
  selector: 'ngx-popovers-page-shift',
  standalone: true,
  imports: [CommonModule, TitleComponent],
  templateUrl: './page-shift.component.html',
  styleUrl: './page-shift.component.scss'
})
export class PageShiftComponent {
}
