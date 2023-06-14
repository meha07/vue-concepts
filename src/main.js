import Vue from 'vue'

import store from '@/store'

import App from './App.vue'

import './style.css'

new Vue({
    el: '#app',
    store,
    render: h => h(App)
})