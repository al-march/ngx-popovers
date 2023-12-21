import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxTooltip } from '@ngx-popovers/tooltip';
import { FloatingComponent } from '@ngx-popovers/floating';
import { Placement } from '@floating-ui/dom';
import { TooltipProvider } from './core/custom-tooltip';
import { ArrowProvider } from './core/custom-arrow';

@Component({
  standalone: true,
  imports: [RouterModule, NgxTooltip, FloatingComponent],
  selector: 'ngx-popovers-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [TooltipProvider, ArrowProvider]
})
export class AppComponent {
  placement: Placement = 'left';

  placementList: Placement[] = [
    'left-start',
    'left',
    'left-end',
    'bottom-start',
    'bottom',
    'bottom-end',
    'right-end',
    'right',
    'right-start',
    'top-end',
    'top',
    'top-start',
    'left-start'
  ];
}
