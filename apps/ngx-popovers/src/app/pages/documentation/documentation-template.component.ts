import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '@demo/template/footer';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '@demo/template/header';
import {
  ActivatedRouteSnapshot,
  ActivationEnd,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';
import { ComponentsRoutes, GettingStartedRoute } from '@demo/app-routes';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'ngx-popovers-documentation-template',
  standalone: true,
  imports: [CommonModule, FooterComponent, FormsModule, HeaderComponent, RouterLinkActive, RouterOutlet, RouterLink],
  templateUrl: './documentation-template.component.html',
  styleUrl: './documentation-template.component.scss'
})
export class DocumentationTemplateComponent implements OnInit {
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
