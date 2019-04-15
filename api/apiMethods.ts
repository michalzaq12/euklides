import { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import Axios from 'axios';

export interface Pageable {
    offset?: number;
    pageNumber?: number;
    pageSize?: number;
    paged?: boolean;
    sort?: Sort;
    unpaged?: boolean;
}
export interface Page<UserDto> {
    content?: Array<UserDto>;
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    number?: number;
    numberOfElements?: number;
    pageable?: Pageable;
    size?: number;
    sort?: Sort;
    totalElements?: number;
    totalPages?: number;
}
export interface PasswordUpdateDto {
    password: string;
}
export interface Sort {
    empty?: boolean;
    sorted?: boolean;
    unsorted?: boolean;
}
export interface Token {
    expirationDate: string;
    token: string;
}
export interface TokenRequest {}
export interface TokenResponse {
    authToken: Token;
    refreshToken: Token;
    userId: string;
}
export interface UserCreationDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}
export interface UserDto {
    creationDateTime: string;
    email: string;
    firstName: string;
    id: string;
    lastName: string;
}
export interface UserUpdateDto {
    firstName: string;
    lastName: string;
}
function setParam(distObject: any, key: string, param: any) {
    if (param !== undefined) distObject[key] = param;
}

export function createApi(axios: AxiosInstance = Axios.create({ baseURL: '' })): ApiInstance {
    return {
        $axios: axios,
        tokens: {
            /**
             * getToken
             * @method
             * @param { object } parameters
             * @param { object } config
             * @param { "credentials" | "refreshToken" }parameters.grantType - Determines whether username and password are used for authentication or refresh token
             * @param { string }[parameters.password] - Required if 'grantType' is 'credentials'
             * @param { string }[parameters.refreshToken] - Required if 'grantType' is 'refreshToken'.
             * @param { string }[parameters.login] - Required if 'grantType' is 'credentials'
             */
            getToken(parameters, config) {
                let path = `/token`;
                let queryParams: any = {};
                let data: any = {};

                setParam(data, 'grantType', parameters['grantType']);
                setParam(data, 'password', parameters['password']);
                setParam(data, 'refreshToken', parameters['refreshToken']);
                setParam(data, 'login', parameters['login']);

                return axios.request({
                    url: path,
                    method: 'POST',
                    params: queryParams,
                    data: data,
                    ...config
                });
            },

            $getToken(parameters, config) {
                return this.getToken(parameters, config).then(res => res && res.data);
            }
        },
        users: {
            /**
             * getPage
             * @method
             * @param { object } parameters
             * @param { object } config
             * @param { number }[parameters.offset] -
             * @param { number }[parameters.pageNumber] -
             * @param { number }[parameters.pageSize] -
             * @param { boolean }[parameters.paged] -
             * @param { boolean }[parameters.sortSorted] -
             * @param { boolean }[parameters.sortUnsorted] -
             * @param { boolean }[parameters.unpaged] -
             */
            getPage(parameters, config) {
                let path = `/users`;
                let queryParams: any = {};
                let data: any = {};

                if (parameters !== undefined) {
                    setParam(queryParams, 'offset', parameters['offset']);
                    setParam(queryParams, 'pageNumber', parameters['pageNumber']);
                    setParam(queryParams, 'pageSize', parameters['pageSize']);
                    setParam(queryParams, 'paged', parameters['paged']);
                    setParam(queryParams, 'sort.sorted', parameters['sortSorted']);
                    setParam(queryParams, 'sort.unsorted', parameters['sortUnsorted']);
                    setParam(queryParams, 'unpaged', parameters['unpaged']);
                }

                return axios.request({
                    url: path,
                    method: 'GET',
                    params: queryParams,
                    data: data,
                    ...config
                });
            },

            $getPage(parameters, config) {
                return this.getPage(parameters, config).then(res => res && res.data);
            }
            /**
             * create
             * @method
             * @param { object } config
             * @param dto -  */,
            create(dto, config) {
                let path = `/users`;
                let queryParams: any = {};
                let data: any = {};

                data = dto;

                return axios.request({
                    url: path,
                    method: 'POST',
                    params: queryParams,
                    data: data,
                    ...config
                });
            },

            $create(dto, config) {
                return this.create(dto, config).then(res => res && res.data);
            }
            /**
             * get
             * @method
             * @param { object } config
             * @param id -  */,
            get(id, config) {
                let path = `/users/${id}`;
                let queryParams: any = {};
                let data: any = {};

                return axios.request({
                    url: path,
                    method: 'GET',
                    params: queryParams,
                    data: data,
                    ...config
                });
            },

            $get(id, config) {
                return this.get(id, config).then(res => res && res.data);
            }
            /**
             * update
             * @method
             * @param { object } parameters
             * @param { object } config
             * @param { UserUpdateDto }parameters.dto - dto
             * @param { string }parameters.id - id
             */,
            update(parameters, config) {
                let path = `/users/${parameters.id}`;
                let queryParams: any = {};
                let data: any = {};

                data = parameters['dto'];

                return axios.request({
                    url: path,
                    method: 'PUT',
                    params: queryParams,
                    data: data,
                    ...config
                });
            },

            $update(parameters, config) {
                return this.update(parameters, config).then(res => res && res.data);
            }
            /**
             * delete
             * @method
             * @param { object } config
             * @param id -  */,
            delete(id, config) {
                let path = `/users/${id}`;
                let queryParams: any = {};
                let data: any = {};

                return axios.request({
                    url: path,
                    method: 'DELETE',
                    params: queryParams,
                    data: data,
                    ...config
                });
            },

            $delete(id, config) {
                return this.delete(id, config).then(res => res && res.data);
            }
            /**
             * updatePassword
             * @method
             * @param { object } parameters
             * @param { object } config
             * @param { PasswordUpdateDto }parameters.dto - dto
             * @param { string }parameters.id - id
             */,
            updatePassword(parameters, config) {
                let path = `/users/${parameters.id}/password`;
                let queryParams: any = {};
                let data: any = {};

                data = parameters['dto'];

                return axios.request({
                    url: path,
                    method: 'PUT',
                    params: queryParams,
                    data: data,
                    ...config
                });
            },

            $updatePassword(parameters, config) {
                return this.updatePassword(parameters, config).then(res => res && res.data);
            }
        }
    };
}

