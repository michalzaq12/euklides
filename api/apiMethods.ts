import { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import Axios from 'axios';

export interface AddPicturesResponse {
    urls: Array<string>;
}
export interface AddStudentToGroupRequest {
    userId: string;
}
export interface AnswerRequest {
    type: 'OPEN' | 'OPEN_WITH_POINTS' | 'CLOSED';
    answer?: string;
    choice?: number;
    pointAnswers?: Array<string>;
}
export interface Choice {
    label: string;
    order: number;
}
export interface CommitAnswersRequest {
    exercisesToAnswers: { [key: string]: { [key: string]: AnswerRequest } };
}
export interface CommittedAnswerResponse {
    answer?: string;
    choice?: number;
    commissionDateTime: string;
    correct?: boolean;
    pointAnswers?: Array<PointAnswer>;
    type: 'OPEN' | 'OPEN_WITH_POINTS' | 'CLOSED';
}
export interface Exercise {
    authorId: string;
    class: number;
    content: string;
    creationDateTime: string;
    id: string;
    name: string;
    pictures: Array<string>;
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
    pictures: Array<string>;
    points?: Array<Point>;
    type: 'CLOSED' | 'OPEN' | 'OPEN_WITH_POINTS';
}
export interface ExerciseResponseWithAuthor {
    answer?: string;
    choices?: Array<Choice>;
    class: number;
    content: string;
    correctChoiceOrder?: number;
    createdBy: UserDto;
    creationDateTime: string;
    id: string;
    name: string;
    pictures: Array<string>;
    points?: Array<Point>;
    type: 'CLOSED' | 'OPEN' | 'OPEN_WITH_POINTS';
}
export interface GiveHomeworkDto {
    students: Array<string>;
    exercises: Array<string>;
    deadline: string;
}
export interface Group {
    class: number;
    code: string;
    creationDateTime: string;
    id: string;
    yearbook: number;
}
export interface GroupCreateDto {
    class?: number;
    code: string;
    yearbook?: number;
}
export interface GroupUpdateDto {
    class?: number;
    code: string;
    yearbook?: number;
}
export interface GroupWithTeacherAndStudents {
    class: number;
    code: string;
    creationDateTime: string;
    id: string;
    students: Array<UserDto>;
    teacher: UserDto;
    yearbook: number;
}
export interface HomeworkWithAnswersGroupedByStudentResponse {
    creationDateTime: string;
    deadlineDateTime: string;
    exercises: Array<ExerciseResponse>;
    id: string;
    studentsWithAnswersToHomework: Array<StudentWithAnswersToHomeworkResponse>;
}
export interface HomeworkWithExercises {
    creationDateTime: string;
    deadline: string;
    exercises: Array<Exercise>;
    id: string;
}
export interface HomeworkWithExercisesResponse {
    creationDateTime: string;
    deadline: string;
    exercises: Array<ExerciseResponse>;
    id: string;
}
export interface HomeworkWithStudentAnswersResponse {
    creationDateTime: string;
    deadlineDateTime: string;
    exercises: Array<ExerciseResponse>;
    exercisesToAnswers: { [key: string]: { [key: string]: CommittedAnswerResponse } };
    id: string;
}
export interface Page<ExerciseResponseWithAuthor> {
    items: Array<ExerciseResponseWithAuthor>;
    number: number;
    size: number;
    totalItemCount: number;
}
export interface PasswordUpdateDto {
    password: string;
}
export interface Point {
    answer?: string;
    content: string;
    order: number;
}
export interface PointAnswer {
    answer: string;
    correct?: boolean;
}
export interface RemovePicturesRequest {
    urls: Array<string>;
}
export interface StudentWithAnswersToHomeworkResponse {
    email: string;
    exercisesToAnswers: { [key: string]: { [key: string]: CommittedAnswerResponse } };
    firstName: string;
    id: string;
    lastName: string;
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
export interface UserCreationDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'ADMIN' | 'TEACHER' | 'STUDENT';
}
export interface UserDto {
    creationDateTime: string;
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    role: 'ADMIN' | 'TEACHER' | 'STUDENT';
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
        exercises: {
            /**
             * Get page of exercises with its authors
             * @method
             * @param { object } parameters
             * @param { object } config
             * @param { number }[parameters.pageNumber] -
             * @param { number }[parameters.pageSize] -
             * @param { "ASC" | "DESC" }[parameters.sortDirection] -
             * @param { "creationDateTime" | "name" | "class" }[parameters.sortProperty] -
             */
            getPageOfExercisesWithItsAuthors(parameters, config) {
                let path = `/exercises`;
                let queryParams: any = {};
                let data: any = {};

                if (parameters !== undefined) {
                    setParam(queryParams, 'pageNumber', parameters['pageNumber']);
                    setParam(queryParams, 'pageSize', parameters['pageSize']);
                    setParam(queryParams, 'sortDirection', parameters['sortDirection']);
                    setParam(queryParams, 'sortProperty', parameters['sortProperty']);
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
            } /**
                * addPictures
                * @method
                    * @param { object } parameters
                * @param { object } config
                * @param { string }parameters.exerciseId - exerciseId
                * @param { any
                     }parameters.files - files
                */,
            addPictures(parameters, config) {
                let path = `/exercises/${parameters.exerciseId}/pictures`;
                let queryParams: any = {};
                let data: any = {};

                return axios.request({
                    url: path,
                    method: 'POST',
                    params: queryParams,
                    data: data,
                    ...config
                });
            },

            $addPictures(parameters, config) {
                return this.addPictures(parameters, config).then(res => res && res.data);
            }
            /**
             * removePictures
             * @method
             * @param { object } parameters
             * @param { object } config
             * @param { string }parameters.exerciseId - exerciseId
             * @param { RemovePicturesRequest }parameters.request - request
             */,
            removePictures(parameters, config) {
                let path = `/exercises/${parameters.exerciseId}/pictures`;
                let queryParams: any = {};
                let data: any = {};

                data = parameters['request'];

                return axios.request({
                    url: path,
                    method: 'DELETE',
                    params: queryParams,
                    data: data,
                    ...config
                });
            },

            $removePictures(parameters, config) {
                return this.removePictures(parameters, config).then(res => res && res.data);
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
        groups: {
            /**
             * Only user with 'TEACHER' role can perform this operation.
             * @method
             * @param { object } config
             * @param dto -  */
            createGroup(dto, config) {
                let path = `/groups`;
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

            $createGroup(dto, config) {
                return this.createGroup(dto, config).then(res => res && res.data);
            }
            /**
             * Only teacher of this group can perform this operation.
             * @method
             * @param { object } parameters
             * @param { object } config
             * @param { string }parameters.groupId - groupId
             * @param { number }[parameters.pageNumber] -
             * @param { number }[parameters.pageSize] -
             * @param { "ASC" | "DESC" }[parameters.sortDirection] -
             * @param { "creationDateTime" | "deadlineDateTime" }[parameters.sortProperty] -
             */,
            getAllHomeworksOfThisGroup(parameters, config) {
                let path = `/groups/${parameters.groupId}/homeworks`;
                let queryParams: any = {};
                let data: any = {};

                setParam(queryParams, 'pageNumber', parameters['pageNumber']);
                setParam(queryParams, 'pageSize', parameters['pageSize']);
                setParam(queryParams, 'sortDirection', parameters['sortDirection']);
                setParam(queryParams, 'sortProperty', parameters['sortProperty']);

                return axios.request({
                    url: path,
                    method: 'GET',
                    params: queryParams,
                    data: data,
                    ...config
                });
            },

            $getAllHomeworksOfThisGroup(parameters, config) {
                return this.getAllHomeworksOfThisGroup(parameters, config).then(res => res && res.data);
            }
            /**
             * Only teacher of this group can perform this operation. Deadline should not be sooner than current UTC time + 1 hour.
             * @method
             * @param { object } parameters
             * @param { object } config
             * @param { GiveHomeworkDto }parameters.dto - dto
             * @param { string }parameters.groupId - groupId
             */,
            giveHomeworkToChosenStudentsInThisGroup(parameters, config) {
                let path = `/groups/${parameters.groupId}/homeworks`;
                let queryParams: any = {};
                let data: any = {};

                data = parameters['dto'];

                return axios.request({
                    url: path,
                    method: 'POST',
                    params: queryParams,
                    data: data,
                    ...config
                });
            },

            $giveHomeworkToChosenStudentsInThisGroup(parameters, config) {
                return this.giveHomeworkToChosenStudentsInThisGroup(parameters, config).then(res => res && res.data);
            }
            /**
             * Only member of this group can perform this operation.
             * @method
             * @param { object } parameters
             * @param { object } config
             * @param { string }parameters.groupId - groupId
             * @param { number }[parameters.pageNumber] -
             * @param { number }[parameters.pageSize] -
             * @param { "ASC" | "DESC" }[parameters.sortDirection] -
             * @param { "creationDateTime" | "deadlineDateTime" }[parameters.sortProperty] -
             */,
            getHomeworksOfThisGroupWhichAreAssignedToCurrentUser(parameters, config) {
                let path = `/groups/${parameters.groupId}/my-homeworks`;
                let queryParams: any = {};
                let data: any = {};

                setParam(queryParams, 'pageNumber', parameters['pageNumber']);
                setParam(queryParams, 'pageSize', parameters['pageSize']);
                setParam(queryParams, 'sortDirection', parameters['sortDirection']);
                setParam(queryParams, 'sortProperty', parameters['sortProperty']);

                return axios.request({
                    url: path,
                    method: 'GET',
                    params: queryParams,
                    data: data,
                    ...config
                });
            },

            $getHomeworksOfThisGroupWhichAreAssignedToCurrentUser(parameters, config) {
                return this.getHomeworksOfThisGroupWhichAreAssignedToCurrentUser(parameters, config).then(
                    res => res && res.data
                );
            }
            /**
             * Only teacher of this group can perform this operation. Student can be added only once.
             * @method
             * @param { object } parameters
             * @param { object } config
             * @param { string }parameters.groupId - groupId
             * @param { AddStudentToGroupRequest }parameters.request - request
             */,
            addStudentToGroup(parameters, config) {
                let path = `/groups/${parameters.groupId}/students`;
                let queryParams: any = {};
                let data: any = {};

                data = parameters['request'];

                return axios.request({
                    url: path,
                    method: 'POST',
                    params: queryParams,
                    data: data,
                    ...config
                });
            },

            $addStudentToGroup(parameters, config) {
                return this.addStudentToGroup(parameters, config).then(res => res && res.data);
            }
            /**
             * Only teacher of this group can perform this operation.
             * @method
             * @param { object } parameters
             * @param { object } config
             * @param { string }parameters.groupId - groupId
             * @param { string }parameters.userId - userId
             */,
            removeStudentFromGroup(parameters, config) {
                let path = `/groups/${parameters.groupId}/students/${parameters.userId}`;
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

            $removeStudentFromGroup(parameters, config) {
                return this.removeStudentFromGroup(parameters, config).then(res => res && res.data);
            }
            /**
             * Students are sorted by last name
             * @method
             * @param { object } config
             * @param id -  */,
            getGroupById(id, config) {
                let path = `/groups/${id}`;
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

            $getGroupById(id, config) {
                return this.getGroupById(id, config).then(res => res && res.data);
            }
            /**
             * Only teacher of this group can perform this operation.
             * @method
             * @param { object } parameters
             * @param { object } config
             * @param { GroupUpdateDto }parameters.dto - dto
             * @param { string }parameters.id - id
             */,
            updateGroup(parameters, config) {
                let path = `/groups/${parameters.id}`;
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

            $updateGroup(parameters, config) {
                return this.updateGroup(parameters, config).then(res => res && res.data);
            }
            /**
             * Only teacher of this group can perform this operation.
             * @method
             * @param { object } config
             * @param id -  */,
            deleteGroup(id, config) {
                let path = `/groups/${id}`;
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

            $deleteGroup(id, config) {
                return this.deleteGroup(id, config).then(res => res && res.data);
            }
        },
        homeworks: {
            /**
             * Only teacher of this homework's group can perform this operation
             * @method
             * @param { object } config
             * @param homeworkId -  */
            getHomeworkWithAnswersGroupedByStudent(homeworkId, config) {
                let path = `/homework-with-answers/${homeworkId}`;
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

            $getHomeworkWithAnswersGroupedByStudent(homeworkId, config) {
                return this.getHomeworkWithAnswersGroupedByStudent(homeworkId, config).then(res => res && res.data);
            }
            /**
             * Only student who was assigned to this homework can perform this operation
             * @method
             * @param { object } config
             * @param homeworkId -  */,
            getHomeworkWithAnswersOfCurrentUser(homeworkId, config) {
                let path = `/homework-with-my-answers/${homeworkId}`;
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

            $getHomeworkWithAnswersOfCurrentUser(homeworkId, config) {
                return this.getHomeworkWithAnswersOfCurrentUser(homeworkId, config).then(res => res && res.data);
            }
            /**
             * Only student who was assigned to this homework can perform this operation
             * @method
             * @param { object } parameters
             * @param { object } config
             * @param { string }parameters.homeworkId - homeworkId
             * @param { CommitAnswersRequest }parameters.request - request
             */,
            commitAnswersToHomework(parameters, config) {
                let path = `/homeworks/${parameters.homeworkId}/answer`;
                let queryParams: any = {};
                let data: any = {};

                data = parameters['request'];

                return axios.request({
                    url: path,
                    method: 'POST',
                    params: queryParams,
                    data: data,
                    ...config
                });
            },

            $commitAnswersToHomework(parameters, config) {
                return this.commitAnswersToHomework(parameters, config).then(res => res && res.data);
            }
            /**
             * Only teacher of this homework's group can perform this operation.
             * @method
             * @param { object } config
             * @param id -  */,
            deleteHomework(id, config) {
                let path = `/homeworks/${id}`;
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

            $deleteHomework(id, config) {
                return this.deleteHomework(id, config).then(res => res && res.data);
            }
        },
        students: {
            /**
             * Requires admin or teacher role
             * @method
             * @param { object } parameters
             * @param { object } config
             * @param { number }[parameters.pageNumber] -
             * @param { number }[parameters.pageSize] -
             * @param { "creationDateTime" | "email" | "firstName" | "lastName" }[parameters.sort] -
             * @param { "ASC" | "DESC" }[parameters.sortDirection] -
             * @param { string }[parameters.sortProperty] -
             */
            getAllStudents(parameters, config) {
                let path = `/students`;
                let queryParams: any = {};
                let data: any = {};

                if (parameters !== undefined) {
                    setParam(queryParams, 'pageNumber', parameters['pageNumber']);
                    setParam(queryParams, 'pageSize', parameters['pageSize']);
                    setParam(queryParams, 'sort', parameters['sort']);
                    setParam(queryParams, 'sortDirection', parameters['sortDirection']);
                    setParam(queryParams, 'sortProperty', parameters['sortProperty']);
                }

                return axios.request({
                    url: path,
                    method: 'GET',
                    params: queryParams,
                    data: data,
                    ...config
                });
            },

            $getAllStudents(parameters, config) {
                return this.getAllStudents(parameters, config).then(res => res && res.data);
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
             * @param { number }[parameters.pageNumber] -
             * @param { number }[parameters.pageSize] -
             * @param { "creationDateTime" | "email" | "firstName" | "lastName" }[parameters.sort] -
             * @param { "ASC" | "DESC" }[parameters.sortDirection] -
             * @param { string }[parameters.sortProperty] -
             */
            getPageOfUsers(parameters, config) {
                let path = `/users`;
                let queryParams: any = {};
                let data: any = {};

                if (parameters !== undefined) {
                    setParam(queryParams, 'pageNumber', parameters['pageNumber']);
                    setParam(queryParams, 'pageSize', parameters['pageSize']);
                    setParam(queryParams, 'sort', parameters['sort']);
                    setParam(queryParams, 'sortDirection', parameters['sortDirection']);
                    setParam(queryParams, 'sortProperty', parameters['sortProperty']);
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
             * @param dto -  */,
            createUser(dto, config) {
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

            $createUser(dto, config) {
                return this.createUser(dto, config).then(res => res && res.data);
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
             * @param { UserUpdateDto }parameters.dto - dto
             * @param { string }parameters.id - id
             */,
            updateUser(parameters, config) {
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
             * Get user groups
             * @method
             * @param { object } config
             * @param id -  */,
            getUserGroups(id, config) {
                let path = `/users/${id}/groups`;
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

            $getUserGroups(id, config) {
                return this.getUserGroups(id, config).then(res => res && res.data);
            }
            /**
             * This operation must be performed by admin or owner of the account.
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

interface exercisesResource {
    getPageOfExercisesWithItsAuthors(
        parameters?: {
            pageNumber?: number;
            pageSize?: number;
            sortDirection?: 'ASC' | 'DESC';
            sortProperty?: 'creationDateTime' | 'name' | 'class';
        },
        config?: AxiosRequestConfig
    ): AxiosPromise<Page<ExerciseResponseWithAuthor>>;
    $getPageOfExercisesWithItsAuthors(
        parameters?: {
            pageNumber?: number;
            pageSize?: number;
            sortDirection?: 'ASC' | 'DESC';
            sortProperty?: 'creationDateTime' | 'name' | 'class';
        },
        config?: AxiosRequestConfig
    ): Promise<Page<ExerciseResponseWithAuthor>>;
    createExercise(requestBody: ExerciseRequest, config?: AxiosRequestConfig): AxiosPromise<ExerciseResponse>;
    $createExercise(requestBody: ExerciseRequest, config?: AxiosRequestConfig): Promise<ExerciseResponse>;
    addPictures(
        parameters: {
            exerciseId: string;
            files: any;
        },
        config?: AxiosRequestConfig
    ): AxiosPromise<AddPicturesResponse>;
    $addPictures(
        parameters: {
            exerciseId: string;
            files: any;
        },
        config?: AxiosRequestConfig
    ): Promise<AddPicturesResponse>;
    removePictures(
        parameters: {
            exerciseId: string;
            request: RemovePicturesRequest;
        },
        config?: AxiosRequestConfig
    ): AxiosPromise<object>;
    $removePictures(
        parameters: {
            exerciseId: string;
            request: RemovePicturesRequest;
        },
        config?: AxiosRequestConfig
    ): Promise<object>;
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
interface groupsResource {
    createGroup(dto: GroupCreateDto, config?: AxiosRequestConfig): AxiosPromise<Group>;
    $createGroup(dto: GroupCreateDto, config?: AxiosRequestConfig): Promise<Group>;
    getAllHomeworksOfThisGroup(
        parameters: {
            groupId: string;
            pageNumber?: number;
            pageSize?: number;
            sortDirection?: 'ASC' | 'DESC';
            sortProperty?: 'creationDateTime' | 'deadlineDateTime';
        },
        config?: AxiosRequestConfig
    ): AxiosPromise<Page<HomeworkWithExercisesResponse>>;
    $getAllHomeworksOfThisGroup(
        parameters: {
            groupId: string;
            pageNumber?: number;
            pageSize?: number;
            sortDirection?: 'ASC' | 'DESC';
            sortProperty?: 'creationDateTime' | 'deadlineDateTime';
        },
        config?: AxiosRequestConfig
    ): Promise<Page<HomeworkWithExercisesResponse>>;
    giveHomeworkToChosenStudentsInThisGroup(
        parameters: {
            dto: GiveHomeworkDto;
            groupId: string;
        },
        config?: AxiosRequestConfig
    ): AxiosPromise<HomeworkWithExercises>;
    $giveHomeworkToChosenStudentsInThisGroup(
        parameters: {
            dto: GiveHomeworkDto;
            groupId: string;
        },
        config?: AxiosRequestConfig
    ): Promise<HomeworkWithExercises>;
    getHomeworksOfThisGroupWhichAreAssignedToCurrentUser(
        parameters: {
            groupId: string;
            pageNumber?: number;
            pageSize?: number;
            sortDirection?: 'ASC' | 'DESC';
            sortProperty?: 'creationDateTime' | 'deadlineDateTime';
        },
        config?: AxiosRequestConfig
    ): AxiosPromise<Page<HomeworkWithExercisesResponse>>;
    $getHomeworksOfThisGroupWhichAreAssignedToCurrentUser(
        parameters: {
            groupId: string;
            pageNumber?: number;
            pageSize?: number;
            sortDirection?: 'ASC' | 'DESC';
            sortProperty?: 'creationDateTime' | 'deadlineDateTime';
        },
        config?: AxiosRequestConfig
    ): Promise<Page<HomeworkWithExercisesResponse>>;
    addStudentToGroup(
        parameters: {
            groupId: string;
            request: AddStudentToGroupRequest;
        },
        config?: AxiosRequestConfig
    ): AxiosPromise<object>;
    $addStudentToGroup(
        parameters: {
            groupId: string;
            request: AddStudentToGroupRequest;
        },
        config?: AxiosRequestConfig
    ): Promise<object>;
    removeStudentFromGroup(
        parameters: {
            groupId: string;
            userId: string;
        },
        config?: AxiosRequestConfig
    ): AxiosPromise<object>;
    $removeStudentFromGroup(
        parameters: {
            groupId: string;
            userId: string;
        },
        config?: AxiosRequestConfig
    ): Promise<object>;
    getGroupById(id: string, config?: AxiosRequestConfig): AxiosPromise<GroupWithTeacherAndStudents>;
    $getGroupById(id: string, config?: AxiosRequestConfig): Promise<GroupWithTeacherAndStudents>;
    updateGroup(
        parameters: {
            dto: GroupUpdateDto;
            id: string;
        },
        config?: AxiosRequestConfig
    ): AxiosPromise<Group>;
    $updateGroup(
        parameters: {
            dto: GroupUpdateDto;
            id: string;
        },
        config?: AxiosRequestConfig
    ): Promise<Group>;
    deleteGroup(id: string, config?: AxiosRequestConfig): AxiosPromise<object>;
    $deleteGroup(id: string, config?: AxiosRequestConfig): Promise<object>;
}
interface homeworksResource {
    getHomeworkWithAnswersGroupedByStudent(
        homeworkId: string,
        config?: AxiosRequestConfig
    ): AxiosPromise<HomeworkWithAnswersGroupedByStudentResponse>;
    $getHomeworkWithAnswersGroupedByStudent(
        homeworkId: string,
        config?: AxiosRequestConfig
    ): Promise<HomeworkWithAnswersGroupedByStudentResponse>;
    getHomeworkWithAnswersOfCurrentUser(
        homeworkId: string,
        config?: AxiosRequestConfig
    ): AxiosPromise<HomeworkWithStudentAnswersResponse>;
    $getHomeworkWithAnswersOfCurrentUser(
        homeworkId: string,
        config?: AxiosRequestConfig
    ): Promise<HomeworkWithStudentAnswersResponse>;
    commitAnswersToHomework(
        parameters: {
            homeworkId: string;
            request: CommitAnswersRequest;
        },
        config?: AxiosRequestConfig
    ): AxiosPromise<HomeworkWithStudentAnswersResponse>;
    $commitAnswersToHomework(
        parameters: {
            homeworkId: string;
            request: CommitAnswersRequest;
        },
        config?: AxiosRequestConfig
    ): Promise<HomeworkWithStudentAnswersResponse>;
    deleteHomework(id: string, config?: AxiosRequestConfig): AxiosPromise<object>;
    $deleteHomework(id: string, config?: AxiosRequestConfig): Promise<object>;
}
interface studentsResource {
    getAllStudents(
        parameters?: {
            pageNumber?: number;
            pageSize?: number;
            sort?: 'creationDateTime' | 'email' | 'firstName' | 'lastName';
            sortDirection?: 'ASC' | 'DESC';
            sortProperty?: string;
        },
        config?: AxiosRequestConfig
    ): AxiosPromise<Page<UserDto>>;
    $getAllStudents(
        parameters?: {
            pageNumber?: number;
            pageSize?: number;
            sort?: 'creationDateTime' | 'email' | 'firstName' | 'lastName';
            sortDirection?: 'ASC' | 'DESC';
            sortProperty?: string;
        },
        config?: AxiosRequestConfig
    ): Promise<Page<UserDto>>;
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
            pageNumber?: number;
            pageSize?: number;
            sort?: 'creationDateTime' | 'email' | 'firstName' | 'lastName';
            sortDirection?: 'ASC' | 'DESC';
            sortProperty?: string;
        },
        config?: AxiosRequestConfig
    ): AxiosPromise<Page<UserDto>>;
    $getPageOfUsers(
        parameters?: {
            pageNumber?: number;
            pageSize?: number;
            sort?: 'creationDateTime' | 'email' | 'firstName' | 'lastName';
            sortDirection?: 'ASC' | 'DESC';
            sortProperty?: string;
        },
        config?: AxiosRequestConfig
    ): Promise<Page<UserDto>>;
    createUser(dto: UserCreationDto, config?: AxiosRequestConfig): AxiosPromise<UserDto>;
    $createUser(dto: UserCreationDto, config?: AxiosRequestConfig): Promise<UserDto>;
    getUserById(id: string, config?: AxiosRequestConfig): AxiosPromise<UserDto>;
    $getUserById(id: string, config?: AxiosRequestConfig): Promise<UserDto>;
    updateUser(
        parameters: {
            dto: UserUpdateDto;
            id: string;
        },
        config?: AxiosRequestConfig
    ): AxiosPromise<UserDto>;
    $updateUser(
        parameters: {
            dto: UserUpdateDto;
            id: string;
        },
        config?: AxiosRequestConfig
    ): Promise<UserDto>;
    deleteUser(id: string, config?: AxiosRequestConfig): AxiosPromise<object>;
    $deleteUser(id: string, config?: AxiosRequestConfig): Promise<object>;
    getUserGroups(id: string, config?: AxiosRequestConfig): AxiosPromise<Array<Group>>;
    $getUserGroups(id: string, config?: AxiosRequestConfig): Promise<Array<Group>>;
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
    exercises: exercisesResource;
    groups: groupsResource;
    homeworks: homeworksResource;
    students: studentsResource;
    tokens: tokensResource;
    users: usersResource;
}
