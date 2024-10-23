import {
  BackstageCredentials,
  BackstageUserPrincipal,
} from '@backstage/backend-plugin-api';

export interface PulumiResourceService {
  testing(options?: {
    credentials: BackstageCredentials<BackstageUserPrincipal>;
  }): Promise<any>;
}

// async testing() {
//       const response = await fetch(
//         `https://jsonplaceholder.typicode.com/users`,
//       );
//       return response.json() as Promise<any>;
//     },
