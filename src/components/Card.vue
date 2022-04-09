<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'
import { Card } from '../modules/models';

export default defineComponent({
    props: {
        info: {
            type: Object,
            required: true,
        },
    },
    setup(props, context) {
        enum MODES {
            CHANGE,
            DISCARD
        };

        const card: Card = reactive({
            title: `sample title ${props.info.id}`,
            content: "sample content"
        });
        const cardTmp: Card = {...card};
        const state = reactive({
            isEditable: false,
        });

        const handleEdit = (mode: MODES): void => {
            if (mode === MODES.CHANGE) {
                // localInfo.value = {id: props.cardInfo.id, name: card.title};
                cardTmp.title = card.title;
                cardTmp.content = card.content;
            } else if (mode === MODES.DISCARD) {
                card.title = cardTmp.title;
                card.content = cardTmp.content;
            }
            state.isEditable = false;
        }

        const handleDelete = (): void => {
            context.emit('delete', props.info.id);
        }

        return {
            MODES, card, state, handleEdit, handleDelete
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
            <input class="border-2 rounded w-full mb-4 px-1 py-1" type="text" v-model="card.title">
            <textarea class="border-2 rounded w-full px-1 py-1 h-24" cols="30" rows="10" v-model="card.content"></textarea>
            <div class="flex items-center justify-between py-3">
                <button 
                    class="font-bold border-2 border-red-400 text-red-400 rounded py-1 px-4"
                    @click="handleDelete"
                >
                    x Delete Item
                </button>
                <div>
                    <button class="rounded-full bg-blue-400 w-8 h-8 mr-2" @click="handleEdit(MODES.CHANGE)">v</button>
                    <button class="rounded-full bg-red-600 w-8 h-8" @click="handleEdit(MODES.DISCARD)">x</button>
                </div>
            </div>
        </div>
    </div>
</template>