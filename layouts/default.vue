<template>
    <v-app>
        <navigation ref="nav"/>
        <v-toolbar color="teal" dark fixed app>
            <v-toolbar-side-icon @click.stop="$refs.nav.toggle()"></v-toolbar-side-icon>
            <v-toolbar-title>Euklides</v-toolbar-title>
        </v-toolbar>
        <v-content>
            <nuxt />
        </v-content>
        <v-footer color="teal" app>
            <span class="white--text">&copy; 2019</span>
        </v-footer>
    </v-app>
</template>

<script>
    import Navigation from '~/components/Navigation';
    export default {
        components: {Navigation}
    }
</script>
