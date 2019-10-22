<template>
    <v-dialog v-model="dialog" max-width="1000px" transition="dialog-bottom-transition">
        <v-card>
            <loader :active="isLoading"/>
            <v-toolbar dark color="primary" class="mb-2" flat>
                <v-toolbar-title>Dodawanie nowego zadania</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon dark @click="dialog = false">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-card-text class="pa-4">

                <v-layout wrap align-center class="mb-4">
                    <v-flex xs12 sm4 class="text-xs-center">
                        <file-upload ref="upload">
                            Dodaj grafikę
                            <v-icon right dark>add_photo_alternate</v-icon>
                        </file-upload>
                    </v-flex>
                    <v-flex xs12 sm8 class="text-xs-center">
                        <div v-if="$refs.upload && $refs.upload.files[0] && $refs.upload.files[0].thumb" style="position: relative">
                            <img :src="$refs.upload.files[0].thumb" style="max-width: 100%; max-height: 250px" />
                            <v-btn absolute fab top right small outline color="grey" @click="$refs.upload.reset()">
                                <v-icon>delete_outline</v-icon>
                            </v-btn>
                        </div>
                        <div v-else class="grey lighten-3" style="height: 100px; display: flex; align-items: center; justify-content: center">
                            <v-icon color="grey" size="60">image</v-icon>
                        </div>
                    </v-flex>
                </v-layout>
                <v-textarea v-model="form.name" label="Nazwa zadania" auto-grow rows="1"></v-textarea>
                <v-layout wrap align-center>
                    <v-flex xs12 sm5>
                        <v-select
                            v-model="form.exClass"
                            :items="[4,5,6]"
                            label="Klasa"
                        ></v-select>
                    </v-flex>
                    <v-flex xs0 sm2></v-flex>
                    <v-flex xs12 sm5>
                        <v-select
                            :items="[4,5,6]"
                            label="Dział"
                            disabled
                        ></v-select>
                    </v-flex>
                </v-layout>



                <v-tabs v-model="activeTab" grow>

                    <v-tabs-slider color="primary"></v-tabs-slider>

                    <v-tab ripple>OTWARTE</v-tab>
                    <v-tab ripple>WYBÓR</v-tab>
                    <v-tab ripple>ZAMKNIĘTE</v-tab>

                </v-tabs>
                    <v-tabs-items v-model="activeTab">
                    <v-tab-item class="mt-4">
                        <v-card flat>
                            <v-card-text>
                                <v-textarea v-model="form.content" label="Treść zadania" outline auto-grow></v-textarea>
                                <v-textarea v-model="form.answer" label="Odpowiedź" outline auto-grow rows="1"></v-textarea>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>

                    <v-tab-item>
                        <v-card flat>
                            <v-card-text>todo</v-card-text>
                        </v-card>
                    </v-tab-item>

                    <v-tab-item>
                        <v-card flat>
                            <v-card-text>todo</v-card-text>
                        </v-card>
                    </v-tab-item>

                    </v-tabs-items>

            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" dark large @click="sendEx">Dodaj</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>

        </v-card>
    </v-dialog>
</template>


<script lang="ts">
    import {Component, Vue, Resettable, TwoWayEnum} from "~/decorators";
    import FileUpload from './FileUplaod.vue';

    const activeTabToExType = new TwoWayEnum(['OPEN', 'OPEN_CHOICE', 'CLOSED']);

    @Component({
      components: {FileUpload}
    })
    export default class extends Vue {
        isLoading = false;
        dialog = false;
        activeTab = activeTabToExType.get('OPEN');

        form = Resettable({
            exClass: null,
            name: '',
            content: '',
            answer: '',
        });

        public open(){
            this.dialog = true;
        }

        sendEx(){
            this.isLoading = true;
            this.$api.exercises.$createExercise({
                type: activeTabToExType.get(this.activeTab),
                class: this.form.exClass,
                name: this.form.name,
                content: this.form.content,
                answer: this.form.answer
            }).then(() => {
                //TODO: show notification
                this.dialog = false;
                this.form.reset();
                //@ts-ignore
                this.$refs.upload.reset();
                this.$emit('refresh-data');
            }).finally(() => {
                this.isLoading = false;
            });
        }

    }
</script>
