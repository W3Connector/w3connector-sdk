import { User } from 'oidc-client-ts';
import 'js-cookie';
declare class W3ConnectorOIDC {
    private userManager;
    constructor(clientId: string, clientSecret: string, redirectUri: string, postLogoutRedirectUri: string, scope: string, requestDomain: string);
    login(redirect: string): Promise<void>;
    logout(): Promise<void>;
    handleCallback(): Promise<User | undefined>;
    setAccessToken(token: User, rememberMe?: boolean): void;
    decodeAccessToken(access_token: string): void;
}
export default W3ConnectorOIDC;
