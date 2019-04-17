import {ApiInstance} from '~/api/apiMethods'
import {api, httpClient} from '~/api';
import {AuthStore} from "~/store/auth";


export default ({ app, store, redirect }, inject) => {

    const authStore = AuthStore.CreateProxy( store, AuthStore );

    if(process.client) authStore.initStore();

    httpClient.interceptors.request.use(async config => {

        try {
            const token = await authStore.getBearerToken(config.url);
            if(token) config.headers['Authorization'] = `Bearer ${token}`;
        }catch (e) {
            redirect('/login');
        }

        return config;

    }, undefined);


    httpClient.interceptors.response.use(undefined, error => {
        const response = error.response;

        const containsMessage = (response && response.data && response.data.message);

        const message = containsMessage ? response.data.message : 'Ups ... ';

        app.$eventBus.$emit('api/error', message);

        return Promise.reject(error);
    });



    inject('api', api);
}




declare module "vue/types/vue" {
    interface Vue {
        $api: ApiInstance;
    }
}
