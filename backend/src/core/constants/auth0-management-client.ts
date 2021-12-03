import { ManagementClient } from 'auth0';
import environment from '../../environment';

const auth0ManagementClient = new ManagementClient({
  domain: environment.AUTH0_DOMAIN,
  clientId: environment.AUTH0_MACHINE_TO_MACHINE_CLIENT_ID,
  clientSecret: environment.AUTH0_MACHINE_TO_MACHINE_CLIENT_SECRET,
  audience: `https://${environment.AUTH0_DOMAIN}/api/v2/`,
  scope: 'read:users update:users create:users delete:users',
});

export default auth0ManagementClient;
