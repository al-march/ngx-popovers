import { InjectionToken } from '@angular/core';
import { NgxDialogConfig } from './dialog-config';

export const NGX_DIALOG_CONFIG = new InjectionToken('NGX_DIALOG_CONFIG', {
  providedIn: 'root',
  factory: () => new NgxDialogConfig()
});
