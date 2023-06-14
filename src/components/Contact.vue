<template>
    <div class="contact" :class="{'is-selected': selected}" @click="select">
        <div class="header">
            <p class="name">{{contactName}}</p>
             <button class="theme-red" @click="delContact">Delete</button>
        </div>
        <div class="details">
            <Field label="Salutation" :value="contact.salutation" />

            <Field label="First Name" :value="contact.first_name" />

            <Field label="Last Name" :value="contact.last_name" />

            <div class="addresses">
                <div v-for="(address, addressIndex) in contact.addresses" :key="addressIndex">
                    <Field :label="`Address ${addressIndex + 1}`" :value="address.address" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash'
    import {mapState } from 'vuex'

    import AppButton from '@/components/AppButton.vue'
    import Field from '@/components/Field.vue'

    export default {
        name: 'Contact',
        components: {
            AppButton,
            Field,
        },
        props: {
            contact: Object,
            selected: Boolean,
            haveBanner: Boolean
        },
        computed: {
            ...mapState('contacts', [
                'contacts'
            ]),
            contactName() {
                return _.join([this.contact.salutation, this.contact.first_name, this.contact.last_name], ' ')
            }
        },
        methods: {
            select() {
                this.$emit('click', this.contact)
            },
            delContact () {
                const index = this.contacts.findIndex(object => {
                    return object === this.contact;
                });
                this.contacts.splice(index,1);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/scss/common-style.scss';
    .contact {
        background: white;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        margin-bottom: 16px;
        border: 2px solid transparent;
        cursor: pointer;
        &.is-selected {
            border-color: #09f;
        }
        .header {
            padding: 2px 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #e5e7eb;
            p {
                font-weight: 500;
            }
        }
        .details {
            padding: 16px;
        }
    }
</style>