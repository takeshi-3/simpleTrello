<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'
import { Card } from '../modules/models';
import CircleButton from './CircleButton.vue';
import SquareButton from './SquareButton.vue';
import { BUTTON_TYPES } from '../modules/models';
import Modal from './Modal.vue';

export default defineComponent({
    props: {
        info: {
            type: Object,
            required: true,
        },
    },
    components: {
        CircleButton,
        SquareButton,
        Modal
    },
    setup(props, context) {
        enum MODES {
            CHANGE,
            DISCARD
        };

        const card: Card = reactive({
            title: '',
            content: ''
        });

        const cardTmp: Card = {...card};

        const state = reactive({
            initialize: true,
            isEditable: true,
        });

        const showModal = ref<boolean>(false);

        const handleEdit = (mode: MODES): void => {
            if (mode === MODES.CHANGE) {
                cardTmp.title = card.title;
                cardTmp.content = card.content;
                if (state.initialize) {
                    state.initialize = false;
                    context.emit('finEdit');
                }
            } else if (mode === MODES.DISCARD) {
                if (state.initialize) {
                    handleDelete();
                    context.emit('fin-edit');
                } else {
                    card.title = cardTmp.title;
                    card.content = cardTmp.content;
                }
            }
            state.isEditable = false;
        }

        const handleDelete = (): void => {
            context.emit('delete', props.info.id);
            showModal.value = false;
        }

        return {
            MODES, BUTTON_TYPES, card, state, showModal, handleEdit, handleDelete
        }
    },
})
</script>

<template>
    <div class="rounded-md bg-white px-2 py-2 mb-4">
        <div class="pb-2" @click="state.isEditable = true" v-if="!state.isEditable">
            <div class="flex items-center justify-between pb-4">
                <h3 class="text-md">{{ card.title }}</h3>
                <button class="">=</button>
            </div>
            <p class="text-left text-sm">{{ card.content }}</p>
        </div>
        <div v-else>
            <input class="border-2 rounded w-full mb-4 px-1 py-1" type="text" v-model="card.title" placeholder="Title">
            <textarea class="border-2 rounded w-full px-1 py-1 h-24" cols="30" rows="10" v-model="card.content" placeholder="text"></textarea>
            <div class="flex items-center justify-between py-3">
                <button 
                    class="font-bold border-2 border-red-400 text-red-400 rounded py-1 px-4"
                    @click="showModal = true"
                    v-show="!state.initialize"
                >
                    x Delete Item
                </button>
                <div class="flex items-center justify-end w-full">
                    <circle-button class="mr-2" @_click="handleEdit(MODES.CHANGE)" :mode="BUTTON_TYPES.OK" />
                    <circle-button @_click="handleEdit(MODES.DISCARD)" :mode="BUTTON_TYPES.NO" />
                </div>
            </div>
        </div>
    </div>

    <Teleport to="body">
        <modal class="" :show="showModal" @agree="handleDelete" @reject="showModal = false">
            <template #body>
                Are you sure want to delete this card?
            </template>
        </modal>
    </Teleport>
</template>