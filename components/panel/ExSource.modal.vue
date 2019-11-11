<template>
    <v-dialog v-model="dialog" max-width="500">
        <v-card>

            <v-toolbar dark color="primary" class="mb-2" flat>
                <v-toolbar-title>Wybierz źródło zadań</v-toolbar-title>
            </v-toolbar>

            <v-card-text class="pa-4">
                <v-btn block large @click="emit('fromDatabase')">Z bazy zadań</v-btn>
                <v-btn block large class="mt-3" @click="emit('defineOwn')">Zdefinuj własne</v-btn>
            </v-card-text>

        </v-card>
    </v-dialog>
</template>


<script>
    export default {
        data(){
            return {
                dialog: false,
                target: null,
                isGroup: false
            }
        },
        methods: {
            open(target, isGroup = false){
                this.dialog = true;
                this.target = target;
                this.isGroup = isGroup;
            },
            emit(type){
                this.dialog = false;
                this.$emit(type, {target: this.target, isGroup: this.isGroup})
            }
        }
    }
</script>
