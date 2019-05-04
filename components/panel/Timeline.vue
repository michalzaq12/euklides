<template>
    <v-timeline align-top dense>
        <v-timeline-item color="pink" small>
            <v-layout pt-3>
                <v-flex xs3>
                    <strong>17:23</strong>
                </v-flex>
                <v-flex>
                    <strong>Zmieniono hasło dostępu</strong>
                </v-flex>
            </v-layout>
        </v-timeline-item>

        <v-timeline-item color="primary lighten-3" small>
            <v-layout wrap pt-3>
                <v-flex xs3>
                    <strong>15:00</strong>
                </v-flex>
                <v-flex>
                    <strong>Przesłano rozwiązania</strong>
                    <div class="caption mb-2"><a href="#">Zadanie nr 2</a></div>
                    <v-avatar>
                        <v-img
                            src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairFrida&accessoriesType=Kurt&hairColor=Red&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=GraphicShirt&clotheColor=Gray01&graphicType=Skull&eyeType=Wink&eyebrowType=RaisedExcitedNatural&mouthType=Disbelief&skinColor=Brown"
                        ></v-img>
                    </v-avatar>
                    <v-avatar>

                        <v-img
                            src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Prescription02&hairColor=Black&facialHairType=MoustacheMagnum&facialHairColor=BrownDark&clotheType=BlazerSweater&clotheColor=Black&eyeType=Default&eyebrowType=FlatNatural&mouthType=Default&skinColor=Tanned"
                        ></v-img>
                    </v-avatar>
                    <v-avatar>
                        <v-img
                            src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairMiaWallace&accessoriesType=Sunglasses&hairColor=BlondeGolden&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Surprised&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Pale"
                        ></v-img>
                    </v-avatar>
                </v-flex>
            </v-layout>
        </v-timeline-item>

        <v-timeline-item color="info" small>
            <v-layout pt-3>
                <v-flex xs3>
                    <strong>12:00</strong>
                </v-flex>
                <v-flex>
                    <strong>Dodano nowe zadania do bazy</strong>
                    <div class="caption"><a href="#">Zadanie nr 22</a></div>
                    <div class="caption"><a href="#">Zadanie nr 23</a></div>
                </v-flex>
            </v-layout>
        </v-timeline-item>

        <v-timeline-item color="primary lighten-3" small>
            <v-layout pt-3>
                <v-flex xs3>
                    <strong>9:15</strong>
                </v-flex>
                <v-flex>
                    <strong>Zadano zadanie</strong>
                    <div class="caption mb-2"><a href="#">Zadanie nr 2</a></div>
                </v-flex>
            </v-layout>
        </v-timeline-item>
    </v-timeline>
</template>
