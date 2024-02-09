export interface DialogConfig {
  animationDisabled: boolean;
  contentClass: string;
  backdropClass: string;
  closeOnBackdropClick: boolean;
}

export class NgxDialogConfig implements DialogConfig {
  animationDisabled = false;
  contentClass = '';
  backdropClass = '';
  closeOnBackdropClick = true;

  constructor(
    config: Partial<DialogConfig> = {}
  ) {
    Object.assign(this, config);
  }
}
