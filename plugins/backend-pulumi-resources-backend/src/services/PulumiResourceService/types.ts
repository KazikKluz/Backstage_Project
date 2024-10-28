import {
  BackstageCredentials,
  BackstageUserPrincipal,
} from '@backstage/backend-plugin-api';

export interface PulumiResourceService {
  findResources(options?: {
    credentials: BackstageCredentials<BackstageUserPrincipal>;
  }): Promise<any>;
}
