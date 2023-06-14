import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import contacts from './contacts'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        contacts,
    },
})