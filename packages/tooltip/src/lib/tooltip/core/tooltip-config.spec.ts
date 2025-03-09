import { NgxTooltipConfig } from './tooltip-config';

describe('TooltipConfig', () => {
  it('should create an instance', () => {
    expect(new NgxTooltipConfig()).toBeTruthy();
  });

  it('should be the same', () => {
    const config1 = new NgxTooltipConfig();
    const config2 = new NgxTooltipConfig(config1);

    expect(config1).toEqual(config2);
  });

  it('should rewrite fields', () => {
    const config = new NgxTooltipConfig({
      debounce: 1000,
      placement: 'left',
      bindTo: '.body',
      autoUpdate: false
    });

    expect(config.debounce).toBe(1000);
    expect(config.placement).toBe('left');
    expect(config.bindTo).toBe('.body');
    expect(config.autoUpdate).toBe(false);
  });
});
