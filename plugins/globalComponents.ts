import Vue from 'vue'
import moment from "moment";


// FILTERS

Vue.filter('date', function (value) {
    if (!value) return null;
    return moment(value).format('DD/MM/YYYY HH:mm');
});

Vue.filter('dateonly', function (value) {
    if (!value) return null;
    return moment(value).format('DD / MM / YYYY');
});


// COMPONENTS

import Loader from '~/components/helpers/Loader.vue';
Vue.component('loader', Loader);
