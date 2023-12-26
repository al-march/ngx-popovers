import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../../components/title/title.component';

@Component({
  selector: 'ngx-popovers-page-flip',
  standalone: true,
  imports: [CommonModule, TitleComponent],
  templateUrl: './page-flip.component.html',
  styleUrl: './page-flip.component.scss'
})
export class PageFlipComponent {
}
