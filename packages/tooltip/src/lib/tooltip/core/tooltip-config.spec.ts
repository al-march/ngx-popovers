import { NgxTooltipConfig } from './tooltip-config';

const Keys = <T extends object>(obj: T) => {
  return Object.keys(obj) as Array<keyof T>;
};

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
    const config = new NgxTooltipConfig();
    const debounce = config.debounce;

    const config2 = new NgxTooltipConfig({
      debounce: debounce + 100
    });

    expect(config2.debounce).toBe(debounce + 100);

    // Check if all other fields are the same
    Keys(config).forEach((key) => {
      if (key !== 'debounce') {
        expect(config[key]).toBe(config2[key]);
      }
    });
  });
});
