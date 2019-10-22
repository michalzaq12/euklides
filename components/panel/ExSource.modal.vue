<template>
    <v-dialog v-model="dialog" max-width="500">
        <v-card>

            <v-toolbar dark color="primary" class="mb-2" flat>
                <v-toolbar-title>Wybierz źródło zadań</v-toolbar-title>
            </v-toolbar>

            <v-card-text class="pa-4">
                <v-btn block large @click="dialog = false; $emit('fromDatabase')">Z bazy zadań</v-btn>
                <v-btn block large class="mt-3" @click="dialog = false; $emit('defineOwn')">Zdefinuj własne</v-btn>
            </v-card-text>

        </v-card>
    </v-dialog>
</template>


<script>
    export default {
        data(){
            return {
                dialog: false
            }
        },
        methods: {
            open(){
                this.dialog = true;
            },
        }
    }
</script>
