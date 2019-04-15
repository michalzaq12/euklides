import { VuexModule, Module } from "vuex-class-component";
//import {api} from "~/api";



@Module({ namespacedPath: "user/", target: "nuxt"})
export class UserStore extends VuexModule {

    private firstname = "Michael";
    private lastname = "";


    get fullName() {
        return this.firstname + " " + this.lastname;
    }
}


export default UserStore.ExtractVuexModule( UserStore );
