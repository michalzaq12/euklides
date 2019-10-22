<template>
    <v-container class="panel__container" fluid fill-height>
        <loader :active="isLoading" dark/>
        <section class="welcome">
            <v-card class="user" height="200" color="primary">
                <v-avatar size="200">
                    <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                </v-avatar>
                <div class="headline text-xs-center white--text">Witaj {{user.firstName}}</div>
            </v-card>
            <v-card class="timeline pa-3" height="auto">
                <v-card-title>Ostatnie zdarzenia</v-card-title>
                <timeline></timeline>
            </v-card>
        </section>
        <section class="user__classes pb-5">
            <v-card class="pa-4 mb-5 text-xs-center user__classes__header" color="primary" flat>
                <div class="title white--text">Lista twoich klas</div>
            </v-card>
            <v-expansion-panel popout class="pa-2">
                <v-expansion-panel-content v-for="(item,i) in classes" :key="i">
                    <template #header>
                        <div class="title">{{i + 1}}. {{item.name}}</div>
                        <div class="subheading">{{item.description}}</div>
                    </template>
                    <v-list>

                        <template v-for="(student, index) in item.students">

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
            </v-expansion-panel>
        </section>



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

        & .user {
            width: 100%;
            align-self: flex-start;
            padding-top: 150px;
            margin-top: 100px;

            & .v-avatar{
                left: 50%;
                transform: translateX(-50%);
                top: -100px;
                position: absolute;
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
        border: 3px solid var(--v-primary-base);
        border-radius: 2px;
        margin-top: 100px;
    }

</style>
