<template>
    <button @click="$emit('click')" :class="`theme-${theme}`">
        <slot />
    </button>
</template>

<script>
    export default {
        name: 'AppButton',
        props: {
            theme: String,
        },
    }
</script>

<style lang="scss" scoped>
    @import '@/scss/common-style.scss';
</style>