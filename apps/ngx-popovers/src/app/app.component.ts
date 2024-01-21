import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { NgxTooltip } from '@ngx-popovers/tooltip';
import { Arrow, FloatingComponent } from '@ngx-popovers/core';
import { TooltipConfigProvider, TooltipProvider } from './core/custom-tooltip';
import { ArrowProvider } from './core/custom-arrow';
import { HeaderComponent } from './template/header/header.component';
import { ComponentsRoutes, GettingStartedRoute } from './app.routes';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { filter, tap } from 'rxjs';
import { FooterComponent } from './template/footer/footer.component';
import { PopoverProvider } from './core/custom-popover';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    NgxTooltip,
    FloatingComponent,
    HeaderComponent,
    Arrow,
    NgComponentOutlet,
    NgClass,
    FooterComponent
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
export class AppComponent implements OnInit {
  sidebar = signal(false);
  router = inject(Router);

  gettingStartedRoute = GettingStartedRoute;
  componentsRoutes = ComponentsRoutes;

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      tap(() => this.sidebar.set(false))
    ).subscribe();
  }
}
