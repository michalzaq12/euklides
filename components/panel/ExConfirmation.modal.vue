<template>
    <v-dialog v-model="dialog" max-width="600" persistent>
        <v-card>

            <v-toolbar dark color="primary" class="mb-2" flat>
                <v-toolbar-title>Potwierdzenie wysłania zadania domowego</v-toolbar-title>
            </v-toolbar>

            <v-card-text>
                <div class="information__box pa-4">
                    <div>
                        <v-icon size="50" color="primary">check_circle_outline</v-icon>
                    </div>
                    <div class="ml-4">
                        <div>
                            Pomyślnie wysłano nowe zadanie dla
                            <span v-if="isGroup">podanej klasy:</span>
                            <span v-else>podanych uczniów:</span>
                        </div>
                        <div>
                            <span v-if="isGroup">{{target.code}}</span>
                            <span v-else>{{target.firstName}} {{target.lastName}}</span>
                        </div>
                    </div>
                </div>
                <v-divider class="mt-2"></v-divider>
                <div class="text-xs-center primary--text subtitle-1 mt-4 mb-2 link"
                     @click="dialog = false; $emit('close-parent')">
                    WRÓĆ DO PULPITU
                </div>
            </v-card-text>

        </v-card>
    </v-dialog>
</template>


<script>
    export default {
        data(){
            return {
                dialog: false,
                target: {},
                isGroup:false
            }
        },
        methods: {
            open(target, isGroup){
                this.dialog = true;
                this.target = target;
                this.isGroup = isGroup;
            }
        }
    }
</script>


<style lang="scss" scoped>
    .information__box {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .link {
        &:hover {
            text-decoration: underline;
        }
        cursor: pointer;
    }
</style>
