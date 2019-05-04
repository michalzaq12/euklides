import {createApi} from "~/api/apiMethods";
import axios from "~/node_modules/axios";


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
};

export const httpClient = axios.create({
    baseURL: 'http://euklides-env.5smb4hxpjz.eu-west-2.elasticbeanstalk.com',
    headers,
    timeout: 6000
});


export const api = createApi(httpClient);

export * from '~/api/apiMethods';
