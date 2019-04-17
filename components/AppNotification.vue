<template>
    <v-snackbar v-model="snackbar" :color="color" :timeout="5000" :bottom="true" :right="true">
        {{ errorText }}
        <v-btn dark flat @click="snackbar = false">
            OK
        </v-btn>
    </v-snackbar>
</template>


<script>
    export default {
        name: 'app-notification',
        data() {
            return {
                isLoading: false,
                errorText: null,
                snackbar: false,
                color: 'error'
            }
        },
        mounted() {

            this.$eventBus.$on('api/error', msg => {
                this.errorText = msg;
                this.color = 'error';
                this.snackbar = true;
            });

            this.$eventBus.$on('api/info', msg => {
                this.errorText = msg;
                this.color = 'primary';
                this.snackbar = true;
            });

        },
        beforeDestroy() {
            this.$eventBus.$off('api/error');
            this.$eventBus.$off('api/info');
        }
    }
</script>
