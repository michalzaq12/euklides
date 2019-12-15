<template>
    <v-container fill-height>
        <loader :active="isLoading" />
        <v-layout justify-center align-center>

            <v-flex xs12 sm8 md8 style="max-width: 600px">
                <v-card>
                    <v-toolbar dark color="primary">
                        <v-toolbar-side-icon @click="editMode = false">
                            <v-icon v-if="!editMode">info</v-icon>
                            <v-icon v-else>keyboard_arrow_left</v-icon>
                        </v-toolbar-side-icon>
                        <v-toolbar-title>Profil</v-toolbar-title>
                    </v-toolbar>

                    <v-flex class="pa-4 justify-center">
                        <v-avatar size="80">
                            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                        </v-avatar>
                    </v-flex>

                    <v-divider></v-divider>

                    <v-card-text class="py-3" v-if="editMode">

                        <v-form>
                            <v-text-field color="demko" type="text" v-model="user.firstName" label="Imię" required />
                            <v-text-field color="demko" type="text" v-model="user.lastName" label="Nazwisko" required />
                        </v-form>
                        <v-btn block color="primary" class="white--text" @click="updateUserInfo">Zapisz</v-btn>

                        <v-form class="mt-3">
                            <v-text-field color="demko" type="password" v-model="password" label="Nowe hasło" required />
                            <v-text-field color="demko" type="password" v-model="repeatedPassword" label="Powtórz hasło" required
                                          @input="validateRepeatedPassword"
                                          :error-messages="passwordRepeatHint" :error="passwordRepeatError"/>
                        </v-form>
                        <v-btn block color="primary" class="white--text" @click="updatePassword" :disabled="passwordRepeatError || password === '' || repeatedPassword === ''">Zmień</v-btn>

                    </v-card-text>


                    <v-card-text class="pt-5 pb-5" v-else>
                        <div class="pa-1"><span class="title font-weight-bold">Email: </span> <span class="title">{{user.email}}</span></div>
                        <div class="pa-1"><span class="title font-weight-bold">Imię: </span> <span class="title">{{user.firstName}}</span></div>
                        <div class="pa-1"><span class="title font-weight-bold ">Nazwisko: </span> <span class="title">{{user.lastName}}</span></div>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions v-if="!editMode">
                        <v-btn flat color="red" @click="" >Usuń</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn flat @click="editMode = true" >Edytuj</v-btn>
                    </v-card-actions>
                </v-card>

            </v-flex>
        </v-layout>

    </v-container>
</template>


<script lang="ts">
  import { Component, Vue } from "~/decorators";
  import { UserStore } from "~/store/user";
  import {UserUpdateDto} from "~/api";

  @Component({
    head: {title: 'Ustawienia'},
    layout: 'app',
  })
  export default class extends Vue {
    userStore = UserStore.CreateProxy( this.$store, UserStore );

    editMode = false;
    isLoading = false;
    user: UserUpdateDto = {
      firstName: this.userStore.user.firstName,
      lastName: this.userStore.user.lastName,
    };
    password = '';
    repeatedPassword = '';
    passwordRepeatError = false;
    passwordRepeatHint = '';

    validateRepeatedPassword(v){
      if(v !== this.password) {
        this.passwordRepeatHint = 'Passwords don`t match';
        this.passwordRepeatError = true;
      } else {
        this.passwordRepeatError = false;
        this.passwordRepeatHint = '';
      }
    };

    updateUserInfo(){
      this.isLoading = true;
      this.userStore.update(this.user as UserUpdateDto)
        .then(() => {
          this.editMode = false;
        })
        .finally(() => this.isLoading = false)
    };


    updatePassword(){
      this.isLoading = true;
      this.$api.users.$updatePassword({
        dto: {password: this.password},
        id: this.userStore.id
      })
        .then(() => {
          this.editMode = false;
          //this.$eventBus.$emit('info', 'Zaktualizowano hasło')
        })
        .finally(() => this.isLoading = false)
    };

  }
</script>
