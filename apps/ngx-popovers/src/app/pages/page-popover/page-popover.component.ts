import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../components/title/title.component';

@Component({
  selector: 'ngx-popovers-page-popover',
  standalone: true,
  imports: [CommonModule, TitleComponent],
  templateUrl: './page-popover.component.html',
  styleUrl: './page-popover.component.scss',
})
export class PagePopoverComponent {}
