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
                            <span>{{item.type}}</span>
                        </v-list-tile-title>


                        <v-list-tile-sub-title class="text--primary">
<!--                            <span v-if="item.type === 'team_join_request'">-->
<!--                              <v-icon :color="item.data.team_membership.confirmed ? 'grey lighten-1' : 'yellow darken-2'">star</v-icon>-->
<!--                              chcedołaczyc-->
<!--                            </span>-->
<!--                                        <span v-else-if="item.type === 'team_membership_approval'">-->
<!--                              <v-icon color="grey lighten-1">verified_user</v-icon>-->
<!--                              doaczył-->
<!--                            </span>-->
<!--                                        <span v-else-if="item.type === 'match_invitation'">-->
<!--                              <v-icon :color="item.data.invitation.status === 'waiting' ? 'yellow darken-2' : 'grey lighten-1'">star</v-icon>-->
<!--                              chec grac-->
<!--                            </span>-->
<!--                                        <span v-else-if="item.type === 'match_invitation_approval'">-->
<!--                              <v-icon color="grey lighten-1">thumb_up</v-icon>-->
<!--                              zaakceprowal-->
<!--                            </span>-->
<!--                                        <span v-else-if="item.type === 'match_invitation_rejection'">-->
<!--                              <v-icon color="grey lighten-1">thumb_down</v-icon>-->
<!--                              odrzucil-->
<!--                            </span>-->
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


<!--        <membership-confirmation ref="membershipConfirmation"/>-->
<!--        <match-invitation ref="matchInvitation" />-->


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
        methods: {
            fetchNotifications(){
                this.$api.notifications.$getAllNotificationsOfUser({
                    pageNumber: 0,
                    pageSize: 100
                }).then(data => {
                    this.notifications = [];
                    this.notifications = data.items;
                    this.$emit('notifications-count', this.notifications.length);
                })
            },
            onClick(notification){
                if(notification.type === 'team_join_request') this.$refs.membershipConfirmation.open(notification);
                else if (notification.type === 'match_invitation') this.$refs.matchInvitation.open(notification);
            },
            markAsRead(notification){
                this.$api.notifications.$markNotificationAsRead(notification.id).then(() => {
                    this.fetchNotifications();
                })
                //this.notifications.splice(this.notifications.indexOf(notification), 1);
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
