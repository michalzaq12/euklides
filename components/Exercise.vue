<template>
    <v-card v-bind="$attrs" min-width="300" max-width="900" class="pb-4">
        <loader :active="isLoading"/>
        <v-toolbar dark color="primary" class="mb-2">
            <span class="headline">{{title}}</span>
            <v-spacer v-if="selectableAnswers"></v-spacer>
            <v-btn v-if="selectableAnswers" icon dark @click="$emit('close')">
                <v-icon>close</v-icon>
            </v-btn>
        </v-toolbar>

        <v-card-text class="pa-4">
            <div v-if="hasImage" style="height: 200px; text-align: center;">
                <img :src="image" alt="" style="max-height: 100%"/>
            </div>
            <div>
                <p class="subheading grey--text">Treść zadania:</p>
                <p class="title mb-4">{{content}}</p>
            </div>
            <div v-if="type === 'OPEN'">

                <div v-if="answer">
                    <p class="subheading grey--text">Przesłana odpowiedź:</p>
                    <p class="title">{{answer.answer}}</p>
                </div>
                <v-textarea v-else-if="selectableAnswers" v-model="answerRequest.answer" label="Odpowiedź" outline auto-grow rows="3"></v-textarea>

            </div>
            <div v-else-if="type === 'OPEN_WITH_POINTS'" class="mt-3 body-1">

                <div v-for="(point, index) in ex.points" :key="point.id" class="subheading">
                    <b>{{alphabet[index]}})</b> {{point.content}} <span v-if="selectableAnswers">:</span>
                    <v-btn-toggle v-if="answer" v-model="correctAnswers[index]" style="float: right;">
                        <v-btn flat :value="false"><span>Źle</span><v-icon right color="error">thumb_down_alt</v-icon></v-btn>
                        <v-btn flat :value="true"><v-icon left color="primary">thumb_up_alt</v-icon><span>Dobrze</span></v-btn>
                    </v-btn-toggle>
                    <div v-if="answer">
                        <span class="subheading grey--text">Przesłana odpowiedź: </span>{{answer.pointAnswers[index].answer}}
                    </div>
                    <v-text-field v-model="answerRequest.pointAnswers[index]" outline class="ml-3 mt-3" v-if="selectableAnswers" :label="`Odpowiedź do ${alphabet[index]}) `"></v-text-field>
                </div>

            </div>
            <div v-else-if="type === 'CLOSED'" class="mt-3 body-1">

                <v-layout>
                    <v-flex xs6 v-for="(choice, index) in ex.choices" class="answer ma-1 pa-3 text-xs-center subheading"
                            :class="{selected: choice.selected, selectable: selectableAnswers}" @click.stop="addClosedAnswer(choice)">
                        <b>{{alphabet[index]}})</b> {{choice.label}}
                    </v-flex>
                </v-layout>

            </div>
        </v-card-text>
        <v-card-actions v-if="selectableAnswers">
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="commitAnswer" :disabled="!hasProvidedAnswer">Zatwierdź opdpowiedź</v-btn>
            <v-spacer></v-spacer>
        </v-card-actions>
        <div class="text-xs-center" v-show="selectableAnswers && !hasProvidedAnswer">
            <span class="primary--text">Wypełnij wszystkie wymagane pola!</span>
        </div>
        <v-card-actions v-if="answer && type !== 'OPEN_WITH_POINTS'" class="mr-5">
            <v-spacer></v-spacer>
            <v-btn-toggle v-model="isCorrectAnswer">
                <v-btn large flat :value="false" @click.stop="checkAnswer(false)"><span>Źle</span><v-icon right color="error" large>thumb_down_alt</v-icon></v-btn>
                <v-btn large flat :value="true" @click.stop="checkAnswer(true)"><v-icon left color="primary" large>thumb_up_alt</v-icon><span>Dobrze</span></v-btn>
            </v-btn-toggle>
        </v-card-actions>
        <v-card-actions v-else-if="answer">
            <v-btn @click="checkAnswer()" block color="primary">Zatwierdź</v-btn>
        </v-card-actions>
    </v-card>

