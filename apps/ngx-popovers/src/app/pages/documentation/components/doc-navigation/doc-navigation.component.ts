import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { ComponentsRoutes, GettingStartedRoute } from '@demo/app-routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ActivationEnd,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive
} from '@angular/router';
import { NgComponentOutlet } from '@angular/common';
import { filter, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ngx-doc-navigation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLinkActive,
    RouterLink,
    NgComponentOutlet,
    FormsModule
  ],
  templateUrl: './doc-navigation.component.html',
  styleUrl: './doc-navigation.component.scss'
})
export class DocNavigationComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly ref = inject(ChangeDetectorRef);

  protected readonly gettingStartedRoute = GettingStartedRoute;
  protected readonly componentsRoutes = ComponentsRoutes;

  routesExpanded = signal<Record<string, boolean>>({});

  constructor() {
    this.router.events.pipe(
      tap(event => {
        if (event instanceof ActivationEnd) {
          this.expandAll(event.snapshot);
          this.ref.detectChanges();
        }
      }),
      filter(event => event instanceof NavigationEnd && !!this.route.snapshot),
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
