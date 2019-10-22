<template>
    <div>
        <loader :active="isLoading" dark/>
        <student-panel v-if="user.role === 'STUDENT'"/>
        <teacher-panel v-else-if="user.role === 'TEACHER'" />
        <div v-else>ADMIN</div>
    </div>
</template>



<script lang="ts">
  import { Component, Vue } from "~/decorators";
  import {UserStore} from "~/store/user";
  import StudentPanel from './student.component.vue';
  import TeacherPanel from './teacher.component.vue';

  @Component({
    layout: 'app',
    head: {title: 'Panel'},
    components: {StudentPanel, TeacherPanel}
  })
  export default class extends Vue {
    isLoading = true;
    user = UserStore.CreateProxy( this.$store, UserStore );

    mounted(){
      this.isLoading = true;
      this.user.fetch().finally(() => {
        this.isLoading = false;
      })
    }
  }
</script>
