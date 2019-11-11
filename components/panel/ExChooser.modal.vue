<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>

            <v-toolbar dark color="primary" class="mb-2">
                <v-btn icon dark @click="dialog = false">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Zadaj wybrane zadania</v-toolbar-title>
            </v-toolbar>

            <v-card-text class="pa-4">

                <v-card color="white" class="pa-5 mb-5">
                    <div class="primary--text title">Zadanie domowe</div>
                    <div class="subheading mt-3">
                        Zaznacz w budkach po lewej stronie, które zadania chcesz wybrać
                        jako zadanie domowe
                        <span v-if="isGroup">klasie <span class="font-weight-bold">{{target.code}}</span></span>
                        <span v-else>uczniowi <span class="font-weight-bold">{{target.firstName}}</span></span>
                    </div>
                </v-card>

                <ex-database :selection-mode="true" v-model="selectedExercises"></ex-database>

            </v-card-text>

            <v-card-actions class="ma-3">
                <v-spacer></v-spacer>
                <v-btn color="primary" dark large @click="giveHomework">Zadaj</v-btn>
            </v-card-actions>

        </v-card>

        <ex-confirmation ref="exConfirmation" @close-parent="dialog = false"/>

    </v-dialog>
</template>


<script lang="ts">
    import { Component, Vue } from "~/decorators";
    import ExDatabase from '~/components/ExDatabase.vue';
    import ExConfirmation from './ExConfirmation.modal.vue';
    import {Group, UserDto} from "~/api";

    @Component({
        components: {ExDatabase, ExConfirmation}
    })
    export default class extends Vue {
        dialog = false;
        target: Group | UserDto = {} as any;
        isGroup = false;

        selectedExercises = [];

        public open(data : {target: Group | UserDto, isGroup: boolean}){
            this.target = data.target;
            this.isGroup = data.isGroup;
            this.dialog = true;
        }

        giveHomework(){
            if(this.isGroup){
                console.log(this.selectedExercises);
                this.$api.groups.$giveHomeworkToChosenStudentsInThisGroup({
                  dto: {
                    exercises: this.selectedExercises.map(el => el.id), // TODO check if array contains only ids
                    students: [],
                    deadline: '2020-09-12'
                  },
                  groupId: this.target.id
                }).then(() => {
                  //@ts-ignore
                  this.$refs.exConfirmation.open();
                })
            }else {
              console.log('Give homework to chosen student');
            }
        }

    }
</script>
