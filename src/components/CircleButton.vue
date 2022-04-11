<template>
    <button
        @click="emitClickEvent"
        v-if="buttonType === BUTTON_TYPES.OK"
        class="transition rounded-full w-8 h-8 text-rose-600 hover:text-white hover:bg-rose-500">
        v
    </button>
    <button
        @click="emitClickEvent"
        v-if="buttonType === BUTTON_TYPES.NO"
        class="transition rounded-full w-8 h-8 text-white bg-cyan-600 hover:bg-cyan-600/50">
        x
    </button>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { BUTTON_TYPES } from '../modules/models';

export default defineComponent({
    props: {
        mode: Object as PropType<BUTTON_TYPES>,
    },
    setup(props, context) {
        const buttonType = ref<BUTTON_TYPES>(props.mode !== (null || undefined) ? props.mode : BUTTON_TYPES.OK);

        const emitClickEvent = (): void => {
            context.emit('_click');
        }

        return {BUTTON_TYPES, buttonType, emitClickEvent}
    },
})
</script>