</template>


<script>
    import cloneDeep from 'lodash/cloneDeep';
    import isEmpty from 'lodash/isEmpty';
    export default {
        props: {
            exercise: {
                type: Object,
                required: true
            },
            selectableAnswers: {
                type: Boolean,
                default: false
            },
            answer: {
                type: Object
            }
        },
        computed: {
            title(){
              return this.ex.name
            },
            type(){
                return this.ex.type
            },
            content(){
                return this.ex.content
            },
            hasImage(){
                return this.ex.pictures.length > 0;
            },
            image(){
                return this.ex.pictures[0];
            },
            hasProvidedAnswer(){
                if(this.type === 'CLOSED' && this.answerRequest.choice !== -1) return true;
                else if(this.type === 'OPEN' && !isEmpty(this.answerRequest.answer)) return true;
                else if(this.type === 'OPEN_WITH_POINTS'){
                    for(let i =0; i < this.ex.points.length; i++) if(isEmpty(this.answerRequest.pointAnswers[i])) return false;
                    return true;
                }
                return false;
            }
        },
        data(){
            return {
                alphabet: 'abcdefghijklmnopqrstuvwxyz'.split(''),
                ex: cloneDeep(this.exercise),
                answerRequest: {
                    answer: '',
                    choice: -1,
                    pointAnswers: []
                },
                isLoading: false,
                isCorrectAnswer: false,
                correctAnswers: []
            }
        },
        watch: {
            exercise(newEx){
                this.ex = cloneDeep(newEx);
                this.prepareFields();
            }
        },
        methods: {
          addClosedAnswer(choice){
              this.answerRequest.choice = choice.order;
              for(const _choice of this.ex.choices) this.$set(_choice, 'selected', false);
              this.$set(choice, 'selected', true);
          },
            reset(){
                if(this.ex.choices) for(const _choice of this.ex.choices) this.$set(_choice, 'selected', false);
                this.answerRequest = {
                    answer: '',
                    choice: -1,
                    pointAnswers: []
                }
            },
          commitAnswer(){
              const data = {
                  "exercisesToAnswers": {
                      [this.ex.id]: {
                          type: this.type,
                          ...this.answerRequest
                      }
                  }
              };
              this.$emit('commit', data);
              this.reset();
          },
            checkAnswer(val){
                this.isLoading = true;
                let req = {};
                if(this.type === 'OPEN_WITH_POINTS'){
                    req = {
                        type: 'MULTIPLE_ANSWERS',
                        answersCorrect: this.correctAnswers
                    }
                }else {
                    req = {
                        type: 'SINGLE_ANSWER',
                        answerCorrect: val
                    }
                }
                this.$api.homeworks.$checkStudentAnswers({
                    homeworkId: this.ex.homeworkId,
                    studentId: this.ex.studentId,
                    request: {
                        "exerciseToAnswerCheck": {
                            [this.ex.id]: req
                        }
                    }
                }).catch(() => this.prepareFields())
                    .finally(() => this.isLoading = false);
            },
            prepareFields(){
                this.ex = cloneDeep(this.exercise);
                if(this.answer){
                    if(this.type !== 'OPEN_WITH_POINTS'){
                        this.isCorrectAnswer = this.answer.correct;
                    }
                    if(this.type === 'CLOSED'){
                        const choice = this.ex.choices.find(el => el.order === this.answer.choice);
                        this.$set(choice, 'selected', true);
                    }
                    if(this.type === 'OPEN_WITH_POINTS'){
                        for(let i = 0; i < this.ex.points.length; i++){
                            this.correctAnswers[i] = this.answer.pointAnswers[i].correct;
                        }
                    }
                }
            }
        },
        mounted() {
            //console.log(this.exercise);
            this.reset();
            this.prepareFields();
        }
    }
</script>


<style lang="scss" scoped>
    .answer {
        border: 1px solid var(--v-primary-base);
        min-width: 100px;

        &.selected {
            background-color: var(--v-primary-base);
            color: white;
        }

        &.selectable {
            cursor: pointer;
        }
    }
</style>
