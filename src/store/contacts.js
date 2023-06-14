import axios from 'axios'
import _ from 'lodash'

// initial state
const state = () => ({
    contacts: [],
})

// getters
const getters = {}

// actions
const actions = {
    fetchContacts({ commit }) {
        return axios.get('/contacts.json')
            .then(({ data }) => {
                commit('setContacts', data)
            })
    },
    addContact({ commit }, contact) {
        commit('addContact', {
            id: _.uniqueId(),
            ...contact
        })
    }
}

// mutations
const mutations = {
    setContacts(state, contacts) {
        state.contacts = contacts
    },
    addContact(state, contact) {
        state.contacts.push(contact)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}