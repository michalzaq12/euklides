<template>
    <v-dialog v-model="dialog" max-width="800">
        <v-card>
            <loader :active="isLoading"/>
            <v-toolbar dark color="primary" class="mb-2" flat>
                <v-toolbar-title>Dodaj ucznia do klasy {{group.code}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon dark @click="dialog = false">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-card-text class="pa-4">

                <v-layout wrap align-center class="mb-4">
                    <v-flex xs12>
                        <v-text-field
                            v-model="search"
                            append-icon="search"
                            label="Szukaj ucznia"
                            single-line
                            hide-details
                            solo
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs12 class="mt-2">
                        <v-data-table :items="students" :search="search" :headers="headers">
                            <template v-slot:items="props">
                                <td>
                                    <v-btn icon @click.stop="addUserToGroup(props.item.id)">
                                        <v-icon color="primary">person_add</v-icon>
                                    </v-btn>
                                </td>
                                <td>{{ props.item.firstName }}</td>
                                <td>{{props.item.lastName}}</td>
                            </template>
                        </v-data-table>
                    </v-flex>
                </v-layout>

            </v-card-text>

        </v-card>
    </v-dialog>
</template>


<script lang="ts">
  import { Component, Vue } from "~/decorators";
  import {Group, UserDto} from "~/api";

  @Component
  export default class extends Vue {
    dialog = false;
    isLoading = false;
    group = {} as Group;
    students = [] as Array<UserDto>;
    search = '';
    headers = [
      {
        text: '',
        align: 'center',
        sortable: false,
        width: 50
      },
      {
        text: 'Imię',
        value: 'firstName',
      },
      {
        text: 'Nazwisko',
        value: 'lastName',
      }
    ];

    public open(group: Group){
      this.dialog = true;
      this.group = group;
      this.fetchAllUsers();
    }

    async fetchAllUsers(){
      this.isLoading = true;
      // TODO pagination
      const res = await this.$api.students.$getAllStudents();
      this.students = res.items;
      this.isLoading = false;
    }

    addUserToGroup(userId: string){
      this.isLoading = true;
      this.$api.groups.$addStudentToGroup({
        groupId: this.group.id,
        request: {
          userId: userId
        }
      }).then(() => {
        //TODO add notification
        this.$emit('refresh');
        this.dialog = false;
      }).finally(() => {
        this.isLoading = false;
      })
    }

  }
</script>
