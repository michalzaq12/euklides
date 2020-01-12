<template>
    <div class="ma-4">
        <v-data-table
            :headers="headers"
            :items="exercises"
            :loading="loading"
            item-key="id"
            class="elevation-1"
            :rows-per-page-items="[10,20,50]"
        >
            <template #items="props">
                <tr @click.stop="showExercise(props.item)">
                    <td>
                        <v-icon v-if="props.item.status" color="primary">radio_button_checked</v-icon>
                        <v-icon v-else color="error">radio_button_unchecked</v-icon>
                    </td>
                    <td class="text-xs-center">
                        <span v-if="props.item.status">{{props.item.userAnswer.commissionDateTime | date}}</span>
                        <span v-else>-</span>
                    </td>
                    <td>{{props.item.groupName}}</td>
                    <th class="text-xs-center">
                        <v-menu open-on-hover offset-x>
                            <template #activator="{ on }">
                                <v-btn icon outline color="info" v-on="on">
                                    <v-icon>search</v-icon>
                                </v-btn>
                            </template>

                            <exercise :exercise="props.item"></exercise>

                        </v-menu>
                    </th>
                    <td>{{props.item.chapter || '-'}}</td>
                    <td class="font-weight-bold">{{ props.item.name }}</td>
                    <td class="text-xs-center">{{props.item.deadline | date}}</td>
                    <td>
                        <v-btn v-if="!props.item.status" color="primary" flat>Prześlij odpowiedź</v-btn>
                        <v-btn v-else color="primary" flat>Popraw odpowiedź</v-btn>
                    </td>
                </tr>
            </template>
        </v-data-table>
        <v-dialog v-model="showDialog" lazy max-width="900">
            <exercise ref="ex" :exercise="focusedExercise" :selectable-answers="true" @commit="sendAnswer" @close="showDialog = false"/>
        </v-dialog>
    </div>

</template>


<script lang="ts">
  import {UserStore} from "~/store/user";
  import { Component, Vue } from "~/decorators";
  import Exercise from '~/components/Exercise.vue';

  @Component({
    head: {title: 'Zadania domowe'},
    layout: 'app',
    components: {Exercise}
  })
  export default class extends Vue {
    user = UserStore.CreateProxy( this.$store, UserStore );

    exercises = [];
    focusedExercise = {};
    showDialog = false;

    loading = false;
    headers = [
      {
        text: 'Status',
        value: 'status'
      },
      {
        text: 'Data przesłania',
        value: 'commissionDateTime',
        align: 'center'
      },
      {
        text: 'Grupa',
        value: 'groupName',
      },
      {
        text: 'Podgląd',
        align: 'center',
        sortable: false,
        width: 50
      },
      {
        text: 'Dział',
        value: 'chapter',
      },
      {
        text: 'Nazwa zadania',
        value: 'name',
      },
      {
        text: 'Termin oddania',
        value: 'deadline',
        align: 'center'
      },
      {
        text: '',
        align: 'center',
        sortable: false,
        width: 50
      },
    ];

    mounted(){
        this.fetchMyHomework();
    }

    showExercise(ex){
      this.focusedExercise = ex;
      //@ts-ignore
      if(this.$refs.ex) this.$refs.ex.reset();
      this.showDialog = true;
    }

    async fetchMyHomework(){
      this.loading = true;
      this.exercises = [];
      await this.user.fetchGroups();
      for(const group of this.user.groups){
        const homeworkRes = await this.$api.groups.$getHomeworksOfThisGroupWhichAreAssignedToCurrentUser({
          groupId: group.id
        });

        for(const homework of homeworkRes.items){
          const myAnswer = await this.$api.homeworks.$getHomeworkWithAnswersOfCurrentUser(homework.id);
          for(const exercise of homework.exercises){
            this.exercises.push({
              status: myAnswer.exercisesToAnswers[exercise.id] !== null,
              userAnswer: myAnswer.exercisesToAnswers[exercise.id],
              groupName: group.code,
              deadline: homework.deadline,
              homeworkId: homework.id,
              ...exercise,
            })
          }
        }

      }
      const withoutAnswer = this.exercises.filter(el => el.status === false);
      const withAnswer = this.exercises.filter(el => el.status === true);
      this.exercises = [...withoutAnswer, ...withAnswer];
      this.loading = false;
    }


    async sendAnswer(payload){
      this.showDialog = false;
      await this.$api.homeworks.commitAnswersToHomework({
        //@ts-ignore
        homeworkId: this.focusedExercise.homeworkId,
        request: payload
      });
      this.fetchMyHomework();
    }

  }
</script>
