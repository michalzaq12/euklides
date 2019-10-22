<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>

            <v-toolbar dark color="primary" class="mb-2">
                <v-btn icon dark @click="dialog = false">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Zadaj wybrane zadania</v-toolbar-title>
            </v-toolbar>

            <v-card-text class="pa-4">

                <v-card color="white" class="pa-5 mb-5">
                    <div class="primary--text title">Zadanie domowe</div>
                    <div class="subheading mt-3">
                        Zaznacz w budkach po lewej stronie, które zadania chcesz wybrać
                        jako zadanie domowe uczniowi <span class="font-weight-bold">TODO Fabian Trzebiatowski</span>
                    </div>
                </v-card>

                <ex-database :selection-mode="true"></ex-database>

            </v-card-text>

            <v-card-actions class="ma-3">
                <v-spacer></v-spacer>
                <v-btn color="primary" dark large @click="$refs.exConfirmation.open()">Zadaj</v-btn>
            </v-card-actions>

        </v-card>

        <ex-confirmation ref="exConfirmation" @close-parent="dialog = false"/>

    </v-dialog>
</template>


<script lang="ts">
    import { Component, Vue } from "~/decorators";
    import ExDatabase from '~/components/ExDatabase.vue';
    import ExConfirmation from './ExConfirmation.modal.vue';
    import {User} from "~/api";

    @Component({
        components: {ExDatabase, ExConfirmation}
    })
    export default class extends Vue {
        dialog = false;
        student : User = null;

        public open(student: User){
            this.student = student;
            this.dialog = true;
        }
    }
</script>
