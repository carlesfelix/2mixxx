import jwksClient from 'jwks-rsa';
import environment from '../../environment';

const jwksAuth0Client = jwksClient({
  jwksUri: `https://${environment.AUTH0_DOMAIN}/.well-known/jwks.json`
});

export default jwksAuth0Client;
