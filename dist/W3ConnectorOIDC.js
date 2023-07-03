import { UserManager } from 'oidc-client-ts';
import Cookies from 'js-cookie';
import 'js-cookie';
const defaultAuthority = 'https://authstaging.w3connector.com';
const responseType = 'code';
class W3ConnectorOIDC {
    constructor(clientId, clientSecret, redirectUri, postLogoutRedirectUri, scope, requestDomain) {
        const config = {
            authority: defaultAuthority,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
            post_logout_redirect_uri: postLogoutRedirectUri,
            response_type: responseType,
            scope: scope,
            extraQueryParams: { request_domain: requestDomain },
            automaticSilentRenew: true
        };
        this.userManager = new UserManager(config);
    }
    async login(redirect) {
        if (!this.userManager) {
            console.log('USERMANAGER NOT PRESENT');
        }
        await this.userManager.signinRedirect({ state: redirect });
    }
    ;
    async logout() {
        this.userManager.signoutRedirect();
        Cookies.remove("Authorization");
        Cookies.remove("IdentityUserId");
        Cookies.remove("ClientId");
        Cookies.remove("IdentityPublicKey");
        Cookies.remove("IdentityUserName");
        Cookies.remove("id.session");
        return Promise.resolve();
    }
    async handleCallback() {
        try {
            const user = await this.userManager.signinRedirectCallback();
            this === null || this === void 0 ? void 0 : this.setAccessToken(user, false);
            console.log("access token is Setted");
            window.history.replaceState({}, window.document.title, window.location.origin + window.location.pathname);
            return user;
        }
        catch (e) {
            console.log(e);
        }
        // return await this.userManager.signinRedirectCallback().catch(() => null);
    }
    setAccessToken(token, rememberMe = false) {
        if (!(token === null || token === void 0 ? void 0 : token.access_token))
            return;
        const { access_token, expires_in = 0 } = token;
        const now = new Date();
        const options = rememberMe ? { expires: now.setSeconds(now.getSeconds() + expires_in) } : undefined;
        Cookies.set('Authorization', 'Bearer ' + access_token, options);
        this.decodeAccessToken(access_token);
    }
    decodeAccessToken(access_token) {
        const parsed = JSON.parse(atob(access_token.split('.')[1]));
        Cookies.set('IdentityUserId', parsed['UserId']);
        Cookies.set('ClientId', parsed['client_id']);
        Cookies.set('IdentityPublicKey', parsed['PublicKey']);
        Cookies.set('IdentityUserName', parsed['UserName']);
        Cookies.set('id.session', parsed['sid']);
    }
}
export default W3ConnectorOIDC;
//# sourceMappingURL=W3ConnectorOIDC.js.map