import axios from 'axios';
import {createApi, ApiInstance} from '../api/index'

// Create fresh objects for all default header scopes
// Axios creates only one which is shared across SSR requests!
// https://github.com/mzabriskie/axios/blob/master/lib/defaults.js
const headers = {
    common : {
        'Accept': 'application/json, text/plain, */*'
    },
    delete: {},
    get: {},
    head: {},
    post: {},
    put: {},
    patch: {}
}

const httpClient = axios.create({
    baseURL: 'http://testeuklides.eu-west-2.elasticbeanstalk.com',
    headers
})


export default ({ app }, inject) => {
    httpClient.interceptors.response.use(undefined, error => {
        const response = error.response;

        const containsMessage = (response && response.data && response.data.message);

        const message = containsMessage ? response.data.message : 'Ups ... ';

        app.$eventBus.$emit('api/error', message);

        return Promise.reject(error);
    });

    inject('api', createApi(httpClient));
}




declare module "vue/types/vue" {
    interface Vue {
        $api: ApiInstance;
    }
}
