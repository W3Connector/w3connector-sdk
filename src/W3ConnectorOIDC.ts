import { UserManager, User } from 'oidc-client-ts';
import Cookies from 'js-cookie';
import 'js-cookie';

const defaultAuthority = 'https://authstaging.w3connector.com';
const responseType = 'code';

class W3ConnectorOIDC {
  private userManager: UserManager;
  
  constructor(
    clientId: string, 
    clientSecret: string, 
    redirectUri: string, 
    postLogoutRedirectUri: string, 
    scope: string, 
    requestDomain: string
    ) {
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

  public async login(redirect: string) {
    if(!this.userManager)
      {
        console.log('USERMANAGER NOT PRESENT')
      }
		await this.userManager.signinRedirect({ state: redirect });
	};

  public async logout() {
    this.userManager.signoutRedirect();
    Cookies.remove("Authorization");
		Cookies.remove("IdentityUserId");
		Cookies.remove("ClientId");
		Cookies.remove("IdentityPublicKey");
		Cookies.remove("IdentityUserName");
		Cookies.remove("id.session");
    return Promise.resolve();
  }

  public async handleCallback() {
    try {
			const user = await this.userManager.signinRedirectCallback();
			this?.setAccessToken(user, false);
			console.log("access token is Setted");
			window.history.replaceState({}, window.document.title, window.location.origin + window.location.pathname);
      return user;
    } catch (e) {
			console.log(e)
		}
    // return await this.userManager.signinRedirectCallback().catch(() => null);
  }

  setAccessToken(token: User, rememberMe = false): void {
    if (!token?.access_token) return;

    const { access_token, expires_in = 0 } = token;
    const now = new Date();
    const options = rememberMe ? { expires: now.setSeconds(now.getSeconds() + expires_in) } : undefined;

    Cookies.set('Authorization', 'Bearer ' + access_token, options);
    this.decodeAccessToken(access_token);
  }

  decodeAccessToken(access_token: string): void {
    const parsed = JSON.parse(atob(access_token.split('.')[1]));

    Cookies.set('IdentityUserId', parsed['UserId']);
    Cookies.set('ClientId', parsed['client_id']);
    Cookies.set('IdentityPublicKey', parsed['PublicKey']);
    Cookies.set('IdentityUserName', parsed['UserName']);
    Cookies.set('id.session', parsed['sid']);
  }
}

export default W3ConnectorOIDC;