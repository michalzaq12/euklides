import { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import Axios from 'axios';

export interface Choice {
    label: string;
    order: number;
}
export interface ExerciseRequest {
    answer?: string;
    choices?: Array<Choice>;
    correctChoiceOrder?: number;
    name: string;
    points?: Array<Point>;
    content: string;
    class?: number;
    type: 'CLOSED' | 'OPEN' | 'OPEN_WITH_POINTS';
}
export interface ExerciseResponse {
    answer?: string;
    choices?: Array<Choice>;
    class: number;
    content: string;
    correctChoiceOrder?: number;
    creationDateTime: string;
    id: string;
    name: string;
    points?: Array<Point>;
    type: 'CLOSED' | 'OPEN' | 'OPEN_WITH_POINTS';
}
export interface ExerciseResponseWithAuthor {
    answer?: string;
    choices?: Array<Choice>;
    class: number;
    content: string;
    correctChoiceOrder?: number;
    createdBy: User;
    creationDateTime: string;
    id: string;
    name: string;
    points?: Array<Point>;
    type: 'CLOSED' | 'OPEN' | 'OPEN_WITH_POINTS';
}
export interface Pageable {
    offset?: number;
    pageNumber?: number;
    pageSize?: number;
    paged?: boolean;
    sort?: Sort;
    unpaged?: boolean;
}

export interface Page<UserResponse> {
    content?: Array<UserResponse>;
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
export interface PasswordUpdateRequest {
    password: string;
}
export interface Point {
    answer?: string;
    content: string;
    order: number;
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
    role: 'ADMIN' | 'TEACHER' | 'STUDENT';
    userId: string;
}
export interface User {
    creationDateTime: string;
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    password: string;
    role: 'ADMIN' | 'TEACHER' | 'STUDENT';
}
export interface UserCreateRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'ADMIN' | 'TEACHER' | 'STUDENT';
}
export interface UserResponse {
    creationDateTime: string;
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    role: 'ADMIN' | 'TEACHER' | 'STUDENT';
}
export interface UserUpdateRequest {
    firstName: string;
    lastName: string;
    role: 'ADMIN' | 'TEACHER' | 'STUDENT';
}
function setParam(distObject: any, key: string, param: any) {
    if (param !== undefined) distObject[key] = param;
}

export function createApi(axios: AxiosInstance = Axios.create({ baseURL: '' })): ApiInstance {
    return {
        $axios: axios,
        exercises: {
            /**
             * Get page of exercises with its authors
             * @method
             * @param { object } parameters
             * @param { object } config
             * @param { number }[parameters.offset] -
             * @param { number }[parameters.pageNumber] -
             * @param { number }[parameters.pageSize] -
             * @param { boolean }[parameters.paged] -
             * @param { "creationDateTime" | "name" | "class" }[parameters.sort] - A collection of sort directives in the format ($propertyname,)+[asc|desc]?.
             * @param { boolean }[parameters.sortSorted] -
             * @param { boolean }[parameters.sortUnsorted] -
             * @param { boolean }[parameters.unpaged] -
             */
            getPageOfExercisesWithItsAuthors(parameters, config) {
                let path = `/exercises`;
                let queryParams: any = {};
                let data: any = {};

                if (parameters !== undefined) {
                    setParam(queryParams, 'offset', parameters['offset']);
                    setParam(queryParams, 'pageNumber', parameters['pageNumber']);
                    setParam(queryParams, 'pageSize', parameters['pageSize']);
                    setParam(queryParams, 'paged', parameters['paged']);
                    setParam(queryParams, 'sort', parameters['sort']);
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

            $getPageOfExercisesWithItsAuthors(parameters, config) {
                return this.getPageOfExercisesWithItsAuthors(parameters, config).then(res => res && res.data);
            }
            /**
             * Create exercise
             * @method
             * @param { object } config
             * @param requestBody -  */,
            createExercise(requestBody, config) {
                let path = `/exercises`;
                let queryParams: any = {};
                let data: any = {};

                data = requestBody;

                return axios.request({
                    url: path,
                    method: 'POST',
                    params: queryParams,
                    data: data,
                    ...config
                });
            },

            $createExercise(requestBody, config) {
                return this.createExercise(requestBody, config).then(res => res && res.data);
            }
            /**
             * Get exercise by id
             * @method
             * @param { object } config
             * @param id -  */,
            getExerciseById(id, config) {
                let path = `/exercises/${id}`;
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

            $getExerciseById(id, config) {
                return this.getExerciseById(id, config).then(res => res && res.data);
            }
            /**
             * Update exercise
             * @method
             * @param { object } parameters
             * @param { object } config
             * @param { string }parameters.id - id
             * @param { ExerciseRequest }parameters.requestBody - requestBody
             */,
            updateExercise(parameters, config) {
                let path = `/exercises/${parameters.id}`;
                let queryParams: any = {};
                let data: any = {};

                data = parameters['requestBody'];

                return axios.request({
                    url: path,
                    method: 'PUT',
                    params: queryParams,
                    data: data,
                    ...config
                });
            },

            $updateExercise(parameters, config) {
                return this.updateExercise(parameters, config).then(res => res && res.data);
            }
            /**
             * Delete exercise
             * @method
             * @param { object } config
             * @param id -  */,
            deleteExercise(id, config) {
                let path = `/exercises/${id}`;
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

            $deleteExercise(id, config) {
                return this.deleteExercise(id, config).then(res => res && res.data);
            }
        },
        tokens: {
            /**
             * Used to obtain auth and refresh token pair passing username and password or used to obtain new auth token passing refresh token.
             * @method
             * @param { object } parameters
             * @param { object } config
             * @param { "credentials" | "refreshToken" }parameters.grantType - Determines whether username and password are used for authentication or refresh token
             * @param { string }[parameters.login] - Required if 'grantType' is 'credentials'
             * @param { string }[parameters.password] - Required if 'grantType' is 'credentials'
             * @param { string }[parameters.refreshToken] - Required if 'grantType' is 'refreshToken'.
             */
            getAuthTokenAndRefreshToken(parameters, config) {
                let path = `/token`;
                let queryParams: any = {};
                let data: any = {};

                setParam(data, 'grantType', parameters['grantType']);
                setParam(data, 'login', parameters['login']);
                setParam(data, 'password', parameters['password']);
                setParam(data, 'refreshToken', parameters['refreshToken']);

                return axios.request({
                    url: path,
                    method: 'POST',
                    params: queryParams,
                    data: data,
                    ...config
                });
            },

            $getAuthTokenAndRefreshToken(parameters, config) {
                return this.getAuthTokenAndRefreshToken(parameters, config).then(res => res && res.data);
            }
        },
        users: {
            /**
             * Get page of users
             * @method
             * @param { object } parameters
             * @param { object } config
             * @param { number }[parameters.offset] -
             * @param { number }[parameters.pageNumber] -
             * @param { number }[parameters.pageSize] -
             * @param { boolean }[parameters.paged] -
             * @param { "creationDateTime" | "email" | "firstName" | "lastName" }[parameters.sort] - A collection of sort directives in the format ($propertyname,)+[asc|desc]?.
             * @param { boolean }[parameters.sortSorted] -
             * @param { boolean }[parameters.sortUnsorted] -
             * @param { boolean }[parameters.unpaged] -
             */
            getPageOfUsers(parameters, config) {
                let path = `/users`;
                let queryParams: any = {};
                let data: any = {};

                if (parameters !== undefined) {
                    setParam(queryParams, 'offset', parameters['offset']);
                    setParam(queryParams, 'pageNumber', parameters['pageNumber']);
                    setParam(queryParams, 'pageSize', parameters['pageSize']);
                    setParam(queryParams, 'paged', parameters['paged']);
                    setParam(queryParams, 'sort', parameters['sort']);
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

            $getPageOfUsers(parameters, config) {
                return this.getPageOfUsers(parameters, config).then(res => res && res.data);
            }
            /**
             * User with admin privileges is allowed to create accounts for teachers and students. User with teacher privileges is allowed to create student accounts only.
             * @method
             * @param { object } config
             * @param requestBody -  */,
            createUser(requestBody, config) {
                let path = `/users`;
                let queryParams: any = {};
                let data: any = {};

                data = requestBody;

                return axios.request({
                    url: path,
                    method: 'POST',
                    params: queryParams,
                    data: data,
                    ...config
                });
            },

            $createUser(requestBody, config) {
                return this.createUser(requestBody, config).then(res => res && res.data);
            }
            /**
             * Get user by id
             * @method
             * @param { object } config
             * @param id -  */,
            getUserById(id, config) {
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

            $getUserById(id, config) {
                return this.getUserById(id, config).then(res => res && res.data);
            }
            /**
             * This operation must be performed by admin or owner of the account.
             * @method
             * @param { object } parameters
             * @param { object } config
             * @param { string }parameters.id - id
             * @param { UserUpdateRequest }parameters.requestBody - requestBody
             */,
            updateUser(parameters, config) {
                let path = `/users/${parameters.id}`;
                let queryParams: any = {};
                let data: any = {};

                data = parameters['requestBody'];

                return axios.request({
                    url: path,
                    method: 'PUT',
                    params: queryParams,
                    data: data,
                    ...config
                });
            },

            $updateUser(parameters, config) {
                return this.updateUser(parameters, config).then(res => res && res.data);
            }
            /**
             * This operation must be performed by admin or owner of the account.
             * @method
             * @param { object } config
             * @param id -  */,
            deleteUser(id, config) {
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

            $deleteUser(id, config) {
                return this.deleteUser(id, config).then(res => res && res.data);
            }
            /**
             * This operation must be performed by admin or owner of the account.
             * @method
             * @param { object } parameters
             * @param { object } config
             * @param { string }parameters.id - id
             * @param { PasswordUpdateRequest }parameters.requestBody - requestBody
             */,
            updatePassword(parameters, config) {
                let path = `/users/${parameters.id}/password`;
                let queryParams: any = {};
                let data: any = {};

                data = parameters['requestBody'];

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

interface exercisesResource {
    getPageOfExercisesWithItsAuthors(
        parameters?: {
            offset?: number;
            pageNumber?: number;
            pageSize?: number;
            paged?: boolean;
            sort?: 'creationDateTime' | 'name' | 'class';
            sortSorted?: boolean;
            sortUnsorted?: boolean;
            unpaged?: boolean;
        },
        config?: AxiosRequestConfig
    ): AxiosPromise<Page<ExerciseResponseWithAuthor>>;
    $getPageOfExercisesWithItsAuthors(
        parameters?: {
            offset?: number;
            pageNumber?: number;
            pageSize?: number;
            paged?: boolean;
            sort?: 'creationDateTime' | 'name' | 'class';
            sortSorted?: boolean;
            sortUnsorted?: boolean;
            unpaged?: boolean;
        },
        config?: AxiosRequestConfig
    ): Promise<Page<ExerciseResponseWithAuthor>>;
    createExercise(requestBody: ExerciseRequest, config?: AxiosRequestConfig): AxiosPromise<ExerciseResponse>;
    $createExercise(requestBody: ExerciseRequest, config?: AxiosRequestConfig): Promise<ExerciseResponse>;
    getExerciseById(id: string, config?: AxiosRequestConfig): AxiosPromise<ExerciseResponseWithAuthor>;
    $getExerciseById(id: string, config?: AxiosRequestConfig): Promise<ExerciseResponseWithAuthor>;
    updateExercise(
        parameters: {
            id: string;
            requestBody: ExerciseRequest;
        },
        config?: AxiosRequestConfig
    ): AxiosPromise<ExerciseResponse>;
    $updateExercise(
        parameters: {
            id: string;
            requestBody: ExerciseRequest;
        },
        config?: AxiosRequestConfig
    ): Promise<ExerciseResponse>;
    deleteExercise(id: string, config?: AxiosRequestConfig): AxiosPromise<object>;
    $deleteExercise(id: string, config?: AxiosRequestConfig): Promise<object>;
}
interface tokensResource {
    getAuthTokenAndRefreshToken(
        parameters: {
            grantType: 'credentials' | 'refreshToken';
            login?: string;
            password?: string;
            refreshToken?: string;
        },
        config?: AxiosRequestConfig
    ): AxiosPromise<TokenResponse>;
    $getAuthTokenAndRefreshToken(
        parameters: {
            grantType: 'credentials' | 'refreshToken';
            login?: string;
            password?: string;
            refreshToken?: string;
        },
        config?: AxiosRequestConfig
    ): Promise<TokenResponse>;
}
interface usersResource {
    getPageOfUsers(
        parameters?: {
            offset?: number;
            pageNumber?: number;
            pageSize?: number;
            paged?: boolean;
            sort?: 'creationDateTime' | 'email' | 'firstName' | 'lastName';
            sortSorted?: boolean;
            sortUnsorted?: boolean;
            unpaged?: boolean;
        },
        config?: AxiosRequestConfig
    ): AxiosPromise<Page<UserResponse>>;
    $getPageOfUsers(
        parameters?: {
            offset?: number;
            pageNumber?: number;
            pageSize?: number;
            paged?: boolean;
            sort?: 'creationDateTime' | 'email' | 'firstName' | 'lastName';
            sortSorted?: boolean;
            sortUnsorted?: boolean;
            unpaged?: boolean;
        },
        config?: AxiosRequestConfig
    ): Promise<Page<UserResponse>>;
    createUser(requestBody: UserCreateRequest, config?: AxiosRequestConfig): AxiosPromise<UserResponse>;
    $createUser(requestBody: UserCreateRequest, config?: AxiosRequestConfig): Promise<UserResponse>;
    getUserById(id: string, config?: AxiosRequestConfig): AxiosPromise<UserResponse>;
    $getUserById(id: string, config?: AxiosRequestConfig): Promise<UserResponse>;
    updateUser(
        parameters: {
            id: string;
            requestBody: UserUpdateRequest;
        },
        config?: AxiosRequestConfig
    ): AxiosPromise<UserResponse>;
    $updateUser(
        parameters: {
            id: string;
            requestBody: UserUpdateRequest;
        },
        config?: AxiosRequestConfig
    ): Promise<UserResponse>;
    deleteUser(id: string, config?: AxiosRequestConfig): AxiosPromise<object>;
    $deleteUser(id: string, config?: AxiosRequestConfig): Promise<object>;
    updatePassword(
        parameters: {
            id: string;
            requestBody: PasswordUpdateRequest;
        },
        config?: AxiosRequestConfig
    ): AxiosPromise<object>;
    $updatePassword(
        parameters: {
            id: string;
            requestBody: PasswordUpdateRequest;
        },
        config?: AxiosRequestConfig
    ): Promise<object>;
}

export interface ApiInstance extends Core {
    exercises: exercisesResource;
    tokens: tokensResource;
    users: usersResource;
}
