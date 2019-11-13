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
                            <v-icon left color="primary">add_photo_alternate</v-icon>
                            Dodaj grafikę
                        </file-upload>
                    </v-flex>
                    <v-flex xs12 sm8 class="text-xs-center">
                        <div v-if="$refs.upload && $refs.upload.thumbnail" style="position: relative">
                            <img :src="$refs.upload.thumbnail" style="max-width: 100%; max-height: 250px" />
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
                            v-model="form.class"
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

                    <v-tab-item class="mt-4">
                        <v-card flat>
                            <v-textarea v-model="form.content" label="Treść zadania" outline auto-grow></v-textarea>
                            <draggable v-model="form.points" @start="drag=true" @end="drag=false">
                                <v-layout v-for="(point, index) in form.points" :key="point.order">
                                    <v-flex xs5>
                                        <v-text-field v-model="point.content" :prefix="`${alphabet[index]}) `"></v-text-field>
                                    </v-flex>
                                    <v-flex xs1></v-flex>
                                    <v-flex xs5>
                                        <v-text-field v-model="point.answer" :label="`Odpowiedź do ${alphabet[index]})`"></v-text-field>
                                    </v-flex>
                                    <v-flex xs2 class="ml-5 mt-2">
                                        <v-btn color="red darken-4" dark outline block @click="form.points.splice(form.points.indexOf(point), 1)">
                                            <v-icon>remove</v-icon>
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </draggable>
                            <v-card-actions>
                                <v-btn color="primary" outline @click="form.points.push({content: '', answer: ''})">
                                    <v-icon left>add</v-icon>
                                    Dodaj podpunkt
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-tab-item>

                    <v-tab-item class="mt-4">
                        <v-card flat>
                            <v-textarea v-model="form.content" label="Treść zadania" outline auto-grow></v-textarea>
                            <draggable v-model="form.choices" @start="drag=true" @end="drag=false">
                                <v-layout v-for="(choice, index) in form.choices" :key="choice.order">
                                    <v-flex xs1>
                                        <v-radio-group v-model="form.correctChoiceOrder" color="primary">
                                            <v-radio :value="index" color="primary"></v-radio>
                                        </v-radio-group>
                                    </v-flex>
                                    <v-flex xs9>
                                        <v-text-field v-model="choice.label" :prefix="`${alphabet[index]}) `"></v-text-field>
                                    </v-flex>
                                    <v-flex xs2 class="ml-5 mt-2">
                                        <v-btn color="red darken-4" dark outline block @click="form.choices.splice(form.choices.indexOf(choice), 1)">
                                            <v-icon>remove</v-icon>
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </draggable>
                            <v-card-actions>
                                <v-btn color="primary" outline @click="form.choices.push({label: ''})">
                                    <v-icon left>add</v-icon>
                                    Dodaj odpowiedź
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-tab-item>

                    </v-tabs-items>

            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" dark large @click="sendEx">
                    <span v-if="editMode">Zaktualizuj</span>
                    <span v-else>Dodaj</span>
                </v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>

        </v-card>
    </v-dialog>
</template>


<script lang="ts">
    import {Component, Vue, Resettable, TwoWayEnum} from "~/decorators";
    import FileUpload from './FileUplaod.vue';
    import draggable from 'vuedraggable'
    import pick from 'lodash/pick';
    import { ExerciseRequest, ExerciseResponseWithAuthor} from "~/api";

    const activeTabToExType = new TwoWayEnum(['OPEN', 'OPEN_WITH_POINTS', 'CLOSED']);

    @Component({
      components: {FileUpload, draggable}
    })
    export default class extends Vue {
        isLoading = false;
        dialog = false;
        editMode = false;
        activeTab = activeTabToExType.get('OPEN');
        alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

        form = Resettable({
            id: '',
            class: null,
            name: '',
            content: '',
            answer: '',
            choices: [],
            points: [],
            correctChoiceOrder: null
        });

        public open(exercise? : ExerciseResponseWithAuthor){
            this.dialog = true;
            this.editMode = false;
            if(exercise){
              this.editMode = true;
              this.activeTab = activeTabToExType.get(exercise.type);
              this.form.fill(pick(exercise, ['id', 'class', 'name', 'content', 'answer', 'choices', 'points', 'correctChoiceOrder']))
            }
        }

        private addOrderField(array){
          array.forEach((el, index) => el.order = index);
          return array;
        }

        private prepareForm(): ExerciseRequest{
          const type = activeTabToExType.get(this.activeTab);
          if(type === 'OPEN'){
            const formTemp = pick(this.form, ['name', 'class', 'content', 'answer']);
            return {...formTemp, type}
          }else if(type === 'OPEN_WITH_POINTS'){
            this.addOrderField(this.form.points);
            const formTemp = pick(this.form, ['name', 'class', 'content', 'points']);
            return {...formTemp, type}
          }else if(type === 'CLOSED'){
            this.addOrderField(this.form.choices);
            const formTemp = pick(this.form, ['name', 'class', 'content', 'choices', 'correctChoiceOrder']);
            return {...formTemp, type}
          }else {
            throw new Error('Invalid exercise type');
          }
        }

        sendEx(){
          this.isLoading = true;
          let baseRequest : Promise<any> = null;
          if(this.editMode){
            baseRequest = this.$api.exercises.$updateExercise({
              id: this.form.id,
              requestBody: this.prepareForm()
            })
          }else {
            baseRequest = this.$api.exercises.$createExercise(this.prepareForm())
              .then(ex => {
                //@ts-ignore
                if(this.$refs.upload.hasFile) {
                  const formData = new FormData();
                  //@ts-ignore
                  formData.append('files', this.$refs.upload.file);
                  return this.$api.$axios.post(`/exercises/${ex.id}/pictures`, formData) as Promise<any>
                }else {
                  return Promise.resolve();
                }
              })
          }

          baseRequest.then(() => {
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
