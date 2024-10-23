import { AuthService, LoggerService } from '@backstage/backend-plugin-api';
import { catalogServiceRef } from '@backstage/plugin-catalog-node/alpha';

export async function createPulumiResourceService({
  logger,
}: {
  auth: AuthService;
  logger: LoggerService;
  catalog: typeof catalogServiceRef.T;
}): Promise<any> {
  logger.info('Initializing PulumiResourceService');

  return {
    async testing() {
      console.log('hey');
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users`,
      );
      return response.json() as Promise<any>;
    },
  };
}
