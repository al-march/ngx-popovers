import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../components/title/title.component';
import { CoreIcon } from '../../routes-icons';
import { FormsModule } from '@angular/forms';
import { HighlightComponent } from '../../core/highlight/highlight.component';
import { RouterLink } from '@angular/router';
import { Placement } from '@ngx-popovers/core';
import { PopoverComponent } from '@ngx-popovers/popover';

const usageExample = `
<button
  #popover
  [ngxPopover]="popoverContent"
  [ngxValue]="true"
>
  Popover
</button>

<ng-template #popoverContent>
  <div class="popover">
    <p>I am popover!</p>
    <button
      (click)="popover.close()"
    >
      Close
    </button>
  </div>
</ng-template>
`.trim();

const configExample = `
import { Provider } from '@angular/core';
import { NGX_POPOVER_CONFIG, NgxPopoverConfig } from '@ngx-popovers/popover';

export const PopoverConfigProvider: Provider = {
  provide: NGX_POPOVER_CONFIG,
  useValue: new NgxPopoverConfig({
    placement: 'top-end',
    arrow: true
  })
};
`;

@Component({
  selector: 'ngx-popovers-page-popover',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    CoreIcon,
    FormsModule,
    HighlightComponent,
    RouterLink,
    PopoverComponent
  ],
  templateUrl: './page-popover.component.html',
  styleUrl: './page-popover.component.scss'
})
export class PagePopoverComponent {
  usageExample = usageExample;
  configExample = configExample;

  placement = signal<Placement>('left');

  placementList: Placement[] = [
    'left',
    'bottom',
    'right',
    'top'
  ];
}
