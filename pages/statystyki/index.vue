<template>
    <v-layout wrap align-center class="ma-4">
        <v-flex xs12 sm4 class="text-xs-center">
            <v-card>
                <v-toolbar dark color="primary" class="mb-2">
                    <v-toolbar-title>Ilość zadań do sprawdzenia</v-toolbar-title>
                </v-toolbar>
                <zing-chart :data="myData" :series="mySeries"></zing-chart>
            </v-card>
        </v-flex>
    </v-layout>

</template>


<script lang="ts">
  import { Component, Vue } from "~/decorators";
  import zingChart from 'zingchart-vue';



  @Component({
    layout: 'app',
    head: {title: 'Statystyki'},
    components: {zingChart}
  })
  export default class extends Vue {
    myData = {
      type: 'bar'
    };
    mySeries = [
      {
        values: [1,2,4,5,6],
        'background-color': "#078B75",
        "line-color": "#078B75",
        alpha: 0.9
      }
    ];
  }
</script>
