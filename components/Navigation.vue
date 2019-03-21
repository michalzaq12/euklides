<template>
    <v-navigation-drawer v-model="drawer" fixed app :clipped="$vuetify.breakpoint.lgAndUp">
        <v-list dense>
            <n-link tag="v-list-tile" :to="item.path" v-for="item in navItems" :key="item.title">
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

    interface NavigationItem {
        title: string
        icon: string
        path: string

    }

    @Component
    export default class Card extends Vue {

        drawer: boolean = true;

        navItems: ReadonlyArray<NavigationItem> = [
            {
                title: 'Strona główna',
                icon: 'home',
                path: '/'
            }
        ];

        public toggle(){
            this.drawer = !this.drawer;
        }
    }
</script>

