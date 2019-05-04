<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>

            <v-toolbar dark color="primary" class="mb-2">
                <v-btn icon dark @click="dialog = false">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Zadaj wybrane zadania</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark flat @click="dialog = false">Zadaj</v-btn>
                </v-toolbar-items>
            </v-toolbar>

            <v-card-text class="pa-4">

                <ex-database></ex-database>

            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" dark>Zadaj</v-btn>
            </v-card-actions>

        </v-card>
    </v-dialog>
</template>


<script lang="ts">
    import { Component, Vue } from "~/decorators";
    import ExDatabase from '~/components/ExDatabase.vue';

    @Component({
        components: {ExDatabase}
    })
    export default class extends Vue {
        dialog = false;

        public open(){
            this.dialog = true;
        }
    }
</script>
