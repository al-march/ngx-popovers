import { Route } from '@angular/router';
import { FlipIcon, OffsetIcon, ShiftIcon } from './routes-icons';



export const appRoutes: Route[] = [
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
  },
];
