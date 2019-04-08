import Vue from 'vue'


// @ts-ignore
export default ({ app }, inject) => inject('eventBus', new Vue())

