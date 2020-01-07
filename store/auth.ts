import { VuexModule, mutation, action, Module } from "vuex-class-component";
import {api, Token, TokenResponse} from "~/api";


const REFRESH_TOKEN_KEY = 'refreshToken';
const AUTH_TOKEN_KEY = 'authToken';
const USER_ID_KEY = 'userId';

const VuexPersistence = {
  setItem(key: string, value: any){
      window.localStorage.setItem(key, JSON.stringify(value));
  },
  getItem(key: string) : any {
      const returnedValue = window.localStorage.getItem(key);
      if(returnedValue === null) return null;
      else return JSON.parse(returnedValue);
  },
    removeItem(key: string){
      window.localStorage.removeItem(key);
    }
};


function validateToken(token: Token) : boolean {
    console.log('validating token:');
    if(token === null || token === undefined) return false;
    const current_time = Date.now();
    console.log(token);
    const isValid = Date.parse(token.expirationDate) >= current_time;
    console.log('isValid: ', isValid);
    return isValid;
}


@Module({ namespacedPath: "auth/", target: "nuxt"})
export class AuthStore extends VuexModule {

    private _refreshToken : Token = null;
    private _authToken : Token = null;
    private _userId : string = null;

    get userId() {
        return this._userId;
    }

    @mutation
    initStore(){
        this._refreshToken = VuexPersistence.getItem(REFRESH_TOKEN_KEY);
        this._authToken = VuexPersistence.getItem(AUTH_TOKEN_KEY);
        this._userId = VuexPersistence.getItem(USER_ID_KEY);
    }

    @mutation
    setAuth(tokenRes: TokenResponse){
        VuexPersistence.setItem(REFRESH_TOKEN_KEY, tokenRes.refreshToken);
        this._refreshToken = tokenRes.refreshToken;
        VuexPersistence.setItem(AUTH_TOKEN_KEY, tokenRes.authToken);
        this._authToken = tokenRes.authToken;
        VuexPersistence.setItem(USER_ID_KEY, tokenRes.userId);
        this._userId = tokenRes.userId;
    }

    @mutation
    purgeAuth(){
        this._refreshToken = null;
        this._authToken = null;
        this._userId = '';
        VuexPersistence.removeItem(REFRESH_TOKEN_KEY);
        VuexPersistence.removeItem(AUTH_TOKEN_KEY);
        VuexPersistence.removeItem(USER_ID_KEY);
    }

    get isRefreshTokenValid() : boolean{
        return validateToken(this._refreshToken);
    }

    get isAuthTokenValid() : boolean{
        return validateToken(this._authToken);
    }

    @action
    async login(payload: {login: string, password: string}) {
        const response = await api.tokens.$getAuthTokenAndRefreshToken({
            grantType: "credentials",
            login: payload.login,
            password: payload.password
        });
        this.setAuth(response);
        return response;
    }

    @action
    async logout(){
        this.purgeAuth();
    }

    @action
    async getBearerToken(url: string) : Promise <string | null> {
        if(url.endsWith('/token')) return null;
        if(!this.isRefreshTokenValid && !this.isAuthTokenValid) return Promise.reject("Invalid token");
        if(this.isAuthTokenValid) return this._authToken.token;

        const response = await api.tokens.$getAuthTokenAndRefreshToken({
            grantType: "refreshToken",
            refreshToken: this._refreshToken.token
        });
        this.setAuth(response);
        return this._authToken.token;
    }

}


export default AuthStore.ExtractVuexModule( AuthStore );
