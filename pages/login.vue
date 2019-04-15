<template>
    <div>
        <v-layout align-center justify-center row fill-height wrap class="login__container">
            <v-card class="login__card">
                <loader :active="isLoading"/>
                <div class="text-xs-right ma-2"><v-icon color="primary" large>help_outline</v-icon></div>
                <v-form class="pa-5">
                    <v-text-field v-model="login" label="Email" prepend-icon="person"
                                  :rules="[rules.required]" validate-on-blur autofocus></v-text-field>
                    <v-text-field v-model="password" type="password" label="Hasło" prepend-icon="lock"
                                  :rules="[rules.required]"></v-text-field>
                    <v-btn block color="primary" @click.stop="signIn" large class="mt-5 mb-3">Zaloguj się</v-btn>
                    <n-link to="/">Zapomniałem hasła</n-link>
                </v-form>
            </v-card>
        </v-layout>
        <main-footer />
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "~/decorators";
    import MainFooter from '~/components/MainFooter.vue';
    import {AuthStore} from "~/store/auth";


    @Component({
        components: {MainFooter},
        transition: 'slide-up',
        head: {title: 'Logowanie'}
    })
    export default class extends Vue {

        authStore = AuthStore.CreateProxy( this.$store, AuthStore );

        isLoading = false;
        login = 'zbigniew@euklides.pl';
        password = 'password';


        rules = {
            required: value => !!value || 'Pole wymagane',
            counter: value => value.length === 11 || 'Nieprawidłowe dane',
        };


        signIn(){
            this.isLoading = true;
            this.authStore.logIn({
                login: this.login,
                password: this.password
            }).then(() => {
                //redirect to
            }).finally(() => {
                this.isLoading = false;
            })
        }
    }
</script>


<style lang="scss" scoped>

    .login__container {
        background-image: url("~assets/main_page_desc.png");
        background-size: cover;
        padding: 100px 0;
    }


    .slide-up-enter {
        & .login__card {
            opacity: 0;
            transform: translateY(30px);
        }
    }

    .login__card {
        transition: all .5s cubic-bezier(.55,0,.1,1);
        width: 530px;
        background-color: rgba(white, 0.9);
        text-align: center;

        & a {
            text-decoration: none;
        }
    }
</style>
