<template>
    <div>
        <main-header />
        <main>
            <section class="banner">
                <div class="banner__logo">
                    <img src="/logo-white.png" />
                </div>
                <div class="banner__text mt-5">
                    <p class="headline white--text text-xs-center">Platforma do nauki matematyki </p>
                    <p class="headline white--text text-xs-center">w Twojej szkole</p>
                </div>
                <div class="banner__button mt-4">
                    <v-btn color="primary" nuxt to="/login" large>Zaloguj się</v-btn>
                </div>
            </section>
            <section class="description">
                <div class="description__container">
                    <div class="description__card" v-for="card in descriptionCards" :key="card.title">
                        <div class="description__title">
                            <v-icon color="white">{{card.icon}}</v-icon>
                            <span class="headline">{{card.title}}</span>
                        </div>
                        <div class="description__text subheading">
                           {{card.text}}
                        </div>
                    </div>
                </div>
            </section>
            <section class="read_more">
                <div class="read_more__card">
                    <hr/>
                    <div class="read_more__text subheading">
                        <p>Zapewniamy  bazę zadań i serwis dostosowany do podstawy programowej uczniów klas</p>
                        <p class="primary--text">IV V VI</p>
                    </div>
                    <v-btn class="read_more__button" color="primary" nuxt to="/login">Dowiedz się więcej</v-btn>
                </div>
            </section>
        </main>
        <main-footer/>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "~/decorators";

    import MainHeader from '~/components/MainHeader.vue';
    import MainFooter from '~/components/MainFooter.vue';


    @Component({
        components: {MainHeader, MainFooter}
    })
    export default class extends Vue {

        descriptionCards = [
            {
                icon: 'question_answer',
                title: 'wymieniaj się pomysłami',
                text: 'skorzystaj z gotowej i ciągle rozwijającej się bazy zadań oraz sam dodawaj do niej swoje zadania'
            },
            {
                icon: 'show_chart',
                title: 'monitoruj postępy',
                text: 'sprawdź, jak często i na jakim poziomie Twoi uczniowie rozwiązują zadania dzięki specjalnie przygotowanym statystykom'
            },
            {
                icon: 'videogame_asset',
                title: 'ucz przez zabawę',
                text: 'poznaj kolorowe, nowoczesne i dostosowane do potrzeb uczniów formy zadań, do których z chęcią będą wracać\n'
            }
        ];

    }
</script>



<style lang="scss" scoped>
    $header-height: var(--header-height);
    main {
        & .banner{
            margin-top: $header-height;
            height: calc(100vh - #{$header-height});
            min-height: 500px;
            background-image: url("~assets/img/main_page_bg.jpg");
            background-size: cover;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            align-items: center;
            justify-content: flex-start;
        }

        & .banner__logo {
            margin-top: 120px;
            height: 8vw;
            width: 100%;
            display: flex;
            justify-content: center;

            & img{
                max-height: 100%;
            }
        }
    }


    .description {
        width: 100%;
        background-image: url("~assets/img/main_page_desc.jpg");
        background-size: cover;
    }


    .description__container{
        padding: 80px 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: stretch;
    }


    .description__card {
        width: 20%;
        min-width: 300px;
        background-color: var(--v-primary-base);
        color: white;
        margin: 10px 50px;
        padding: 20px;
    }

    .description__title {
        margin-bottom: 20px;
        font-size: large;
        text-align: right;
    }

    .description__text {
        text-align: justify;
    }


    .read_more{
        background-image: url("~assets/img/section_read_more.jpg");
        background-size: cover;
        min-height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .read_more__card{
        position: relative;
        width: 30%;
        min-width: 300px;
        padding: 20px;
        background-color: white;
        text-align: center;

        & hr {
            width: 30%;
            margin: 10px auto;
            border: 0;
            background-color: var(--v-primary-base);
            height: 1px;
        }
    }

    .read_more__text {
        max-width: 80%;
        margin: 0 auto;
    }


    .read_more__button {
        margin: 0;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }

</style>
