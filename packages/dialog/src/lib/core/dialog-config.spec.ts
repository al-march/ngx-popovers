import { NgxDialogConfig } from './dialog-config';

describe('DialogConfig', () => {
  it('should create an instance', () => {
    expect(new NgxDialogConfig()).toBeTruthy();
  });

  it('should be the same', () => {
    const config1 = new NgxDialogConfig();
    const config2 = new NgxDialogConfig(config1);

    expect(config1).toEqual(config2);
  });

  it('should rewrite fields', () => {
    const config = new NgxDialogConfig({
      backdropClass: 'backdrop',
      contentClass: 'content',
      closeOnBackdropClick: false,
      animationDisabled: false
    });

    expect(config.backdropClass).toBe('backdrop');
    expect(config.contentClass).toBe('content');
    expect(config.closeOnBackdropClick).toBe(false);
    expect(config.animationDisabled).toBe(false);
  });
});