interface Core {
    $axios: AxiosInstance;
}

interface tokensResource {
    getToken(
        parameters: {
            grantType: 'credentials' | 'refreshToken';
            password?: string;
            refreshToken?: string;
            login?: string;
        },
        config?: AxiosRequestConfig
    ): AxiosPromise<TokenResponse>;
    $getToken(
        parameters: {
            grantType: 'credentials' | 'refreshToken';
            password?: string;
            refreshToken?: string;
            login?: string;
        },
        config?: AxiosRequestConfig
    ): Promise<TokenResponse>;
}
interface usersResource {
    getPage(
        parameters?: {
            offset?: number;
            pageNumber?: number;
            pageSize?: number;
            paged?: boolean;
            sortSorted?: boolean;
            sortUnsorted?: boolean;
            unpaged?: boolean;
        },
        config?: AxiosRequestConfig
    ): AxiosPromise<Page<UserDto>>;
    $getPage(
        parameters?: {
            offset?: number;
            pageNumber?: number;
            pageSize?: number;
            paged?: boolean;
            sortSorted?: boolean;
            sortUnsorted?: boolean;
            unpaged?: boolean;
        },
        config?: AxiosRequestConfig
    ): Promise<Page<UserDto>>;
    create(dto: UserCreationDto, config?: AxiosRequestConfig): AxiosPromise<UserDto>;
    $create(dto: UserCreationDto, config?: AxiosRequestConfig): Promise<UserDto>;
    get(id: string, config?: AxiosRequestConfig): AxiosPromise<UserDto>;
    $get(id: string, config?: AxiosRequestConfig): Promise<UserDto>;
    update(
        parameters: {
            dto: UserUpdateDto;
            id: string;
        },
        config?: AxiosRequestConfig
    ): AxiosPromise<UserDto>;
    $update(
        parameters: {
            dto: UserUpdateDto;
            id: string;
        },
        config?: AxiosRequestConfig
    ): Promise<UserDto>;
    delete(id: string, config?: AxiosRequestConfig): AxiosPromise<object>;
    $delete(id: string, config?: AxiosRequestConfig): Promise<object>;
    updatePassword(
        parameters: {
            dto: PasswordUpdateDto;
            id: string;
        },
        config?: AxiosRequestConfig
    ): AxiosPromise<object>;
    $updatePassword(
        parameters: {
            dto: PasswordUpdateDto;
            id: string;
        },
        config?: AxiosRequestConfig
    ): Promise<object>;
}

export interface ApiInstance extends Core {
    tokens: tokensResource;
    users: usersResource;
}
