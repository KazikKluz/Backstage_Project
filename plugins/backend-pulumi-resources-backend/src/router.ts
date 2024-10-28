import { HttpAuthService } from '@backstage/backend-plugin-api';

import express from 'express';
import Router from 'express-promise-router';
import { PulumiResourceService } from './services/PulumiResourceService/types';

export async function createRouter({
  pulumiResourceService,
}: {
  httpAuth: HttpAuthService;
  pulumiResourceService: PulumiResourceService;
}): Promise<express.Router> {
  const router = Router();
  router.use(express.json());

  router.get('/findResources', async (_req, res) => {
    res.json(await pulumiResourceService.findResources());
  });

  return router;
}
