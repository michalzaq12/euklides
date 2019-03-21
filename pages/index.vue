<template>
    <v-layout align-center justify-center row fill-height wrap>
        <v-flex v-for="i in 9" :key="i" md4 xs12 class="text-xs-center">
            <img src="http://www.matematyka.net/pictures/euklides.jpg" />
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import { Component, Vue } from "~/decorators";


    @Component
    export default class extends Vue {

    }
</script>



