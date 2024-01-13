import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';

@Component({
  selector: 'ngx-popovers-page-arrow',
  standalone: true,
  imports: [
    TitleComponent
  ],
  templateUrl: './page-arrow.component.html',
  styleUrl: './page-arrow.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageArrowComponent {

}
