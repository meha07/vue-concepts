<template>
    <div class="page-wrapper">
        <div class="container">
             <div class="contacts">
            <div class="header">
                <h2>Contacts</h2>
                <div class="menu">
                    <input v-model="query" class="input" placeholder="Search" />
                    <AppButton theme="primary" @click="newContact">
                        New Contact
                    </AppButton>
                </div>
            </div>
            <Contact
                v-for="(item) in filteredContacts"
                :key="item.id"
                :contact="item"
                :selected="contact && item.id === contact.id "
                @click="setContact"
            />
           
        </div>

        <ContactForm
            v-if="contact"
            :firstname="contact.first_name"
            :lastname="contact.last_name"
            :salutation="contact.salutation"
            :addresses="contact.addresses"
            :selectedContact="contact"
        />
        </div>
       
        <div class="register-wrapper">
            <app-registration @userRegistered="userRegistered" :users="unregisteredUsers"></app-registration>
            <app-registrations @userUnregistered="userUnregistered" :registrations="registrations"></app-registrations>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash'
    import { mapState, mapActions } from 'vuex'

    import Contact from './components/Contact.vue'
    import ContactForm from './components/ContactForm.vue'
    import AppButton from './components/AppButton.vue'
    import Registration from './components/Registration.vue';
    import Registrations from './components/Registrations.vue';
    

    export default {
        name: 'App',
        components: {
            Contact,
            ContactForm,
            AppButton
        },
        data() {
            return {
                contact: {},
                selectedContact: null,
                query: '',
                registrations: [],
                users: [
                    {id: 1, name: 'Test', registered: false},
                    {id: 2, name: 'Test1', registered: false},
                    {id: 3, name: 'Test2', registered: false},
                    {id: 4, name: 'Test3', registered: false}
                ]
            }
        },
        computed: {
            ...mapState('contacts', [
                'contacts'
            ]),
            filteredContacts() {
                if (_.isEmpty(this.query)) {
                    return this.contacts
                }
                return _.filter(this.contacts, (contact) => {
                   let concatQuery = ''
                   if(contact.addresses !== undefined) {
                        for (let i = 0; i < contact.addresses.length; i++) {
                           concatQuery  = _.lowerCase(contact.first_name) + " " + _.lowerCase(contact.last_name) + " " + _.lowerCase(contact.addresses[i].address);
                        }
                    } else {
                        concatQuery = _.lowerCase(contact.first_name) + " " + _.lowerCase(contact.last_name);
                    }
                    return concatQuery && concatQuery.includes(_.lowerCase(this.query));
                })
            },
            unregisteredUsers() {
            return this.users.filter((user) => {
                return !user.registered;
            });
        }
        },
        
        methods: {
            ...mapActions('contacts', [
                'fetchContacts',
                'addContact',
            ]),
            newContact(contact) {
                this.addContact({
                    first_name: 'New',
                    last_name: 'Contact'
                })
                this.$emit('click', this.contact)
            },
            setContact(contact) {
                this.contact = contact
            },
            ///
            userRegistered(user) {
                const date = new Date;
                this.registrations.push({userId: user.id, name: user.name, date: date.getMonth() + '/' + date.getDay()})
            },
            userUnregistered(registration) {
                const user = this.users.find(user => {
                return user.id == registration.userId;
            });
            user.registered = false;
            this.registrations.splice(this.registrations.indexOf(registration), 1);
            }
            ///
        },
        mounted() {
            this.fetchContacts()
        },
        components: {
                appRegistration: Registration,
                appRegistrations: Registrations,
                Contact: Contact,
                ContactForm: ContactForm,
                AppButton: AppButton
            },
    }
</script>

<style lang="scss" scoped>
    .container {
        display: flex;
        height: 100%;
        overflow: hidden;
        .contacts {
            flex: 1 1 0%;
            background: #f3f4f6;
            padding: 40px;
            border-right: 1px solid #d1d5db;
            overflow: auto;
            .header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                h2 {
                    display: block;
                    font-weight: 600;
                    margin-bottom: 32px;
                }
                .menu {
                    display: flex;
                    align-items: center;
                    > * {
                        margin-left: 8px;
                    }
                    button {
                        flex-shrink: 0;
                    }
                }
            }
        }
    }
</style>