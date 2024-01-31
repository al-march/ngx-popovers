import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRouteSnapshot, ActivationEnd, NavigationEnd, Router, RouterModule } from '@angular/router';
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
import { FormsModule } from '@angular/forms';

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
    FooterComponent,
    FormsModule
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
  routesExpanded: Record<string, boolean> = {};

  gettingStartedRoute = GettingStartedRoute;
  componentsRoutes = ComponentsRoutes;

  ngOnInit() {
    this.router.events.pipe(
      tap((event) => {
        if (event instanceof ActivationEnd) {
          this.expandAll(event.snapshot);
        }
      }),
      filter(event => event instanceof NavigationEnd),
      tap(() => this.sidebar.set(false))
    ).subscribe();
  }

  expandAll = (snapshot: ActivatedRouteSnapshot | null) => {
    if (snapshot) {
      const router = snapshot.data['name'] ?? '';
      this.routesExpanded = { ...this.routesExpanded, [router]: true };
      this.expandAll(snapshot.parent);
    }
  };
}
