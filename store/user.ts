import { VuexModule, Module, action, mutation, getter, getRawActionContext} from "vuex-class-component";
import {api, UserDto, UserUpdateDto} from "~/api";



@Module({ namespacedPath: "user/", target: "nuxt"})
export class UserStore extends VuexModule {

    @getter id  = '';
    @getter email = '';
    @getter firstName = 'Zbigniew';
    @getter lastName = '';
    @getter role = '';

    get fullName() {
        return this.firstName + ' ' + this.lastName;
    }

    @mutation
    setUser(user : UserDto){
        this.id = user.id;
        this.email = user.email;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.role = user.role;
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
    async update(user: UserUpdateDto){
        const updated = await api.users.$updateUser({
            dto: user,
            id: this.id
        });
        this.setUser(updated);
    }
}


export default UserStore.ExtractVuexModule( UserStore );
