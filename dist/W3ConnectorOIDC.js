"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oidc_client_ts_1 = require("oidc-client-ts");
const js_cookie_1 = __importDefault(require("js-cookie"));
require("js-cookie");
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
        this.userManager = new oidc_client_ts_1.UserManager(config);
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
        js_cookie_1.default.remove("Authorization");
        js_cookie_1.default.remove("IdentityUserId");
        js_cookie_1.default.remove("ClientId");
        js_cookie_1.default.remove("IdentityPublicKey");
        js_cookie_1.default.remove("IdentityUserName");
        js_cookie_1.default.remove("id.session");
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
        js_cookie_1.default.set('Authorization', 'Bearer ' + access_token, options);
        this.decodeAccessToken(access_token);
    }
    decodeAccessToken(access_token) {
        const parsed = JSON.parse(atob(access_token.split('.')[1]));
        js_cookie_1.default.set('IdentityUserId', parsed['UserId']);
        js_cookie_1.default.set('ClientId', parsed['client_id']);
        js_cookie_1.default.set('IdentityPublicKey', parsed['PublicKey']);
        js_cookie_1.default.set('IdentityUserName', parsed['UserName']);
        js_cookie_1.default.set('id.session', parsed['sid']);
    }
}
exports.default = W3ConnectorOIDC;
//# sourceMappingURL=W3ConnectorOIDC.js.map