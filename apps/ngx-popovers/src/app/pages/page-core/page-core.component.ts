import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../components/title/title.component';
import { CoreIcon } from '../../routes-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ngx-popovers-page-core',
  standalone: true,
  imports: [CommonModule, TitleComponent, CoreIcon, RouterLink],
  templateUrl: './page-core.component.html',
  styleUrl: './page-core.component.scss'
})
export class PageCoreComponent {
}
