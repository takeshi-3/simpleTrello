<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue';
import Card from './Card.vue';

export default defineComponent({
    props: {
        info: {
            type: Object,
            required: true
        }
    },
    components: {
        Card,
    },
    setup(props, context) {
        interface Card {
            id: string,
        };
        const cards = ref<Card[]>([{id: '0'}, {id: '1'}]);
        const title = ref<string>('Introduction');
        const titleEditable = ref<boolean>(false);

        const updateTitle = ():void => {
            exitEdit();
        }
        
        const edit = ():void => {
            titleEditable.value = true;
        }

        const exitEdit = ():void => {
            titleEditable.value = false;
        }

        const handleCardDelete = (id: string): void => {
            cards.value = cards.value.filter(card => card.id !== id);
        }

        const handleAddCard = (): void => {
            const newId = cards.value.length.toString();
            cards.value.push({id: newId});
        }

        return { cards, titleEditable, title, updateTitle, edit, exitEdit, handleCardDelete, handleAddCard };
    },
})
</script>

<template>
    <div class="rounded-md bg-gray-200 w-72 px-2 py-4">
        <div class="flex items-center justify-between pb-4">
            <h2 class="font-bold text-md hover:cursor-pointer">
                <p class="" v-show="!titleEditable" @click="edit">{{ title }}</p>
                <input type="text" v-show="titleEditable" v-model="title" @keyup.enter="titleEditable = false">
            </h2>
            <button>ゴミ箱アイコン</button>
        </div>

        <div class="pb-6">
            <Card v-for="card in cards" :key="card.id" :info="card" @delete="handleCardDelete" />
        </div>

        <button @click="handleAddCard">+ Add More Card</button>
    </div>
</template>