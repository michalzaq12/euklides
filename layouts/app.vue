<template>
    <v-app>
        <navigation ref="nav"/>
        <v-toolbar fixed app color="primary" dark>
            <v-toolbar-side-icon @click.stop="$refs.nav.toggle()"></v-toolbar-side-icon>
            <v-toolbar-title>
                <img src="/logo-white.png" height="40"/>
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <v-menu offset-y transition="slide-y-transition">
                <v-btn slot="activator" icon>
                    <v-badge top color="red" overlap>
                        <span slot="badge" v-if="notificationsCount > 0">{{notificationsCount}}</span>
                        <v-icon>notifications</v-icon>
                    </v-badge>
                </v-btn>

                <notifications @notifications-count="notificationsCount = $event"/>

            </v-menu>

            <v-btn icon @click="logout">
                <v-icon>exit_to_app</v-icon>
            </v-btn>


        </v-toolbar>
        <v-content>
            <nuxt />
        </v-content>
        <v-footer app color="primary">
            <span class="white--text ml-3">&copy; 2019</span>
        </v-footer>
    </v-app>
</template>

<script>
    import Navigation from '~/components/Navigation';
    import MainFooter from '~/components/MainFooter';
    import Notifications from '~/components/notifications/list';
    export default {
        components: {Navigation, MainFooter, Notifications},
        data(){
            return {
                notificationsCount: 2
            }
        },
        methods: {
            logout(){
                this.$store.dispatch('auth/logout')
                    .then(()=> this.$router.push({path: '/login'}));
            }
        }
    }
</script>
