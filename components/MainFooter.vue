<template>
    <footer>
        <div class="footer__container subheading">
            <div class="footer__logo">
                <div class="hr"></div>
                <img class="mx-3" src="/logo.png"/>
                <div class="hr"></div>
            </div>
            <div class="footer__content my-5">
                <section class="site_map">
                    <n-link tag="div" class="footer__link" to="/" v-for="item in 4" :key="item">
                        <div class="icon"><v-icon color="primary">chevron_right</v-icon></div>
                        <div class="text mx-2 py-1">asdasd</div>
                    </n-link>
                </section>
                <section class="authors pa-1">
                    <div>Martyna Gostomska</div>
                    <div>Andrzej Skwierawski</div>
                    <div>Tomasz Stankowski</div>
                    <div>Michał Zarach</div>
                </section>
                <section class="contact">
                    <div class="block">
                        <v-icon color="primary">mail_outline</v-icon>
                        <div class="text">euklides.support@gmail.com</div>
                    </div>
                    <div class="block">
                        <v-icon color="primary">location_on</v-icon>
                        <div class="text">
                            <p>Wydział Elektroniki, Telekomunikacji i Informatyki</p>
                            <p>Politechnika Gdańska</p>
                            <p>Gabriela Narutowicza 11/12, 80-233 Gdańsk</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </footer>
</template>


<style lang="scss" scoped>
    .footer__container {
        width: 80%;
        margin: 40px auto;
        color: #707070;
    }

    .footer__logo {
        display: flex;

        & .hr {
            align-self: center;
            flex-grow: 1;
            border-top: 2px solid var(--v-primary-base);
        }
    }

    .footer__link{
        display: flex;
        align-items: center;
        min-width: 50%;

        &:hover{
            cursor: pointer;
        }

        & .text{
            border-bottom: 1px solid #707070;
            width: 100%;
        }
    }

    .footer__content {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        & section {
            width: 30%;
            min-width: 300px;
            margin: 20px 0;
        }

        & .site_map {
            display: flex;
            align-items: stretch;
            flex-wrap: wrap;
            padding-bottom: 1px;
        }

        & .authors {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
        }


        & .contact {
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            & .block {
                display: flex;

                & .v-icon {
                    align-self: flex-start;
                }

                & .v-icon, & .text{
                    margin: 8px;
                }

                & p {
                    margin: 0;
                }
            }
        }
    }
</style>
