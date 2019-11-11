<template>
    <div>
        <v-data-table
            v-if="viewType === 0"
            v-model="selected"
            :headers="headers"
            :items="exercises"
            :pagination.sync="pagination"
            :total-items="totalExercises"
            :loading="loading"
            item-key="id"
            class="elevation-1"
            :select-all="selectionMode"
            :rows-per-page-items="[10,20,50]"
        >
            <template #items="props">
                <tr :active="props.selected" @click="props.selected = !props.selected">
                    <th v-if="selectionMode" class="text-xs-center">
                        <v-checkbox
                            :input-value="props.selected"
                            color="primary"
                            hide-details
                        ></v-checkbox>
                    </th>
                    <th class="text-xs-center">
                        <v-menu
                            open-on-hover

                            offset-x
                        >
                            <template #activator="{ on }">
                                <v-btn icon outline color="info" v-on="on">
                                    <v-icon>search</v-icon>
                                </v-btn>
                            </template>

                            <exercise :exercise="props.item"></exercise>

                        </v-menu>
                    </th>
                    <td class="py-3 text-xs-center">
                        <v-avatar class="info" size="30" :class="{
                            'darken-2': props.item.class === 4,
                            'darken-3': props.item.class === 5,
                            'darken-4': props.item.class === 6,
                        }"><span class="white--text body-2">{{props.item.class}}</span></v-avatar>
                    </td>
                    <td>{{props.item.chapter || '-'}}</td>
                    <td class="font-weight-bold">{{ props.item.name }}</td>
                    <td class="text-xs-center">
                        <v-chip color="grey" text-color="grey" outline>
                            <v-avatar>
                                <v-icon>account_circle</v-icon>
                            </v-avatar>
                            {{props.item.createdBy.firstName + ' ' + props.item.createdBy.lastName}}
                        </v-chip>
                    </td>
                    <td class="text-xs-center">{{new Date(props.item.creationDateTime).toLocaleString()}}</td>
                    <td class="justify-center layout px-0 align-center fill-height">
                        <v-icon small class="mr-2" @click="">
                            edit
                        </v-icon>
                        <v-icon small @click="deleteExercise(props.item.id)">
                            delete
                        </v-icon>
                    </td>
                </tr>
            </template>
        </v-data-table>
        <div v-else >
            <div style="display: flex; flex-wrap: wrap">
                <exercise v-for="ex in exercises" :key="ex.id" :exercise="ex" class="ma-2"></exercise>
            </div>

            <div class="text-xs-center pt-2">
                <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
            </div>
        </div>


        <v-fade-transition>
            <div v-show="viewer" class="exercise__viewer" @click="viewer = false">
                <loader :active="loading"></loader>
                <exercise v-if="hoveredExercise && !loading" :exercise="hoveredExercise" width="80%"></exercise>
            </div>
        </v-fade-transition>

    </div>
</template>


<script>
    import Exercise from '~/components/Exercise.vue';
    export default {
        components: {Exercise},
        props: {
            selectionMode: {
                type: Boolean,
                default: false
            },
            view: {
                type: Number,
                default: 0
            },
            value: {
                type: Array
            }
        },
        data () {
            return {
                viewType: this.view,
                viewer: false,
                totalExercises: 0,
                exercises: [],
                loading: true,
                selected: [],
                hoveredExercise: null,
                pagination: {},
                headers: [
                    {
                        text: 'Podgląd',
                        align: 'center',
                        sortable: false,
                        width: 50
                    },
                    {
                        text: 'Klasa',
                        align: 'center',
                        value: 'class',
                        width: 50
                    },
                    { text: 'Dział', value: 'chapter' },
                    { text: 'Nazwa zadania', value: 'name' },
                    {
                        text: 'Autor',
                        sortable: false,
                        align: 'center'
                    },
                    {
                        text: 'Data dodania',
                        value: 'creationDateTime',
                        align: 'center'
                    },
                    {
                        text: '',
                        value: 'id',
                        sortable: false
                    }
                ]
            }
        },
        computed: {
            pages () {
                if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) return 0;
                return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
            }
        },
        watch: {
            pagination: {
                handler () {
                    console.log('watch pagination');
                    this.fetchExercise();
                },
                deep: true
            },
            view(newVal){
                this.viewType = newVal;
            },
            selected(newVal){
                this.$emit('input', newVal);
            }
        },
        mounted () {
           this.fetchExercise();
        },
        methods: {
            fetchExercise(){
                this.loading = true;
                this.$api.exercises.$getPageOfExercisesWithItsAuthors({
                    pageNumber: (this.pagination.page - 1),
                    pageSize: this.pagination.rowsPerPage,
                    sort: this.pagination.sortBy
                })
                    .then(res => {
                        this.exercises = res.items;
                        this.pagination.totalItems = res.totalItemCount;
                    }).finally(() => {
                    this.loading = false;
                })
            },
            deleteExercise(id){
                this.loading = true;
                this.$api.exercises.$deleteExercise(id)
                    .then(() => this.fetchExercise())
                    .finally(() => this.loading = false)
            }
        }
    }
</script>


<style lang="scss">
    /*table.v-table thead tr th {*/
    /*    font-size: 22px;*/
    /*}*/
    /*table.v-table tbody tr td {*/
    /*    font-size: 20px;*/
    /*}*/

    .exercise__viewer {
        z-index: 1000;
        background-image: url('/icon.png'), linear-gradient(rgba(white, 0) 0%, white 40%, rgba(white, 0) 100%);
        background-repeat: round;
        position: fixed;
        top: 20%;
        bottom: 20%;
        left: 50%;
        /*height: 100vh;*/
        width: 50vw;
        min-width: 200px;

        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
