import { Route } from '@angular/router';
import {
  ArrowIcon,
  ClickOutsideIcon,
  CoreIcon,
  DialogIcon,
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
  loadComponent: () => import('./pages/documentation/page-getting-started/page-getting-started.component')
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
        loadComponent: () => import('./pages/documentation/page-core/page-core.component')
          .then(c => c.PageCoreComponent)
      },
      {
        path: 'portal',
        title: 'Portal component',
        data: {
          name: 'Portal',
          description: 'The Portal component displays the content on the body by default or another DOM element.',
          icon: PortalIcon
        },
        loadComponent: () => import('./pages/documentation/page-core/page-portal/page-portal.component')
          .then(c => c.PagePortalComponent)
      },
      {
        path: 'floating',
        title: 'Floating component',
        data: {
          name: 'Floating',
          description: 'The Floating component implements the floating-ui library for Angular.',
          icon: FloatingIcon
        },
        loadComponent: () => import('./pages/documentation/page-core/page-floating/page-floating.component')
          .then(c => c.PageFloatingComponent)
      },
      {
        path: 'arrow',
        title: 'Arrow component',
        data: {
          name: 'Arrow',
          description: 'The arrow component should be used into the floating component.',
          icon: ArrowIcon
        },
        loadComponent: () => import('./pages/documentation/page-core/page-arrow/page-arrow.component')
          .then(c => c.PageArrowComponent)
      },
      {
        path: 'click-outside',
        title: 'Click outside directive',
        data: {
          name: 'Click outside',
          description: 'The click outside directive handles clicks inside and outside HTMLElement. This directive is used by the ngx-floating component.',
          icon: ClickOutsideIcon
        },
        loadComponent: () => import('./pages/documentation/page-core/page-click-outside/page-click-outside.component')
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
    loadComponent: () => import('./pages/documentation/page-tooltip/page-tooltip.component')
      .then(c => c.PageTooltipComponent)
  },
  {
    path: 'popover',
    title: 'Popover component',
    data: {
      name: 'Popover',
      icon: PopoverIcon
    },
    loadComponent: () => import('./pages/documentation/page-popover/page-popover.component')
      .then(c => c.PagePopoverComponent)
  },
  {
    path: 'dialog',
    title: 'Dialog component',
    data: {
      name: 'Dialog',
      icon: DialogIcon
    },
    loadComponent: () => import('./pages/documentation/page-dialog/page-dialog.component')
      .then(c => c.PageDialogComponent)
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
