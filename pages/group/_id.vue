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
                        <v-btn icon @click.stop="$refs.addUserToGroup.open(group.id)">
                            <v-icon>add</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-data-table :items="group.students" :search="search" :headers="headers">
                            <template v-slot:items="props">
                                <td>
                                    <v-btn icon>
                                        <v-icon color="primary">person</v-icon>
                                    </v-btn>
                                </td>
                                <td>{{ props.item.firstName }}</td>
                                <td>{{props.item.lastName}}</td>
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
                            :headers="headers"
                            :items="exercises"
                            item-key="guid"
                            :rows-per-page-items="[10,20,50]"
                        >
                            <template #items="props">
                                <tr @click="props.expanded = !props.expanded; fetchAnswers(props.item.homeworkId, props.item.id)">
                                    <td>{{props.item.groupName}}</td>
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
                                    <td>{{props.item.chapter || '-'}}</td>
                                    <td class="font-weight-bold">{{ props.item.name }}</td>
                                    <td class="text-xs-center">{{new Date(props.item.deadline).toLocaleString()}}</td>
                                    <td>
                                        <v-icon v-if="props.expanded">keyboard_arrow_up</v-icon>
                                        <v-icon v-else>keyboard_arrow_down</v-icon>
                                    </td>
                                </tr>
                            </template>
                            <template #expand="props">
                                <v-card flat>
                                    <v-card-text>
                                        <v-data-table :items="props.item.answers" :headers="headers" :loading="isLoadingAnswers">
                                            <template v-slot:items="props2">
                                                <td>{{ props2.item.firstName }}</td>
                                                <td>{{props2.item.lastName}}</td>
                                                <td><v-btn>Sprawdź</v-btn></td>
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
  import AddUserToGroup from '~/components/panel/AddUserToGroup.modal.vue';

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

    headers = [
      {
        text: '',
        align: 'center',
        sortable: false,
        width: 50
      },
      {
        text: 'Imię',
        value: 'firstName',
      },
      {
        text: 'Nazwisko',
        value: 'lastName',
      }
    ];

    group = {};
    exercises = [];

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
        student.answer = student.exercisesToAnswers[exId];
      }
      console.log(students);
      const ex = this.exercises.find(ex => ex.id === exId);
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
      console.log(homeworkRes);
      for(const homework of homeworkRes.items){
        for(const exercise of homework.exercises){
          this.exercises.push({
            guid: homework.id + exercise.id,
            deadline: homework.deadline,
            homeworkId: homework.id,
            ...exercise,
          })
        }
      }
      this.isLoading = false;
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

</style>
