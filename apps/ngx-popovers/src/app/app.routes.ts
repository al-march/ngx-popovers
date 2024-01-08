import { Route } from '@angular/router';
import {
  ClickOutsideIcon,
  CoreIcon,
  FloatingIcon,
  GettingStartedIcon,
  PopoverIcon,
  PortalIcon,
  TooltipIcon
} from './routes-icons';

export const GettingStartedRoute: Route = {
  path: 'getting-started',
  title: 'Getting started',
  data: {
    name: 'Getting Started',
    icon: GettingStartedIcon,
    main: true
  },
  loadComponent: () => import('./pages/page-getting-started/page-getting-started.component')
    .then(c => c.PageGettingStartedComponent)
};
export const ComponentsRoutes: Route[] = [
  {
    path: 'core',
    data: {
      name: 'Core',
      icon: CoreIcon
    },
    children: [
      {
        path: '',
        title: 'Core package',
        loadComponent: () => import('./pages/page-core/page-core.component')
          .then(c => c.PageCoreComponent)
      },
      {
        path: 'floating',
        title: 'Floating component',
        data: {
          name: 'Floating',
          icon: FloatingIcon
        },
        loadComponent: () => import('./pages/page-core/page-floating/page-floating.component')
          .then(c => c.PageFloatingComponent)
      },
      {
        path: 'portal',
        title: 'Portal component',
        data: {
          name: 'Portal',
          icon: PortalIcon
        },
        loadComponent: () => import('./pages/page-core/page-portal/page-portal.component')
          .then(c => c.PagePortalComponent)
      },
      {
        path: 'click-outside',
        title: 'Click outside directive',
        data: {
          name: 'Click outside',
          icon: ClickOutsideIcon
        },
        loadComponent: () => import('./pages/page-core/page-click-outside/page-click-outside.component')
          .then(c => c.PageClickOutsideComponent)
      }
    ]
  },
  {
    path: 'tooltip',
    title: 'Tooltip component',
    data: {
      name: 'Tooltip',
      icon: TooltipIcon
    },
    loadComponent: () => import('./pages/page-tooltip/page-tooltip.component')
      .then(c => c.PageTooltipComponent)
  },
  {
    path: 'popover',
    title: 'Popover component',
    data: {
      name: 'Popover',
      icon: PopoverIcon
    },
    loadComponent: () => import('./pages/page-popover/page-popover.component')
      .then(c => c.PagePopoverComponent)
  }
];

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'getting-started',
    pathMatch: 'full'
  },
  GettingStartedRoute,
  ...ComponentsRoutes
];
