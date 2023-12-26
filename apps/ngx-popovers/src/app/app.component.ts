import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxTooltip } from '@ngx-popovers/tooltip';
import { FloatingArrowComponent, FloatingComponent } from '@ngx-popovers/floating';
import { Placement } from '@floating-ui/dom';
import { TooltipConfigProvider, TooltipProvider } from './core/custom-tooltip';
import { ArrowProvider } from './core/custom-arrow';
import { PopoverComponent } from '@ngx-popovers/popover';
import { HeaderComponent } from './template/header/header.component';
import { DocsRoutes } from './app.routes';
import { NgClass, NgComponentOutlet } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterModule, NgxTooltip, FloatingComponent, PopoverComponent, HeaderComponent, FloatingArrowComponent, NgComponentOutlet, NgClass],
  selector: 'ngx-popovers-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [TooltipProvider, TooltipConfigProvider, ArrowProvider]
})
export class AppComponent {

  sidebar = signal(true);

  routes = DocsRoutes;
}
