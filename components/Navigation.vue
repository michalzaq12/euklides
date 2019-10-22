<template>
    <v-navigation-drawer v-model="drawer" fixed app :clipped="$vuetify.breakpoint.lgAndUp">
        <v-card flat color="primary" class="pl-3">
            <v-avatar size="150">
                <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
            </v-avatar>
            <div class="title font-weight-regular white--text py-3">{{user.fullName}}</div>
        </v-card>


        <v-list>
            <n-link tag="v-list-tile" :to="item.path" v-for="item in navItems" :key="item.title" class="nav-link">
                <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
            </n-link>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator";
    import {UserStore} from "~/store/user";
    import {INavigationItem, teacherNav, studentNav, adminNav} from './navigation-list';

    @Component
    export default class Card extends Vue {

        drawer: boolean = true;
        user = UserStore.CreateProxy( this.$store, UserStore );
        navItems: ReadonlyArray<INavigationItem> = [];

        mounted(){
          if(this.user.id === '') {
            this.user.fetch().then(this.displayNavigation);
          }else {
            this.displayNavigation();
          }
        }

        private displayNavigation(){
          console.log(this.user);
          if(this.user.role === 'STUDENT'){
            this.navItems = studentNav;
          }else if(this.user.role === 'TEACHER'){
            this.navItems = teacherNav;
          }else {
            this.navItems = adminNav;
          }
        }

        public toggle(){
            this.drawer = !this.drawer;
        }
    }
</script>



<style lang="scss">
    .nav-link.nuxt-link-active {
        color: var(--v-primary-base) !important;
        & .v-icon{
        color: var(--v-primary-base) !important;
        }
    }
</style>
