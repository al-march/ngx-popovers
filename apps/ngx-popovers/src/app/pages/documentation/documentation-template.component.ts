import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '@demo/template/footer';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '@demo/template/header';
import {
  ActivatedRoute,
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ngx-popovers-documentation-template',
  standalone: true,
  imports: [CommonModule, FooterComponent, FormsModule, HeaderComponent, RouterLinkActive, RouterOutlet, RouterLink],
  templateUrl: './documentation-template.component.html',
  styleUrl: './documentation-template.component.scss'
})
export class DocumentationTemplateComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly ref = inject(ChangeDetectorRef);

  sidebar = signal(false);
  routesExpanded = signal<Record<string, boolean>>({});

  gettingStartedRoute = GettingStartedRoute;
  componentsRoutes = ComponentsRoutes;

  constructor() {
    this.router.events.pipe(
      tap(event => {
        if (event instanceof ActivationEnd) {
          this.expandAll(event.snapshot);
          this.ref.detectChanges();
        }
      }),
      filter(event => event instanceof NavigationEnd && !!this.route.snapshot),
      tap(() => this.sidebar.set(false)),
      takeUntilDestroyed()
    ).subscribe();
  }

  expandAll = (snapshot: ActivatedRouteSnapshot | null) => {
    if (snapshot) {
      const router = snapshot.data['name'] ?? '';
      this.routesExpanded.update(routes => {
        return {
          ...routes,
          [router]: true
        };
      });
      this.expandAll(snapshot.parent);
    }
  };
}
