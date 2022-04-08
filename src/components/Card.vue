<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { CardObject } from '../modules/models';

export default defineComponent({
    setup() {
        const card: CardObject = reactive({
            title: "sample title",
            content: "sample content"
        });

        return {
            card
        }
    },
})
</script>

<template>
    <div class="rounded-md bg-white px-2 py-2">
        <div class="flex items-center justify-between pb-2">
            <h3 class="text-md">{{ card.title }}</h3>
            <button class="">=</button>
        </div>
        <p class="text-left text-sm">{{ card.content }}</p>
    </div>
</template>