import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../components/title/title.component';
import { Arrow, FloatingComponent } from '@ngx-popovers/core';
import { CoreIcon, DialogIcon, PopoverIcon, TooltipIcon } from '../../routes-icons';
import { RouterLink } from '@angular/router';
import { HighlightComponent } from '../../core/highlight/highlight.component';

@Component({
  selector: 'ngx-popovers-page-getting-started',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    FloatingComponent,
    Arrow,
    PopoverIcon,
    TooltipIcon,
    CoreIcon,
    RouterLink,
    DialogIcon,
    HighlightComponent
  ],
  templateUrl: './page-getting-started.component.html',
  styleUrl: './page-getting-started.component.scss'
})
export class PageGettingStartedComponent {
}
