<template>
     <div class="addresses abc">
        <div class="address-header">
            <span class="address-title">Addresses</span>
            <AppButton @click="addAddress" theme="primary">New address</AppButton>
        </div>
         <div class="address abc1" v-for="(address, addressIndex) in addresses" :key="addressIndex">
            <Field :label="`Address ${addressIndex+1}`">
                <div class="field-input">
                    <input class="input" v-model="address.address" />
                    <AppButton @click="deleteAddress(addressIndex)" theme="red">Delete</AppButton>
                </div>
            </Field>
        </div>
     </div>
</template>

<script>
    import AppButton from '@/components/AppButton.vue'
    import Field from '@/components/Field.vue'
    export default {
        name: 'Address',
        components: {
            AppButton
        },
        props: {
            addresses: {
                type: Array,
                default: () => []
            },
        },
        methods: {
            addAddress() {
                this.addresses.push({
                    street: 'new'
                })
            },
            deleteAddress(index) {
                this.addresses.splice(index, 1)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .contact-panel {
        .addresses {
            padding: 16px;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            .address-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 8px;
                .address-title {
                    font-size: 16px;
                    font-weight: 500;
                }
            }
            .address {
                margin-bottom: 24px;
                .field-input {
                    display: flex;
                    align-items: center;
                    .input {
                        margin-right: 8px;
                    }
                }
            }
        }
    }

</style>