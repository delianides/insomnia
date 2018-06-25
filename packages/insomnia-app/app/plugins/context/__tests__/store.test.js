import * as plugin from '../store';
import { globalBeforeEach } from '../../../__jest__/before-each';

const PLUGIN = {
  name: 'my-plugin',
  version: '1.0.0',
  directory: '/plugins/my-plugin',
  module: {}
};

describe('init()', () => {
  beforeEach(globalBeforeEach);
  it('initializes correctly', async () => {
    const result = plugin.init({ name: PLUGIN });
    expect(Object.keys(result.store).sort()).toEqual([
      'getItem',
      'hasItem',
      'removeItem',
      'setItem'
    ]);
  });
});

describe('store.*', () => {
  beforeEach(globalBeforeEach);
  it('all methods work', async () => {
    const p = plugin.init(PLUGIN);

    // Null item for no result
    expect(await p.store.getItem('unset-key')).toBeNull();

    // Add something
    await p.store.setItem('color', 'blue');
    expect(await p.store.getItem('color')).toBe('blue');
    expect(await p.store.hasItem('color')).toBe(true);

    // Remove something
    await p.store.removeItem('color');
    expect(await p.store.hasItem('color')).toBe(false);
    expect(await p.store.getItem('color')).toBeNull();
  });
});
