import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../../components/title/title.component';

@Component({
  selector: 'ngx-popovers-page-floating',
  standalone: true,
  imports: [CommonModule, TitleComponent],
  templateUrl: './page-floating.component.html',
  styleUrl: './page-floating.component.scss'
})
export class PageFloatingComponent {
}
