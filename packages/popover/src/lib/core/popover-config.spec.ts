import { NgxPopoverConfig } from './popover-config';
import { Keys } from '@ngx-popovers/core';

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
    const config = new NgxPopoverConfig();
    const arrowPadding = config.arrowPadding;

    const config2 = new NgxPopoverConfig({
      arrowPadding: arrowPadding + 100
    });

    expect(config2.arrowPadding).toBe(arrowPadding + 100);

    // Check if all other fields are the same
    Keys(config).forEach((key) => {
      if (key !== 'arrowPadding') {
        expect(config[key]).toBe(config2[key]);
      }
    });
  });
});
