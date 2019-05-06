import { VuexModule, mutation, action, getter, Module } from "vuex-class-component";
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
    if(token === null || token === undefined) return false;
    const current_time = Date.now() / 1000;
    return Date.parse(token.expirationDate) >= current_time;
}


@Module({ namespacedPath: "auth/", target: "nuxt"})
export class AuthStore extends VuexModule {

    private refreshToken : Token;
    @getter authToken : Token;
    @getter userId : string;


    @mutation
    initStore(){
        this.refreshToken = VuexPersistence.getItem(REFRESH_TOKEN_KEY);
        this.authToken = VuexPersistence.getItem(AUTH_TOKEN_KEY);
        this.userId = VuexPersistence.getItem(USER_ID_KEY);
    }

    @mutation
    setAuth(tokenRes: TokenResponse){
        VuexPersistence.setItem(REFRESH_TOKEN_KEY, tokenRes.refreshToken);
        this.refreshToken = tokenRes.refreshToken;
        VuexPersistence.setItem(AUTH_TOKEN_KEY, tokenRes.authToken);
        this.authToken = tokenRes.authToken;
        VuexPersistence.setItem(USER_ID_KEY, tokenRes.userId);
        this.userId = tokenRes.userId;
    }

    @mutation
    purgeAuth(){
        this.refreshToken = null;
        this.authToken = null;
        this.userId = null;
        VuexPersistence.removeItem(REFRESH_TOKEN_KEY);
        VuexPersistence.removeItem(AUTH_TOKEN_KEY);
        VuexPersistence.removeItem(USER_ID_KEY);
    }

    get isRefreshTokenValid() : boolean{
        return validateToken(this.refreshToken);
    }

    get isAuthTokenValid() : boolean{
        return validateToken(this.authToken);
    }

    @action
    async login(payload: {login: string, password: string}) {
        const response = await api.tokens.$getToken({
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
        if(!this.isRefreshTokenValid && !this.isAuthTokenValid) return Promise.reject();
        if(this.isAuthTokenValid) return this.authToken.token;

        const response = await api.tokens.$getToken({
            grantType: "refreshToken",
            refreshToken: this.refreshToken.token
        });
        this.setAuth(response);
        return this.authToken.token;
    }
   
}


export default AuthStore.ExtractVuexModule( AuthStore );
