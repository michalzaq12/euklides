<template>
    <v-container class="panel__container" fluid fill-height>
        <v-layout column>
            <div class="text-xs-right my-3">
                <v-btn-toggle v-model="toggle_exclusive">
                    <v-btn flat>
                        <v-icon>view_list</v-icon>
                    </v-btn>
                    <v-btn flat>
                        <v-icon>view_module</v-icon>
                    </v-btn>
                </v-btn-toggle>
            </div>

            <ex-database :view="toggle_exclusive" ref="exDatabase" @edit-ex="$refs.addEx.open($event)"></ex-database>
            <v-btn bottom right fixed class="mb-5 mr-3"
                   color="primary darken-2" large dark @click="$refs.addEx.open()">
                Dodaj
                <v-icon right dark>cloud_upload</v-icon>
            </v-btn>
        </v-layout>
        <add-ex-modal ref="addEx" @refresh-data="$refs.exDatabase.fetchExercise()"></add-ex-modal>
    </v-container>
</template>


<script lang="ts">
    import { Component, Vue } from "~/decorators";
    import ExDatabase from '~/components/ExDatabase.vue';
    import AddExModal from '~/components/AddEx.modal.vue';

    @Component({
        layout: 'app',
        head: {title: 'Baza zadań'},
        components: {ExDatabase, AddExModal}
    })
    export default class extends Vue {
        toggle_exclusive = 0
    }

</script>
