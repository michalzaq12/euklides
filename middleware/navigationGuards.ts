import config from '~/nuxt.config';
import {AuthStore} from "~/store/auth";

const unprotected = config.unprotectedRoutes;

export default ({store, redirect, route}) => {

    if(process.server) return;

    const authStore = AuthStore.CreateProxy( store, AuthStore );
    authStore.initStore();

    if(!unprotected.includes(route.path) && !authStore.isRefreshTokenValid) {
        redirect({
            path: '/login',
            query: { redirect: route.fullPath }
        })
    }

}
