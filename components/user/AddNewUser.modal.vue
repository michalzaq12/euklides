<template>
    <v-dialog v-model="dialog" max-width="500">
        <v-card>
            <loader :active="isLoading"/>
            <v-toolbar dark color="primary" class="mb-2" flat>
                <v-toolbar-title>Tworzenie nowego użytkownika</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon dark @click="dialog = false">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-card-text class="pa-4">
                <v-form v-model="valid" ref="form">
                    <v-layout wrap align-center class="mb-4">
                        <v-flex xs6>
                            <v-text-field class="mr-2" v-model="form.firstName" label="Imię"
                                          :rules="[rules.required]"
                                          counter maxlength="50"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field class="ml-2" v-model="form.lastName" label="Nazwisko"
                                          :rules="[rules.required]"
                                          counter maxlength="100"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field v-model="form.email" label="Email"
                                          :rules="rules.email"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field v-model="form.password" label="Hasło"
                                          type="password"
                                          :rules="rules.minLength(6)"
                                          counter maxlength="30"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-form>
            </v-card-text>

            <v-card-actions>
                <v-btn block color="primary" @click="createUser" :disabled="!valid">Dodaj</v-btn>
            </v-card-actions>

        </v-card>
    </v-dialog>
</template>


<script lang="ts">
  import { Component, Vue } from "~/decorators";
  import { UserCreationDto} from "~/api";

  @Component
  export default class extends Vue {
    dialog = false;
    isLoading = false;
    valid = false;
    form = {} as UserCreationDto;

    rules = {
      required: value => !!value || 'Pole wymagane.',
      minLength: x => {
        return [
          v => !!v || 'Pole wymagane.',
          v => (v !== undefined && v.length >= x) || `Pole musi zawierać co najmniej ${x} znaków`
        ];
      },
      email: [
        v => !!v || 'Pole jest wymagane',
        v => /.+@.+/.test(v) || 'E-mail musi być prawidłowy'
      ]
    };


    public open(){
      //@ts-ignore
      this.$refs.form.reset();
      this.dialog = true;
    }

    createUser(){
      this.$api.users.$createUser({
        ...this.form,
        role: 'STUDENT'
      })
        .then(() => {
          this.form = {} as UserCreationDto;
          this.dialog = false;
          this.$emit('refresh')
        }).finally(() => {
        this.isLoading = false;
      })
    }
  }
</script>
