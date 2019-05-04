<template>
    <div class="pa-5">
        <ex-database></ex-database>
    </div>
</template>


<script lang="ts">
    import { Component, Vue } from "~/decorators";
    import ExDatabase from '~/components/ExDatabase.vue';

    @Component({
        layout: 'app',
        head: {title: 'Baza zadań'},
        components: {ExDatabase}
    })
    export default class extends Vue {

    }

</script>
