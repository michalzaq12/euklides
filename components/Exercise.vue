<template>
    <v-card v-bind="$attrs">
        <v-toolbar dark color="primary" class="mb-2">
            <span class="headline">{{title}}</span>
        </v-toolbar>

        <v-card-text class="pa-4">
            <div v-if="hasImage" style="height: 200px">
                <img :src="image" alt="" style="max-height: 100%"/>
            </div>
            <span class="title">{{content}}</span>
            <div v-if="type === 'OPEN'">

            </div>
            <div v-else-if="type === 'OPEN_WITH_POINTS'" class="mt-3 body-1">
<!--                <span>{{content}}</span>-->
                <ul>
                    <li v-for="point in exercise.points" :key="point.id">
                        {{point.content}} <input />
                    </li>
                </ul>
            </div>
            <div v-else-if="type === 'CLOSED'" class="mt-3 body-1">

                <v-layout>
                    <v-flex xs6 v-for="choice in exercise.choices" class="answer ma-1 pa-3 text-xs-center"
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
    export default {
        props: {
            exercise: {
                type: Object,
                required: true
            },
            selectableAnswers: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            title(){
              return this.exercise.name
            },
            type(){
                return this.exercise.type
            },
            content(){
                return this.exercise.content
            },
            hasImage(){
                return this.exercise.pictures.length > 0;
            },
            image(){
                return this.exercise.pictures[0];
            },
            hasProvidedAnswer(){
                if(this.type === 'CLOSED' && this.answerRequest.choice !== -1) return true;

                return false;
            }
        },
        data(){
            return {
                answerRequest: {
                    answer: '',
                    choice: -1,
                    pointAnswers: []
                }
            }
        },
        methods: {
          addClosedAnswer(choice){
              this.answerRequest.choice = choice.order;
              for(const _choice of this.exercise.choices) this.$set(_choice, 'selected', false);
              this.$set(choice, 'selected', true);
          },
            reset(){
                for(const _choice of this.exercise.choices) this.$set(_choice, 'selected', false);
                this.answerRequest = {
                    answer: '',
                    choice: -1,
                    pointAnswers: []
                }
            },
          commitAnswer(){
              const data = {
                  "exercisesToAnswers": {
                      [this.exercise.id]: {
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
