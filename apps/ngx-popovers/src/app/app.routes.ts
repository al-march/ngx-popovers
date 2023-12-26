import { Route } from '@angular/router';
import { FlipIcon, GettingStartedIcon, OffsetIcon, ShiftIcon } from './routes-icons';


export const DocsRoutes: Route[] = [
  {
    path: 'getting-started',
    data: {
      name: 'Getting Started',
      icon: GettingStartedIcon,
      main: true,
    },
    loadComponent: () => import('./pages/page-getting-started/page-getting-started.component')
      .then(c => c.PageGettingStartedComponent)
  },
  {
    path: 'offset',
    data: {
      name: 'Offset',
      icon: OffsetIcon
    },
    loadComponent: () => import('./pages/page-offset/page-offset.component')
      .then(c => c.PageOffsetComponent)
  },
  {
    path: 'shift',
    data: {
      name: 'Shift',
      icon: ShiftIcon
    },
    loadComponent: () => import('./pages/page-shift/page-shift.component')
      .then(c => c.PageShiftComponent)
  },
  {
    path: 'flip',
    data: {
      name: 'Flip',
      icon: FlipIcon
    },
    loadComponent: () => import('./pages/page-flip/page-flip.component')
      .then(c => c.PageFlipComponent)
  }
];

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'getting-started',
    pathMatch: 'full'
  },
  ...DocsRoutes
];
