<template>
    <v-card v-bind="$attrs">
        <v-toolbar dark color="primary" class="mb-2">
            <span class="headline">{{title}}</span>
        </v-toolbar>

        <v-card-text class="pa-4">
            <span class="title">{{content}}</span>
            <div v-if="type === 'OPEN'">

            </div>
            <div v-else-if="type === 'OPEN_WITH_POINTS'" class="mt-3 body-1">
<!--                <span>{{content}}</span>-->
                <ul>
                    <li v-for="point in exercise.points">
                        {{point.content}} <input />
                    </li>
                </ul>
            </div>
            <div v-else-if="type === 'CLOSED'" class="mt-3 body-1">
<!--                <span>{{content}}</span>-->
                <ul>
                    <li v-for="choice in exercise.choices">
                        {{choice.label}}
                    </li>
                </ul>
            </div>
        </v-card-text>
    </v-card>

</template>


<script>
    export default {
        props: {
            exercise: {
                type: Object,
                required: true
            }
        },
        computed: {
            title(){
              return this.exercise.name
            },
            type(){
                return this.exercise.type
            },
            content(){
                return this.exercise.content
            }
        },
        data(){
            return {

            }
        }
    }
</script>
