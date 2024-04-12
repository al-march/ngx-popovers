import { Component } from '@angular/core';
import { TooltipConfigProvider, TooltipProvider } from './core/custom-tooltip';
import { ArrowProvider } from './core/custom-arrow';
import { PopoverProvider } from './core/custom-popover';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
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
  ]
})
export class AppComponent {

}
