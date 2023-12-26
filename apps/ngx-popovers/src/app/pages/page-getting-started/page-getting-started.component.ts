import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../components/title/title.component';

@Component({
  selector: 'ngx-popovers-page-getting-started',
  standalone: true,
  imports: [CommonModule, TitleComponent],
  templateUrl: './page-getting-started.component.html',
  styleUrl: './page-getting-started.component.scss',
})
export class PageGettingStartedComponent {}
