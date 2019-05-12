import { VuexModule, Module, action, mutation, getter, getRawActionContext} from "vuex-class-component";
import {api, User, UserResponse, UserUpdateRequest} from "~/api";



@Module({ namespacedPath: "user/", target: "nuxt"})
export class UserStore extends VuexModule {

    @getter id  = '';
    @getter email = '';
    @getter firstName = 'Zbigniew';
    @getter lastName = '';

    get fullName() {
        return this.firstName + ' ' + this.lastName;
    }

    @mutation
    setUser(user : User | UserResponse){
        this.id = user.id;
        this.email = user.email;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
    }

    @action({mode: 'raw'})
    private async getUserId(){
        const context = getRawActionContext( this );
        return context.rootGetters['auth/userId'];
    }

    @action
    async fetch(){
        const userId = await this.getUserId();
        const user = await api.users.$getUserById(userId);
        this.setUser(user);
    }

    @action
    async update(user: UserUpdateRequest){
        const updated = await api.users.$updateUser({
            requestBody: user,
            id: this.id
        });
        this.setUser(updated);
    }
}


export default UserStore.ExtractVuexModule( UserStore );
