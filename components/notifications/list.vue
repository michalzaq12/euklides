<template>
    <div>
        <v-list two-line style="min-width: 400px;">

            <v-subheader class="subheading">Powiadomienia</v-subheader>

            <template v-for="(item, index) in notifications">

                <v-list-tile
                    :key="item.id"
                    ripple
                    @click="onClick(item)"
                >

                    <v-list-tile-content>


                        <v-list-tile-title class="font-weight-bold">
                            <span v-if="item.type === 'HOMEWORK_ANSWER_COMMITTED'">Przesłano nową odpowiedź</span>
                            <span v-else-if="item.type === 'HOMEWORK_CHECKED'">Oceniono zadanie</span>
                            <span v-else>Zadano nowe zadania</span>
                        </v-list-tile-title>


                        <v-list-tile-sub-title class="grey--text">
                            <span>Kliknij aby zobaczyć szczegóły</span>
                        </v-list-tile-sub-title>

                    </v-list-tile-content>

                    <v-list-tile-action>
                        <v-list-tile-action-text>{{item.createDateTime | date}}</v-list-tile-action-text>

                        <v-btn icon @click.stop="markAsRead(item)">
                            <v-icon>check</v-icon>
                        </v-btn>
                    </v-list-tile-action>



                </v-list-tile>


                <v-divider
                    v-if="index !== (notifications.length - 1)"
                    :inset="true"
                ></v-divider>


            </template>
        </v-list>

    </div>
</template>

<script>
    import moment from 'moment';
    export default {
        name: "notifications-list",
        data(){
            return {
                notifications: []
            }
        },
        filters: {
            date(date){
                date = moment(date).toDate();
                const days = moment().diff(date, 'days');
                const hours = moment().diff(date, 'hours');
                const minutes = moment().diff(date, 'minutes');
                if(days > 0) return days + 'd ';
                if(hours > 0) return hours + 'h ';
                else if(minutes > 0) return minutes + 'm ';
                else return 'now';
            },
        },
        computed: {
            userRole(){
                return this.$store.getters['user/role'];
            }
        },
        methods: {
            fetchNotifications(){
                this.$api.notifications.$getAllNotificationsOfUser({
                    pageNumber: 0,
                    pageSize: 10
                }).then(data => {
                    this.notifications = [];
                    this.notifications = data.items.filter(el => el.readDateTime === null);
                    this.$emit('notifications-count', this.notifications.length);
                })
            },
            onClick(notification){
                if(this.userRole === 'STUDENT'){
                    this.$router.push('/zadania-domowe');
                }else if(this.userRole === 'TEACHER'){
                    this.$router.push('/group/' + notification.groupId);
                }
            },
            markAsRead(notification){
                this.$api.notifications.$markNotificationAsRead(notification.id).then(() => {
                    this.fetchNotifications();
                })
            }
        },
        mounted(){
            this.fetchNotifications();
            //this.notificationInterval = window.setInterval(this.fetchNotifications, 10000);
        },
        beforeDestroy(){
            //window.clearInterval(this.notificationInterval);
        },
    }
</script>
