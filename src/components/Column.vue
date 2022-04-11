<script lang="ts">
import { defineComponent, ref, computed, reactive } from 'vue';
import Card from './Card.vue';
import CircleButton from './CircleButton.vue';
import SquareButton from './SquareButton.vue';
import { BUTTON_TYPES } from '../modules/models';
import Modal from './Modal.vue';

export default defineComponent({
    props: {
        info: {
            type: Object,
            required: true
        },
    },
    components: {
        Card,
        CircleButton,
        SquareButton,
        Modal
    },
    setup(props, context) {
        interface Card {
            id: string,
        };

        enum STATE {
            INITIALIZE,
            WORKING,
        };

        const cards = ref<Card[]>([]);
        const title = ref<string>('');
        const state = ref<STATE>(STATE.INITIALIZE);
        const isEditable = ref<boolean>(false);
        const isAddingCard = ref<boolean>(false);
        const showModal = ref<boolean>(false);

        const handleDeleteCard = (id: string): void => {
            cards.value = cards.value.filter(card => card.id !== id);
        }

        const handleAddCard = (): void => {
            const newId = cards.value.length.toString();
            cards.value.push({id: newId});
            isAddingCard.value = true;
        }

        const createColumn = (): void => {
            state.value = STATE.WORKING;
            context.emit('created');
        }

        const handleDeleteColumn = (): void => {
            context.emit('delete', props.info.id);
        }

        return { STATE, BUTTON_TYPES, cards, state, title, isEditable, isAddingCard, showModal, handleDeleteCard, handleAddCard, createColumn, handleDeleteColumn };
    },
})
</script>

<template>
    <div class="rounded-md bg-gray-200 w-72 px-2 py-4 self-start mr-4">
        <div v-if="state === STATE.WORKING">
            <div class="flex items-center justify-between pb-4">
                <h2 class="font-bold text-md hover:cursor-pointer">
                    <p class="" v-show="!isEditable" @click="isEditable = true">{{ title }}</p>
                    <input type="text" v-show="isEditable" v-model="title" @keyup.enter="isEditable = false">
                </h2>
                <button @click="showModal = true">delete</button>
            </div>

            <div class="pb-6">
                <Card v-for="card in cards" :key="card.id" :info="card" @delete="handleDeleteCard" @fin-edit="isAddingCard = false" />
            </div>

            <square-button @click="handleAddCard" v-if="!isAddingCard">+ Add More Card</square-button>
        </div>
        <div v-else-if="state === STATE.INITIALIZE">
            <input 
                type="text" placeholder="Add Title"
                v-model="title"
                class="mb-2 px-2 py-2 w-full rounded"
                @keyup.enter="createColumn">
            <div class="flex align-center justify-end">
                <circle-button @_click="createColumn" :mode="BUTTON_TYPES.OK" />
                <circle-button @_click="handleDeleteColumn" :mode="BUTTON_TYPES.NO" />
            </div>
        </div>
    </div>

    <Teleport to="body">
        <modal :show="showModal" @agree="handleDeleteColumn" @reject="showModal = false">
            <template #body>
                Are you sure want to delete this list?
            </template>
        </modal>
    </Teleport>
</template>