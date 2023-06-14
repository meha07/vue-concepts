<template>
    <div class="contact-panel">
        <h2>Edit Contact</h2>
        <Field label="Salutation">
            <input class="input" v-model="salutation" @keypress="onInputChange" />
        </Field>

        <Field label="First name">
            <input class="input" v-model="firstname" @keypress="onInputChange" />
           
        </Field>

        <Field label="Last name">
            <input class="input" v-model="lastname" @keypress="onInputChange" />
        </Field>

        <Address></Address> 
       
    </div>
</template>

<script>
    import _ from 'lodash'

    import Field from '@/components/Field.vue'
    import Address from '@/components/Address.vue'
    import {mapState } from 'vuex'

    export default {
        name: 'ContactForm',
        components: {
            Field,
            Address
        },
        props: {
            salutation: String,
            firstname: String,
            lastname: String,
            selectedContact: Object
        },
        computed: {
            ...mapState('contacts', [
                'contacts'
            ]),
        },
        methods: {
            addAddress() {
                this.addresses.push({
                    street: 'new'
                })
            },
            deleteAddress(index) {
                this.addresses.splice(index, 1)
            },
            onInputChange(evt) {
                const index = this.contacts.findIndex(object => {
                    return object === this.selectedContact;
                });
                console.log(this.contacts);
                this.contacts[index].first_name = this.firstname
                this.contacts[index].last_name = this.lastname
                this.contacts[index].salutation = this.salutation
                this.contacts[index].address = this.addresses
            }
        }
    }
</script>

<style lang="scss" scoped>
    .contact-panel {
        width: 550px;
        padding: 24px;
        h2 {
            font-weight: 600;

        }
    }

</style>