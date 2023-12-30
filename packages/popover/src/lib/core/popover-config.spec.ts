import { NgxPopoverConfig } from './popover-config';

describe('PopoverConfig', () => {
  it('should create an instance', () => {
    expect(new NgxPopoverConfig()).toBeTruthy();
  });

  it('should be the same', () => {
    const config1 = new NgxPopoverConfig();
    const config2 = new NgxPopoverConfig(config1);

    expect(config1).toEqual(config2);
  });

  it('should rewrite fields', () => {
    const config = new NgxPopoverConfig({
      placement: 'left',
      bindTo: '.body',
      autoUpdate: false,
      arrow: true,
      arrowPadding: 12
    });

    expect(config.placement).toBe('left');
    expect(config.bindTo).toBe('.body');
    expect(config.autoUpdate).toBe(false);
    expect(config.arrow).toBe(true);
    expect(config.arrowPadding).toBe(12);
  });
});
