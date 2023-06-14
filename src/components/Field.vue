<template>
    <div class="field">
        <label>{{label}}</label>
        <slot>
            <div v-if="!isEmpty">
                {{ value }}
            </div>
            <div v-else class="is-empty">
                Empty
            </div>
        </slot>
    </div>
</template>

<script>
    import _ from 'lodash'

    export default {
        name: 'Field',
        props: {
            label: String,
            value: String,
        },
        computed: {
            isEmpty() {
                return _.isEmpty(this.value)
            }
        }
    }
</script>


<style lang="scss" scoped>
    .field {
        display: block;
        margin-bottom: 24px;
        label {
            font-size: 12px;
            font-weight: 500;
            display: block;
            color: #4b5563;
            margin: 0;
        }
        div {
            font-size: 14px;
            margin: 0;
            font-weight: 500;
            &.is-empty {
                color: #9ca3af;
                font-style: italic
            }
         }
    }
</style>