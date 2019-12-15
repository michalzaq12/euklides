import { VuexModule, Module, action, mutation, getter, getRawActionContext} from "vuex-class-component";
import {api, Group, UserDto, UserUpdateDto} from "~/api";



@Module({ namespacedPath: "user/", target: "nuxt"})
export class UserStore extends VuexModule {

    _user: Partial<UserDto> = {};
    @getter groups = [] as Array<Group>;
    @getter loading = false;

    get id(){
        return this._user.id;
    }

    get fullName() {
        return this._user.firstName + ' ' + this._user.lastName;
    }

    get role(){
        return this._user.role;
    }

    get user(){
        return this._user;
    }

    @mutation
    setUser(user : UserDto){
        this._user = user;
    }

    @mutation
    setGroups(groups: Array<Group>){
        this.groups = groups;
    }

    @mutation
    setLoading(state: boolean){
        this.loading = state;
    }

    @action({mode: 'raw'})
    private async getUserId(){
        const context = getRawActionContext( this );
        return context.rootGetters['auth/userId'];
    }

    @action
    async fetch(){
        this.setLoading(true);
        const userId = await this.getUserId();
        const [user, groups] = await Promise.all([api.users.$getUserById(userId), api.users.$getUserGroups(userId)]);
        this.setUser(user);
        this.setGroups(groups);
        this.setLoading(false);
    }

    @action
    async update(user: UserUpdateDto){
        const updated = await api.users.$updateUser({
            dto: user,
            id: this._user.id
        });
        this.setUser(updated);
    }
}


export default UserStore.ExtractVuexModule( UserStore );
