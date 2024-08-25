import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '@demo/pages/documentation/ui/components/title/title.component';

@Component({
  selector: 'page-offset',
  standalone: true,
  imports: [CommonModule, TitleComponent],
  templateUrl: './page-offset.component.html',
  styleUrl: './page-offset.component.scss'
})
export class PageOffsetComponent {
}
