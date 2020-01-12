<template>
    <v-dialog v-model="dialog" max-width="600">
        <v-card>

            <v-toolbar dark color="primary" class="mb-2" flat>
                <v-toolbar-title>Wybierz termin zadania</v-toolbar-title>
            </v-toolbar>

            <v-card-text>
                <v-date-picker v-model="date" :landscape="true" full-width locale="pl-pl" :reactive="true"></v-date-picker>
                <v-time-picker
                    v-model="time"
                    full-width
                    landscape
                    type="month"
                    class="mt-3"
                    format="24hr"
                ></v-time-picker>
            </v-card-text>

            <v-card-actions>
                <v-btn block color="primary" @click="commit" :disabled="date === null || time === null">Zatwierdź</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>


<script>
    export default {
        data(){
            return {
                dialog: false,
                date: null,
                time: null
            }
        },
        methods: {
            open(){
                this.date = new Date().toISOString().substr(0, 10);
                this.time = '12:00';
                this.dialog = true;
            },
            commit(){
                this.dialog = false;
                const deadline = this.date + 'T' + this.time + 'Z';
                this.$emit('done', deadline);
            }
        }
    }
</script>
