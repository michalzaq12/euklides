<template>
    <div class="main__container">
        <loader :active="isLoading"></loader>
        <span>{{group.code}}</span>

        <div class="content__container">
            <div class="students">
                <v-card>
                    <v-toolbar dark color="primary" class="mb-2 py-3">
                        <v-icon>people</v-icon>
                        <v-toolbar-title>Lista studentów</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon @click.stop="$refs.addUserToGroup.open(group)">
                            <v-icon>add</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-data-table :items="group.students" :headers="headers.student">
                            <template v-slot:items="props">
                                <td>
                                    <v-btn icon>
                                        <v-icon color="grey lighten-1">post_add</v-icon>
                                    </v-btn>
                                </td>
                                <td>{{ props.item.firstName }}</td>
                                <td>{{props.item.lastName}}</td>
                                <td>
                                    <v-btn icon @click="removeUserFromGroup(props.item.id)">
                                        <v-icon color="grey lighten-1">delete</v-icon>
                                    </v-btn>
                                </td>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </div>

            <div class="tasks__container">
                <v-card>
                    <v-toolbar dark color="primary" class="mb-2 py-3">
                        <v-icon>list</v-icon>
                        <v-toolbar-title>Lista prac domowych</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-data-table
                            :headers="headers.homework"
                            :items="homework"
                            item-key="id"
                            :rows-per-page-items="[10,20,50]"
                        >
                            <template #items="props">
                                <tr @click="props.expanded = !props.expanded">
                                    <td>{{props.item.id}}</td>
                                    <td class="text-xs-center">{{new Date(props.item.deadline).toLocaleString()}}</td>
                                    <td>
                                        <v-icon v-if="props.expanded">keyboard_arrow_up</v-icon>
                                        <v-icon v-else>keyboard_arrow_down</v-icon>
                                    </td>
                                </tr>
                            </template>
                            <template #expand="props">
                                <v-card flat class="exercises__table" color="grey lighten-1">
                                    <v-card-title>Lista zadań:</v-card-title>
                                    <v-card-text>
                                        <v-data-table
                                            :headers="headers.exercise"
                                            :items="props.item.exercises"
                                            item-key="id"
                                            :rows-per-page-items="[10,20,50]"
                                        >
                                            <template #items="props2">
                                                <tr @click="props2.expanded = !props2.expanded; fetchAnswers(props.item.id, props2.item.id)">
                                                    <th class="text-xs-center">
                                                        <v-menu open-on-hover offset-x>
                                                            <template #activator="{ on }">
                                                                <v-btn icon outline color="info" v-on="on">
                                                                    <v-icon>search</v-icon>
                                                                </v-btn>
                                                            </template>
                                                            <!--                                        <exercise :exercise="props.item"></exercise>-->
                                                        </v-menu>
                                                    </th>
                                                    <td>{{props2.item.chapter || '-'}}</td>
                                                    <td class="font-weight-bold">{{ props2.item.name }}</td>
                                                    <td>
                                                        <v-icon v-if="props2.expanded">keyboard_arrow_up</v-icon>
                                                        <v-icon v-else>keyboard_arrow_down</v-icon>
                                                    </td>
                                                </tr>
                                            </template>
                                            <template #expand="props2">
                                                <v-card flat class="answers__table">
                                                    <v-card-text>
                                                        <v-card-title>Lista przesłanych rozwiązań:</v-card-title>
                                                        <v-data-table :items="props2.item.answers" :headers="headers.studentAnswer" :loading="isLoadingAnswers">
                                                            <template #items="props3">
                                                                <td>{{ props3.item.firstName }}</td>
                                                                <td>{{props3.item.lastName}}</td>
                                                                <td><v-btn flat color="primary">Sprawdź</v-btn></td>
                                                            </template>
                                                        </v-data-table>
                                                    </v-card-text>
                                                </v-card>
                                            </template>
                                        </v-data-table>
                                    </v-card-text>
                                </v-card>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </div>

        </div>
        <add-user-to-group ref="addUserToGroup" @refresh="fetchData"></add-user-to-group>
    </div>
</template>


<script lang="ts">
  import {Component, Vue} from "~/decorators";
  import {UserStore} from "~/store/user";
  import ExSoruce from '~/components/panel/ExSource.modal.vue';
  import ExChooser from '~/components/panel/ExChooser.modal.vue';
  import Timeline from '~/components/panel/Timeline.vue';
  import Group from '~/components/panel/Group.modal.vue';
  import AddUserToGroup from '~/components/user/AddUserToGroup.modal.vue';
  import {studentHeaders, homeworkHeaders, exerciseHeaders, studentAnswerHeaders} from './headers';

  @Component({
    layout: 'app',
    head: {title: 'Klasa'},
    components: {ExSoruce, ExChooser, Timeline, Group, AddUserToGroup}
  })
  export default class extends Vue {
    isLoading = true;
    isLoadingAnswers = true;
    user = UserStore.CreateProxy( this.$store, UserStore );

    rowsPerPageItems = [5, 10, 20];
    pagination =  {
      rowsPerPage: 5
    };

    headers = {
      student: studentHeaders,
      homework: homeworkHeaders,
      exercise: exerciseHeaders,
      studentAnswer: studentAnswerHeaders
    };

    group = {};
    homework = [];

    mounted(){
      this.fetchData();
    }

    get groupId(){
        return this.$route.params.id;
    }

    private async fetchAnswers(homeworkId, exId){
      this.isLoadingAnswers = true;
      const res = await this.$api.homeworks.$getHomeworkWithAnswersGroupedByStudent(homeworkId);
      console.log(res);
      const students = res.studentsWithAnswersToHomework;
      for(const student of students){
        //@ts-ignore
        student.answer = student.exercisesToAnswers[exId];
      }
      console.log(students);
      const homework = this.homework.find(x => x.id === homeworkId);
      const ex = homework.exercises.find(ex => ex.id === exId);
      ex.answers = students;
      this.isLoadingAnswers = false;
    }

    private async fetchData(){
      this.isLoading = true;
      this.group = await this.$api.groups.$getGroupById(this.groupId);
      const homeworkRes = await this.$api.groups.$getAllHomeworksOfThisGroup({
        groupId: this.groupId,
        pageNumber: 0,
        pageSize: 1000
      });
      this.homework = homeworkRes.items;
      this.isLoading = false;
    }

    private async removeUserFromGroup(userId: string){
      await this.$api.groups.$removeStudentFromGroup({
        groupId: this.groupId,
        userId: userId
      })
      this.fetchData();
    }

  }
</script>


<style lang="scss">
    .content__container {
        display: flex;
        margin: 20px;

        & > div {
            margin: 10px;
        }
    }

    .students{
        width: 30%;
    }

    .tasks__container {
        width: 70%;
    }

    .exercises__table{
        //background-color: #7f7f7f !important;
    }

    .answers__table {
        //background-color: red !important;
    }

</style>
