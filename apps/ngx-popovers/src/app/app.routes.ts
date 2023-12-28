import { Route } from '@angular/router';
import {
  CoreIcon,
  FlipIcon,
  FloatingIcon,
  GettingStartedIcon,
  OffsetIcon,
  PopoverIcon,
  PortalIcon,
  ShiftIcon,
  TooltipIcon
} from './routes-icons';

export const GettingStartedRoute: Route = {
  path: 'getting-started',
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
        loadComponent: () => import('./pages/page-core/page-core.component')
          .then(c => c.PageCoreComponent)
      },
      {
        path: 'floating',
        data: {
          name: 'Floating',
          icon: FloatingIcon
        },
        loadComponent: () => import('./pages/page-core/page-floating/page-floating.component')
          .then(c => c.PageFloatingComponent)
      },
      {
        path: 'portal',
        data: {
          name: 'Portal',
          icon: PortalIcon
        },
        loadComponent: () => import('./pages/page-core/page-portal/page-portal.component')
          .then(c => c.PagePortalComponent)
      }
    ]
  },
  {
    path: 'tooltip',
    data: {
      name: 'Tooltip',
      icon: TooltipIcon
    },
    loadComponent: () => import('./pages/page-tooltip/page-tooltip.component')
      .then(c => c.PageTooltipComponent)
  },
  {
    path: 'popover',
    data: {
      name: 'Popover',
      icon: PopoverIcon
    },
    loadComponent: () => import('./pages/page-popover/page-popover.component')
      .then(c => c.PagePopoverComponent)
  }
];

export const ConfigurationRoutes: Route[] = [
  {
    path: 'offset',
    data: {
      name: 'Offset',
      icon: OffsetIcon
    },
    loadComponent: () => import('./pages/configuration/page-offset/page-offset.component')
      .then(c => c.PageOffsetComponent)
  },
  {
    path: 'shift',
    data: {
      name: 'Shift',
      icon: ShiftIcon
    },
    loadComponent: () => import('./pages/configuration/page-shift/page-shift.component')
      .then(c => c.PageShiftComponent)
  },
  {
    path: 'flip',
    data: {
      name: 'Flip',
      icon: FlipIcon
    },
    loadComponent: () => import('./pages/configuration/page-flip/page-flip.component')
      .then(c => c.PageFlipComponent)
  }
];

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'getting-started',
    pathMatch: 'full'
  },
  GettingStartedRoute,
  ...ConfigurationRoutes,
  ...ComponentsRoutes
];
