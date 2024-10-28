import { AuthService, LoggerService } from '@backstage/backend-plugin-api';
import { catalogServiceRef } from '@backstage/plugin-catalog-node/alpha';

import {
  ResourceGroupsTaggingAPIClient,
  GetResourcesCommand,
  GetResourcesCommandOutput,
} from '@aws-sdk/client-resource-groups-tagging-api';

import { fromEnv } from '@aws-sdk/credential-providers';

const client = new ResourceGroupsTaggingAPIClient({
  region: 'eu-west-1',
  credentials: fromEnv(),
});

const params = {
  TagFilters: [
    {
      Key: 'Provisioner',
      Values: ['Pulumi'],
    },
  ],
};
const command = new GetResourcesCommand(params);

export async function createPulumiResourceService({
  logger,
}: {
  auth: AuthService;
  logger: LoggerService;
  catalog: typeof catalogServiceRef.T;
}): Promise<any> {
  logger.info('Initializing PulumiResourceService');

  return {
    async findResources() {
      const response = await client.send(command);
      return response as GetResourcesCommandOutput;
    },
  };
}
