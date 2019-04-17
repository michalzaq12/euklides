<template>
    <v-app>
        <nuxt />
        <app-notification></app-notification>
    </v-app>
</template>

<script>
    import AppNotification from '~/components/AppNotification.vue';

    export default {
        components: { AppNotification }
    }
</script>
