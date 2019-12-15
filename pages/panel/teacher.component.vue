<template>
    <v-container class="panel__container" fluid fill-height>

        <section class="welcome">
            <v-card  height="160" color="primary" dark>
                <div class="results__card">
                    <div class="icon__placeholder">
                        <div>
                            <v-icon size="80">verified_user</v-icon>
                        </div>
                    </div>
                    <div class="results pr-4">
                        <div>
                            <span class="font-weight-bold display-3">67</span>
                            <span>/</span>
                            <span>74</span>
                        </div>
                        <div>
                            <span class="font-weight-thin">SPRAWDZONYCH ZADAŃ</span>
                        </div>
                    </div>
                </div>
            </v-card>
            <v-card class="timeline" height="auto">
                <v-toolbar class="mb-2 py-3" flat>
                    <v-icon color="grey darken-1">calendar_today</v-icon>
                    <v-toolbar-title class="grey--text text--darken-1">Ostatnie zdarzenia</v-toolbar-title>
                </v-toolbar>
                <timeline class="ma-4"></timeline>
            </v-card>
        </section>

        <section class="user__classes">
            <v-card>
                <v-toolbar dark color="primary" class="mb-2 py-3">
                    <v-icon>book</v-icon>
                    <v-toolbar-title>Lista Twoich klas</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="$refs.group.open()">
                        <v-icon>add</v-icon>
                    </v-btn>
                </v-toolbar>

                <v-expansion-panel class="pa-2" style="box-shadow: none">
                    <loader :active="isLoading"/>
                <v-data-iterator
                    :items="classes"
                    :rows-per-page-items="rowsPerPageItems"
                    :pagination.sync="pagination"
                    style="width: 100%"
                    content-class="mb-5"
                >
                    <template v-slot:item="props">
                        <v-expansion-panel-content>
                            <template #header>
                                <div style="max-width: 100px;">
                                    <v-btn icon @click.stop="$refs.exSource.open(props.item, true)">
                                        <v-icon color="primary">post_add</v-icon>
                                    </v-btn>
                                </div>
                                <div class="title" style="min-width: 100px">Klasa {{props.item.class}}</div>
                                <div class="subheading">{{props.item.code}} - {{props.item.yearbook}}</div>
                                <div style="max-width: 100px;">
                                    <v-btn icon @click.stop="$refs.addUserToGroup.open(props.item)">
                                        <v-icon color="grey lighten-1">group_add</v-icon>
                                    </v-btn>
                                </div>
                            </template>
                            <v-list>

                                <template v-for="(student, index) in props.item.students">

                                    <v-divider></v-divider>

                                    <v-layout wrap align-center class="pl-5 py-2">
                                        <v-flex xs1>
                                            <v-btn icon>
                                                <v-icon color="grey lighten-1" @click.stop="$refs.exSource.open(student)">post_add</v-icon>
                                            </v-btn>
                                        </v-flex>
                                        <v-flex style="display: flex; align-items: center">
                                            <div>
                                                <v-avatar color="grey lighten-1" :size="35">
                                                    <v-icon dark>account_circle</v-icon>
                                                </v-avatar>
                                            </div>
                                            <div>
                                                <span class="subheading ml-3">{{student.firstName}} {{student.lastName}}</span>
                                            </div>
                                        </v-flex>
                                    </v-layout>

                                </template>
                            </v-list>
                        </v-expansion-panel-content>
                    </template>
                </v-data-iterator>
                </v-expansion-panel>

            </v-card>

            <ex-soruce ref="exSource" @fromDatabase="$refs.exChooser.open($event)"></ex-soruce>
            <ex-chooser ref="exChooser"></ex-chooser>
            <group ref="group" @refresh="fetchGroups"></group>
            <add-user-to-group ref="addUserToGroup" @refresh="fetchGroups"></add-user-to-group>
        </section>

    </v-container>
</template>



<script lang="ts">
  import { Component, Vue } from "~/decorators";
  import {UserStore} from "~/store/user";
  import ExSoruce from '~/components/panel/ExSource.modal.vue';
  import ExChooser from '~/components/panel/ExChooser.modal.vue';
  import Timeline from '~/components/panel/Timeline.vue';
  import Group from '~/components/panel/Group.modal.vue';
  import AddUserToGroup from '~/components/panel/AddUserToGroup.modal.vue';

  @Component({
    layout: 'app',
    head: {title: 'Panel'},
    components: {ExSoruce, ExChooser, Timeline, Group, AddUserToGroup}
  })
  export default class extends Vue {
    isLoading = true;
    user = UserStore.CreateProxy( this.$store, UserStore );

    rowsPerPageItems = [5, 10, 20];
    pagination =  {
      rowsPerPage: 5
    };

    classes = [];

    mounted(){
      this.fetchGroups();
    }

    private async fetchGroups(){
      this.isLoading = true;
      this.classes = [];
      const groups = this.user.groups;
      for(let group of groups){
        const res = await this.$api.groups.$getGroupById(group.id);
        this.classes.push({
          ...group,
          students: res.students.map(el => {
            return {
              ...el,
              groupId: group.id
            }
          })
        })
      }
      this.isLoading = false;
    }


  }
</script>


<style lang="scss" scoped>
    .panel__container {
        display: flex;
        width: 100%;
        height: calc(100vh - 80px);
        justify-content: space-around;
        flex-wrap: wrap;

        background: url("~assets/img/teacher/background.jpg") !important;
        background-size: cover !important;
        background-repeat: no-repeat;
        background-position: center center;
        background-attachment: fixed !important;

    }

    $xs-breakpoint: 600px;
    $sm-breakpoint: 960px;

    .welcome{
        width: 20%;
        min-width: 400px;
        margin-left: 100px;
        @media screen and (max-width: $sm-breakpoint) {
            margin-left: 0;
            width: 80%;
        }
        display: flex;
        flex-direction: column;
        align-self: flex-start;
        margin-top: 100px;

        & .results__card {
            width: 100%;
            height: 100%;
            display: flex;

            & .icon__placeholder{
                background-color: rgba(60, 60, 60, 0.5);
                width: 30%;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            & .results {
                width: 70%;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                justify-content: center;
            }
        }

        & .timeline{
            margin-top: 50px;
        }
    }


    .user__classes {
        width: 50%;
        margin-right: 100px;
        @media screen and (max-width: $sm-breakpoint) {
            margin-right: 0;
            width: 95%;
        }
        align-self: flex-start;
        margin-top: 100px;
    }

</style>
