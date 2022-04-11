<template>
    <div>
        <button
            @click="emitClickEvent"
            v-if="buttonType === BUTTON_TYPES.OK"
            class="transition rounded-full w-8 h-8 text-blue-600 hover:text-white hover:bg-blue-500">
            v
        </button>
        <button
            @click="emitClickEvent"
            v-if="buttonType === BUTTON_TYPES.NO"
            class="transition rounded-full w-8 h-8 text-white bg-rose-600 hover:bg-rose-600/50">
            x
        </button>
    </div>
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
