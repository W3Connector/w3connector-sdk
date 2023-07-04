# W3Connector SDKs

---

Some examples of how to use W3Connector for your clients

## Web3Connector Login

---

### NextJs Typescript Example

From the project root create 4 files:

- ./components/w3c-auth/consts.ts

- ./pages/index.tsx

- ./pages/callback.tsx

- ./pages/logout.tsx

Run the command `npm i @w3connector/sdk`

Inside the `./components/w3c-auth/consts.ts` file insert the following code:

    import W3ConnectorOIDC from "@w3connector/sdk";

    export const w3connector = new W3ConnectorOIDC(
        'your_client_id',
        'your_client_password',
        'https://your-website/callback',
        'http://your-website-post-logout',
        'your w3connector scopes',
        'your-website-without-https'
    )

Inside the `./pages/login.tsx` file insert the following code:

    import { useEffect } from 'react';
    import type { NextPage } from 'next'
    import { w3connector } from '@/components/w3c-auth/const';

    const LoginPage: NextPage = () => {
        useEffect(() => {
        
        const login = async () => {
            await w3connector.login('/');
            console.log('Logged in:');
        };
    
        login();
        }, []);
    
        return <div>LOGIN</div>;
    };
    
    export default LoginPage;

Inside the `./pages/logout.tsx` file insert the following code:

    import { useEffect } from 'react';
    import type { NextPage } from 'next'
    import { w3connector } from '@/components/w3c-auth/const';

    const LogoutPage: NextPage = () => {
        useEffect(() => {
        
        const logout = async () => {
            await w3connector.logout();
            console.log('Logout');
        };
    
        logout();
        }, []);
    
        return <div>LOGOUT</div>;
    };
    
    export default LogoutPage;

Inside the `./pages/callback.tsx` file insert the following code:

    import { useEffect } from 'react';
    import type { NextPage } from 'next'
    import { w3connector } from '@/components/w3c-auth/const';
    import { useRouter } from 'next/router';

    const CallbackPage: NextPage = () => {
        const router = useRouter();
        useEffect(() => {
        
        const callback = async () => {
            await w3connector.handleCallback();
            console.log('Callback');
        };
    
        callback();

        // enter here the redirection to a specific page and the management of cookies provided by W3Connector

        }, []);
    
        return <div>Callback</div>;
    };
    
    export default CallbackPage;

_The W3Connector login implementation for your NextJs Typescript project is ready_

---