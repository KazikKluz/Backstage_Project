import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './router';
import { catalogServiceRef } from '@backstage/plugin-catalog-node/alpha';
import { createTodoListService } from './services/TodoListService';
import { createPulumiResourceService } from './services/PulumiResourceService';

/**
 * backendPulumiResourcesPlugin backend plugin
 *
 * @public
 */
export const backendPulumiResourcesPlugin = createBackendPlugin({
  pluginId: 'backend-pulumi-resources',
  register(env) {
    env.registerInit({
      deps: {
        logger: coreServices.logger,
        auth: coreServices.auth,
        httpAuth: coreServices.httpAuth,
        httpRouter: coreServices.httpRouter,
        catalog: catalogServiceRef,
      },
      async init({ logger, auth, httpAuth, httpRouter, catalog }) {
        const todoListService = await createTodoListService({
          logger,
          auth,
          catalog,
        });

        const pulumiResourceService = await createPulumiResourceService({
          logger,
          auth,
          catalog,
        });

        httpRouter.use(
          await createRouter({
            httpAuth,
            todoListService,
            pulumiResourceService,
          }),
        );
      },
    });
  },
});