import { Keys } from './utils';

describe('utils', () => {

  describe('Keys', () => {
    class cl1 {
      key1 = 1;

      // should be ignored
      do() {}
    }

    class cl2 extends cl1{
      key2 = 2;
    }

    it('should return keys of object', () => {
      const obj: Record<string, any> = {};
      expect(Keys(obj)).toEqual([]);

      obj['key1'] = '';
      obj['key2'] = '';
      obj['key3'] = '';

      expect(Keys(obj)).toEqual(['key1', 'key2', 'key3']);
    });

    it('should work with classes', () => {
      const obj1 = new cl1();
      expect(Keys(obj1)).toHaveLength(1);
      expect(Keys(obj1)).toEqual(['key1']);

      const obj2 = new cl2();
      expect(Keys(obj2)).toHaveLength(2);
      expect(Keys(obj2)).toEqual(['key1', 'key2']);
    })
  });
});
