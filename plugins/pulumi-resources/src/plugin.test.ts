import { pulumiResourcesPlugin } from './plugin';

describe('pulumi-resources', () => {
  it('should export plugin', () => {
    expect(pulumiResourcesPlugin).toBeDefined();
  });
});
