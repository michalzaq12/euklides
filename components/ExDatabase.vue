<template>
    <div>
        <v-data-table
            v-model="selected"
            :headers="headers"
            :items="desserts"
            :pagination.sync="pagination"
            :total-items="totalDesserts"
            :loading="loading"
            item-key="id"
            class="elevation-1"
            select-all
        >
            <template #items="props">
                <tr :active="props.selected" @click="props.selected = !props.selected">
                    <td class="text-xs-right">{{props.item.id}}</td>
                    <td>{{props.item.class}}</td>
                    <td>{{props.item.chapter}}</td>
                    <td>{{ props.item.name }}</td>
                    <th class="text-xs-center">
                        <v-btn icon outline color="info" @mouseenter="() => {viewer = true; hovered = props.item.id}" @mouseleave="viewer = false">
                            <v-icon>search</v-icon>
                        </v-btn>
                    </th>
                    <th class="text-xs-center">
                        <v-checkbox
                            :input-value="props.selected"
                            color="primary"
                            hide-details
                        ></v-checkbox>
                    </th>
                </tr>
            </template>
        </v-data-table>


        <v-fade-transition>
            <div v-if="viewer" class="exercise__viewer" @click="viewer = false">
                <loader :active="true"></loader>

                <v-card v-if="hovered && !loading" width="80%">
                    <v-toolbar dark color="primary" class="mb-2">
<!--                        <v-toolbar-title>{{desserts.find(el => el.id = hovered).name}}</v-toolbar-title>-->
                    </v-toolbar>

                    <v-card-text class="pa-4">
<!--                        {{desserts.find(el => el.id = hovered)}}-->
                    </v-card-text>
                </v-card>
            </div>
        </v-fade-transition>

    </div>
</template>


<script>
    export default {
        data () {
            return {
                viewer: false,
                totalDesserts: 0,
                desserts: [],
                loading: true,
                selected: [],
                hovered: null,
                pagination: {},
                headers: [
                    { text: 'ID', align: 'right'},
                    {
                        text: 'Klasa',
                        align: 'left',
                        sortable: false,
                        value: 'class'
                    },
                    { text: 'Dział', value: 'chapter' },
                    { text: 'Nazwa zadania', value: 'name' },
                    { text: 'Podgląd', align: 'center', sortable: false},
                    { text: 'Wybierz', align: 'center', sortable: false},
                ]
            }
        },
        watch: {
            pagination: {
                handler () {
                    this.getDataFromApi()
                        .then(data => {
                            this.desserts = data.items
                            this.totalDesserts = data.total
                        })
                },
                deep: true
            }
        },
        mounted () {
            this.getDataFromApi()
                .then(data => {
                    this.desserts = data.items
                    this.totalDesserts = data.total
                })
        },
        methods: {
            getDataFromApi () {
                this.loading = true
                return new Promise((resolve, reject) => {
                    const { sortBy, descending, page, rowsPerPage } = this.pagination

                    let items = this.getDesserts()
                    const total = items.length

                    if (this.pagination.sortBy) {
                        items = items.sort((a, b) => {
                            const sortA = a[sortBy]
                            const sortB = b[sortBy]

                            if (descending) {
                                if (sortA < sortB) return 1
                                if (sortA > sortB) return -1
                                return 0
                            } else {
                                if (sortA < sortB) return -1
                                if (sortA > sortB) return 1
                                return 0
                            }
                        })
                    }

                    if (rowsPerPage > 0) {
                        items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
                    }

                    setTimeout(() => {
                        this.loading = false
                        resolve({
                            items,
                            total
                        })
                    }, 1000)
                })
            },
            getDesserts () {
                return [
                    {
                        id: 1,
                        class: 4,
                        chapter: 'Ułamki',
                        name: 'Proste dodawanie',
                        content: `Antek dostaje kieszonkowe od swoich rodziców i chce zaoszczędzić na kupno roweru.
                            Dostaje 15 złotych tygodniowo, rower kosztuje 750 złotych. W ile tygodni Antek uzbiera pieniądze na rower?`
                    },
                    {
                        id: 2,
                        class: 4,
                        chapter: 'Ułamki',
                        name: 'Proste odejmowania',
                        content: `dgfdfg`
                    }
                ]
            }
        }
    }
</script>


<style lang="scss">
    table.v-table thead tr th {
        font-size: 22px;
    }
    table.v-table tbody tr td {
        font-size: 20px;
    }

    .exercise__viewer {
        z-index: 1000;
        background-color: rgba(var(--v-primary-base), 0.9);
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 50vw;
        min-width: 200px;

        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
