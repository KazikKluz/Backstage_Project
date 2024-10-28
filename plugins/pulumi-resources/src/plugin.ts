import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const pulumiResourcesPlugin = createPlugin({
  id: 'pulumi-resources',
  routes: {
    root: rootRouteRef,
  },
});

export const PulumiResourcesPage = pulumiResourcesPlugin.provide(
  createRoutableExtension({
    name: 'PulumiResourcesPage',
    component: () =>
      import('./components/PulumiResources').then(m => m.PulumiResources),
    mountPoint: rootRouteRef,
  }),
);
