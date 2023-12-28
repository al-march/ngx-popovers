import { NgxFloatingConfig } from './floating-config';
import { Keys } from '../../utils/utils';

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
    const config = new NgxFloatingConfig();
    const arrowPadding = config.arrowPadding;

    const config2 = new NgxFloatingConfig({
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
