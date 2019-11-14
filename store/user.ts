import { VuexModule, Module, action, mutation, getter, getRawActionContext} from "vuex-class-component";
import {api, Group, UserDto, UserUpdateDto} from "~/api";



@Module({ namespacedPath: "user/", target: "nuxt"})
export class UserStore extends VuexModule {

    @getter id  = '';
    @getter email = '';
    @getter firstName = 'Zbigniew';
    @getter lastName = '';
    @getter role = '';
    @getter groups = [] as Array<Group>;

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

    @mutation
    setGroups(groups: Array<Group>){
        this.groups = groups;
    }

    @action({mode: 'raw'})
    private async getUserId(){
        const context = getRawActionContext( this );
        return context.rootGetters['auth/userId'];
    }

    @action
    async fetch(){
        const userId = await this.getUserId();
        const [user, groups] = await Promise.all([api.users.$getUserById(userId), api.users.$getUserGroups(userId)]);
        this.setUser(user);
        this.setGroups(groups);
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
