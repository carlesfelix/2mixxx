import jwksClient from 'jwks-rsa';
import environment from '../../environment';

const jwksAuth0Client = jwksClient({
  jwksUri: environment.AUTH0_JWKS_URI
});

export default jwksAuth0Client;
