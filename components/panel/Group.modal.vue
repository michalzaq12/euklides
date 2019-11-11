<template>
    <v-dialog v-model="dialog" max-width="500">
        <v-card>
            <loader :active="isLoading"/>
            <v-toolbar dark color="primary" class="mb-2" flat>
                <v-toolbar-title>Nowa klasa</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon dark @click="dialog = false">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-card-text class="pa-4">

                <v-layout wrap align-center class="mb-4">
                    <v-flex xs6>
                        <v-select
                            class="mr-2"
                            v-model="form.class"
                            :items="[4,5,6]"
                            label="Klasa"
                        ></v-select>
                    </v-flex>
                    <v-flex xs6>
                        <v-text-field class="ml-2" v-model="form.yearbook" label="Rocznik" type="number"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field v-model="form.code" label="Kod"
                                      :rules="[rules.required]"
                                      counter maxlength="10"
                        ></v-text-field>
                    </v-flex>
                </v-layout>

            </v-card-text>

            <v-card-actions>
                <v-btn block color="primary" @click="createGroup">Dodaj</v-btn>
            </v-card-actions>

        </v-card>
    </v-dialog>
</template>


<script lang="ts">
  import { Component, Vue } from "~/decorators";
  import {GroupCreateDto} from "~/api";

  @Component
  export default class extends Vue {
    dialog = false;
    isLoading = false;
    form = {} as GroupCreateDto;

    rules = {
      required: value => !!value || 'Pole wymagane.',
    };


    public open(){
      this.dialog = true;
    }

    createGroup(){
      this.$api.groups.$createGroup(this.form)
        .then(() => {
          this.form = {} as GroupCreateDto;
          this.dialog = false;
          this.$emit('refresh')
        }).finally(() => {
          this.isLoading = false;
      })
    }
  }
</script>
