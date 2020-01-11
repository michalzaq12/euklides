<template>
    <v-card v-bind="$attrs" min-width="300">
        <v-toolbar dark color="primary" class="mb-2">
            <span class="headline">{{title}}</span>
        </v-toolbar>

        <v-card-text class="pa-4">
            <div v-if="hasImage" style="height: 200px; text-align: center;">
                <img :src="image" alt="" style="max-height: 100%"/>
            </div>
            <div>
                <p class="subheading grey--text">Treść zadania:</p>
                <p class="title">{{content}}</p>
            </div>
            <div v-if="type === 'OPEN'">
                <div v-if="answer">
                    <p class="subheading grey--text">Przesłana odpowiedź:</p>
                    <p class="title">{{answer.answer}}</p>
                </div>
                <v-textarea v-else-if="selectableAnswers" v-model="answerRequest.answer" label="Odpowiedź" outline auto-grow rows="3"></v-textarea>
            </div>
            <div v-else-if="type === 'OPEN_WITH_POINTS'" class="mt-3 body-1">
                <ul>
                    <li v-for="point in ex.points" :key="point.id">
                        {{point.content}} <input />
                    </li>
                </ul>
            </div>
            <div v-else-if="type === 'CLOSED'" class="mt-3 body-1">

                <v-layout>
                    <v-flex xs6 v-for="choice in ex.choices" class="answer ma-1 pa-3 text-xs-center"
                            :class="{selected: choice.selected}" @click.stop="addClosedAnswer(choice)">
                        {{choice.label}}
                    </v-flex>
                </v-layout>

            </div>
        </v-card-text>
        <v-card-actions v-if="hasProvidedAnswer">
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="commitAnswer">Zatwierdź opdpowiedź</v-btn>
            <v-spacer></v-spacer>
        </v-card-actions>
    </v-card>

</template>


<script>
    import cloneDeep from 'lodash/cloneDeep';
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
                else if(this.type === 'OPEN' && this.answerRequest.answer !== '') return true;
                return false;
            }
        },
        data(){
            return {
                ex: cloneDeep(this.exercise),
                answerRequest: {
                    answer: '',
                    choice: -1,
                    pointAnswers: []
                }
            }
        },
        watch: {
            exercise(newEx){
                this.ex = cloneDeep(newEx)
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
              // if(this.type === 'CLOSED') data.choice = this.answerRequest.choice;
              // else if(this.type === 'OPEN_WITH_POINTS') data.pointAnswers = this.answerRequest.pointAnswers;
              // else if(this.type === 'OPEN') data.answer = this.answerRequest.answer;

              this.$emit('commit', data);
              this.reset();
          }
        },
        mounted() {
            console.log(this.exercise);
            this.ex = cloneDeep(this.exercise);
            if(this.answer){
                if(this.type === 'CLOSED'){
                    const choice = this.ex.choices.find(el => el.order === this.answer.choice);
                    this.$set(choice, 'selected', true);
                }
            }
        }
    }
</script>


<style lang="scss" scoped>
    .answer {
        border: 1px solid var(--v-primary-base);

        &.selected {
            background-color: var(--v-primary-base);
            color: white;
        }
    }
</style>
