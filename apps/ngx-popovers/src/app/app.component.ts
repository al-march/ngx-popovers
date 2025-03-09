import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ArrowProvider } from './core/custom-arrow';
import { PopoverProvider } from './core/custom-popover';
import { TooltipConfigProvider, TooltipProvider } from './core/custom-tooltip';

@Component({
  imports: [
    RouterOutlet
  ],
  selector: 'ngx-popovers-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    TooltipProvider,
    TooltipConfigProvider,
    PopoverProvider,
    ArrowProvider
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

}
