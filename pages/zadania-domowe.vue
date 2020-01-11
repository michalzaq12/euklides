<template>
    <div>
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
                    <td class="text-xs-center">{{new Date(props.item.deadline).toLocaleString()}}</td>
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
    focusedExercise = null;
    showDialog = false;

    loading = false;
    headers = [];

    mounted(){
        this.fetchMyHomework();
    }

    showExercise(ex){
      this.focusedExercise = ex;
      if(this.$refs.ex) this.$refs.ex.reset();
      this.showDialog = true;
    }

    async fetchMyHomework(){
      this.loading = true;
      await this.user.fetchGroups();
      for(const group of this.user.groups){
        const homeworkRes = await this.$api.groups.$getHomeworksOfThisGroupWhichAreAssignedToCurrentUser({
          groupId: group.id
        });

        for(const homework of homeworkRes.items){
          for(const exercise of homework.exercises){
            this.exercises.push({
              groupName: group.code,
              deadline: homework.deadline,
              homeworkId: homework.id,
              ...exercise,
            })
          }
        }

      }
      this.loading = false;
      console.log(this.exercises);
    }


    async sendAnswer(payload){
      this.showDialog = false;
      await this.$api.homeworks.commitAnswersToHomework({
        homeworkId: this.focusedExercise.homeworkId,
        request: payload
      });
    }

  }
</script>
