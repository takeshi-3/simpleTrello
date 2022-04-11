<template>
    <button
        @click="emitClickEvent"
        class="transition px-3 py-2 text-sm rounded border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white">
        <slot></slot>
    </button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup(props, context) {
        const emitClickEvent = (): void => {
            context.emit('_click');
        };

        return {emitClickEvent};
    },
})
</script>
