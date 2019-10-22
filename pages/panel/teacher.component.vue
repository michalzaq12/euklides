<template>
    <v-container class="panel__container" fluid fill-height>
        <loader :active="isLoading" dark/>

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
<!--                <div class="headline text-xs-center white&#45;&#45;text">Witaj {{user.firstName}}</div>-->
            </v-card>
            <v-card class="timeline" height="auto">
                <v-toolbar class="mb-2 py-3" flat>
                    <v-icon color="grey darken-1">calendar_today</v-icon>
                    <v-toolbar-title class="grey--text text--darken-1">Ostatnie zdarzenia</v-toolbar-title>
                </v-toolbar>
                <timeline class="ma-4"></timeline>
            </v-card>
        </section>


        <v-card class="user__classes">
            <v-toolbar dark color="primary" class="mb-2 py-3">
                <v-icon>book</v-icon>
                <v-toolbar-title>Lista Twoich klas</v-toolbar-title>
            </v-toolbar>

            <v-expansion-panel class="pa-2" style="box-shadow: none">
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
                            <div class="title" style="min-width: 100px">{{props.item.name}}</div>
                            <div class="subheading">{{props.item.description}}</div>
                        </template>
                        <v-list>

                            <template v-for="(student, index) in props.item.students">

                                <v-divider></v-divider>

                                <v-list-tile avatar @click="">
                                    <v-list-tile-avatar color="blue-grey darken-1">
                                        <v-icon dark>account_circle</v-icon>
                                    </v-list-tile-avatar>

                                    <v-list-tile-content>
                                        <v-list-tile-title>{{student}}</v-list-tile-title>
                                    </v-list-tile-content>

                                    <v-list-tile-action>
                                        <v-flex>
                                            <v-btn icon ripple>
                                                <v-icon color="grey lighten-1">edit</v-icon>
                                            </v-btn>
                                            <v-tooltip right>
                                                <template #activator="{ on }">
                                                    <v-btn v-on="on" icon large class="ml-5" color="primary" @click.stop="$refs.exSource.open()">
                                                        <v-icon>add</v-icon>
                                                    </v-btn>
                                                </template>
                                                <span>Zadaj zadanie</span>
                                            </v-tooltip>
                                        </v-flex>
                                    </v-list-tile-action>

                                </v-list-tile>
                            </template>
                        </v-list>
                    </v-expansion-panel-content>
                </template>
            </v-data-iterator>
            </v-expansion-panel>

        </v-card>



        <ex-soruce ref="exSource" @fromDatabase="$refs.exChooser.open()"></ex-soruce>
        <ex-chooser ref="exChooser"></ex-chooser>
    </v-container>
</template>



<script lang="ts">
  import { Component, Vue } from "~/decorators";
  import {UserStore} from "~/store/user";
  import ExSoruce from '~/components/panel/ExSource.modal.vue';
  import ExChooser from '~/components/panel/ExChooser.modal.vue';
  import Timeline from '~/components/panel/Timeline.vue';

  @Component({
    layout: 'app',
    head: {title: 'Panel'},
    components: {ExSoruce, ExChooser, Timeline}
  })
  export default class extends Vue {
    isLoading = true;
    user = UserStore.CreateProxy( this.$store, UserStore );

    rowsPerPageItems = [5, 10, 20];
    pagination =  {
      rowsPerPage: 5
    };

    classes = [
      {
        name: 'Klasa IV',
        description: 'SP nr 6 Kościerzyna',
        students: [
          'Adam Swieczkowski',
          'Fabian Trzebiatowski'
        ]
      },
      {
        name: 'Klasa V',
        description: 'SP nr 6 Kościerzyna',
        students: [
          'Adam Swieczkowski',
          'Fabian Trzebiatowski'
        ]
      },
      {
        name: 'Klasa VI',
        description: 'SP nr 6 Kościerzyna',
        students: [
          'Adam Swieczkowski',
          'Fabian Trzebiatowski'
        ]
      }
    ];

    mounted(){
      this.isLoading = true;
      this.user.fetch().finally(() => {
        this.isLoading = false;
      })
    }
  }
</script>


<style lang="scss" scoped>
    .panel__container {
        display: flex;
        width: 100%;
        height: 100vh;
        justify-content: space-around;
        flex-wrap: wrap;

        background: url("~assets/img/teacher/background.jpg") !important;
        background-size: cover !important;
        background-repeat: no-repeat;
        background-position: right top;
        background-attachment: fixed !important;

    }

    $xs-breakpoint: 600px;
    $sm-breakpoint: 960px;

    .welcome{
        width: 20%;
        min-width: 400px;
        @media screen and (max-width: $sm-breakpoint) {
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
        @media screen and (max-width: $sm-breakpoint) {
            width: 95%;
        }
        align-self: flex-start;
        margin-top: 100px;
    }

</style>
