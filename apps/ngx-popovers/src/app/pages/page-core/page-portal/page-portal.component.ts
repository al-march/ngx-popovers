import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../../components/title/title.component';

@Component({
  selector: 'ngx-popovers-page-portal',
  standalone: true,
  imports: [CommonModule, TitleComponent],
  templateUrl: './page-portal.component.html',
  styleUrl: './page-portal.component.scss'
})
export class PagePortalComponent {
}
