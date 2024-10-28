import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { pulumiResourcesPlugin, PulumiResourcesPage } from '../src/plugin';

createDevApp()
  .registerPlugin(pulumiResourcesPlugin)
  .addPage({
    element: <PulumiResourcesPage />,
    title: 'Root Page',
    path: '/pulumi-resources',
  })
  .render();
