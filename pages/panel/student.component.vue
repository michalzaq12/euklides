<template>
    <v-container class="panel__container" fluid fill-height>
        <loader :active="isLoading" dark/>

        <section class="welcome">
            <v-card  height="160" color="primary" dark>
                <div class="results__card">
                    <div class="icon__placeholder">
                        <div>
                            <v-icon size="80">star</v-icon>
                        </div>
                    </div>
                    <div class="results">
                        <div>
                            <div class="font-weight-thin text-xs-center">TYLE ZADAŃ ROZWIĄZAŁEŚ</div>
                            <div class="font-weight-thin text-xs-center">W TYM TYGODNIU</div>
                        </div>
                        <div>
                            <span class="display-3">4</span>
                        </div>
                    </div>
                </div>
            </v-card>

            <v-card class="mt-5">
                <v-toolbar class="pt-3" flat color="white">
                    <v-icon color="grey darken-1">new_releases</v-icon>
                    <v-toolbar-title class="grey--text text--darken-1">Nowe zadania</v-toolbar-title>
                </v-toolbar>
                <div>
                    <div class="subheading grey--text text--darken-1" style="margin-left: 70px">Masz <span class="primary--text font-weight-bold">1</span> nowe zadanie domowe</div>
                    <div class="d-flex pa-3 mt-3">
                        <div style="width: 50%">
                            <img src="~/assets/img/student/kid3.png" style="max-width: 100%; max-height: 100%"/>
                        </div>
                        <div style="align-self: center">
                            <v-btn color="primary" large>ROZWIĄŻ</v-btn>
                        </div>
                    </div>
                </div>
            </v-card>
        </section>

        <section class="timeline">
            <v-card height="auto">
                <v-toolbar class="mb-2 py-3" flat>
                    <v-icon color="grey darken-1">calendar_today</v-icon>
                    <v-toolbar-title class="grey--text text--darken-1">Ostatnie zdarzenia</v-toolbar-title>
                </v-toolbar>
                <timeline class="ma-4"></timeline>
            </v-card>
        </section>

    </v-container>
</template>



<script lang="ts">
  import { Component, Vue } from "~/decorators";
  import {UserStore} from "~/store/user";
  import Timeline from '~/components/panel/Timeline.vue';

  @Component({
    layout: 'app',
    head: {title: 'Panel'},
    components: {Timeline}
  })
  export default class extends Vue {
    isLoading = true;
    user = UserStore.CreateProxy( this.$store, UserStore );

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
        height: calc(100vh - 80px);
        justify-content: space-between;
        flex-wrap: wrap;

        background: url("~assets/img/student/background.jpg") !important;
        background-size: cover !important;
        background-position: center center;
    }

    $xs-breakpoint: 600px;
    $sm-breakpoint: 960px;

    section.welcome{
        width: 20%;
        min-width: 400px;
        margin-left: 100px;
        @media screen and (max-width: $sm-breakpoint) {
            margin-left: 0;
            width: 100%;
        }
        display: flex;
        flex-direction: column;

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
                align-items: center;
                justify-content: center;
            }
        }
    }


    section.timeline {
        width: 20%;
        min-width: 400px;
        margin-right: 100px;
        @media screen and (max-width: $sm-breakpoint) {
            width: 100%;
            margin-right: 0;
        }
    }




</style>
