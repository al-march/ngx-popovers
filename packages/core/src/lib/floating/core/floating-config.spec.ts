import { NgxFloatingConfig } from './floating-config';

describe('FloatingConfig', () => {
  it('should create an instance', () => {
    expect(new NgxFloatingConfig()).toBeTruthy();
  });

  it('should be the same', () => {
    const config1 = new NgxFloatingConfig();
    const config2 = new NgxFloatingConfig(config1);

    expect(config1).toEqual(config2);
  });

  it('should rewrite fields', () => {
    const config = new NgxFloatingConfig({
      placement: 'left',
      bindTo: '.body',
      autoUpdate: false,
    });

    expect(config.placement).toBe('left');
    expect(config.bindTo).toBe('.body');
    expect(config.autoUpdate).toBe(false);
  });
});
