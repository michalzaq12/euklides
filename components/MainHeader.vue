<template>
    <header class="main_page_header">
        <n-link tag="div" class="link" :to="item.path" v-for="item in navItems" :key="item.title">
            <div class="link__title primary--text">
                <span class="title font-weight-regular text-uppercase px-3">{{item.title}}</span>
            </div>
        </n-link>
    </header>
</template>



<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator";


    interface NavigationItem {
        title: string
        path: string
    }

    @Component
    export default class Card extends Vue {

        navItems: ReadonlyArray<NavigationItem> = [
            {
                title: 'Strona główna',
                path: '/'
            },
            {
                title: 'O nas',
                path: '/'
            },
          {
            title: 'O platformie',
            path: '/'
          },
          {
            title: 'Kontakt',
            path: '/'
          }
        ];

    }
</script>



<style lang="scss">
    :root {
        --header-height: 73px;
    }

    .main_page_header{
        z-index: 1;
        position: fixed;
        width: 100%;
        display: flex;
        height: var(--header-height);
        background-color: white;

        & .link{
            display: flex;
            align-items: center;
            cursor: pointer;
            &:hover {
                background-color: var(--v-accent-lighten3);
            }
        }
    }

</style>
