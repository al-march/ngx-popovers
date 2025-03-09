import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '@demo/pages/documentation/ui/components/title/title.component';
import { CoreIcon, DialogIcon, PopoverIcon, TooltipIcon } from '@demo/app-routes-icons';
import { RouterLink } from '@angular/router';
import { HighlightComponent } from '@demo/core/highlight';

@Component({
  selector: 'ngx-popovers-page-getting-started',
  imports: [
    CommonModule,
    TitleComponent,
    PopoverIcon,
    TooltipIcon,
    CoreIcon,
    RouterLink,
    DialogIcon,
    HighlightComponent
  ],
  templateUrl: './page-getting-started.component.html',
  styleUrl: './page-getting-started.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageGettingStartedComponent {
}
