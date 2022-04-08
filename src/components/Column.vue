<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue';
import { Column } from '../modules/models';
import Card from './Card.vue';

export default defineComponent({
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    components: {
        Card,
    },
    setup(props, context) {
        const cards = ref<string[]>(['Hello, World!']);
        const titleEditable = ref<boolean>(false);
        const localTitle = computed({
            get: () => { return props.data.title },
            set: (newTitle) => { context.emit('update', newTitle, props.data.pos) }
        });
        const inputRef = ref<HTMLInputElement | null>(null);

        const updateTitle = ():void => {
            if (inputRef.value === null) return;
            localTitle.value = inputRef.value.value;
            exitEdit();
        }
        
        const edit = ():void => {
            titleEditable.value = true;
        }

        const exitEdit = ():void => {
            titleEditable.value = false;
        }

        return { cards, titleEditable, localTitle, inputRef, updateTitle, edit, exitEdit };
    },
})
</script>

<template>
    <div class="rounded-md bg-gray-200 w-72 px-2 py-4">
        <div class="flex items-center justify-between pb-4">
            <h2 class="font-bold text-md hover:cursor-pointer">
                <p class="" v-show="!titleEditable" @click="edit">{{ localTitle }}</p>
                <input type="text" v-show="titleEditable" :value="localTitle" @keyup.enter="updateTitle" ref="inputRef">
            </h2>
            <button>ゴミ箱アイコン</button>
        </div>

        <div class="pb-6">
            <Card v-for="(card, index) in cards" :key="index" />
        </div>

        <button>+ Add More Card</button>
    </div>
</template>