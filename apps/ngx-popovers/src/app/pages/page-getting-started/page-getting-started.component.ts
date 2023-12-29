import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../components/title/title.component';
import { Placement } from '@floating-ui/dom';
import { FloatingArrowComponent, FloatingComponent } from '@ngx-popovers/core';
import { CoreIcon, PopoverIcon, TooltipIcon } from '../../routes-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ngx-popovers-page-getting-started',
  standalone: true,
  imports: [CommonModule, TitleComponent, FloatingComponent, FloatingArrowComponent, PopoverIcon, TooltipIcon, CoreIcon, RouterLink],
  templateUrl: './page-getting-started.component.html',
  styleUrl: './page-getting-started.component.scss'
})
export class PageGettingStartedComponent {
}
