<template>
    <h1 class="flex items-center">
        <button class="font-sans text-3xl font-bold rounded-lg hover:bg-gray-500/10 px-3 py-2" v-show="!isEditable" @click="edit">
            {{ title }}
        </button>
        <input class="font-sans text-3xl font-bold rounded-lg border-solid border-2 border-gray-200 px-3 py-2 mr-2" type="text" :value="title" ref="inputRef" v-show="isEditable" v-on:keyup.enter="updateTitle">
        <div class="flex items-start" v-show="isEditable">
            <button class="w-8 h-8 mr-1 rounded-full bg-green-500" @click="updateTitle">v</button>
            <button class="w-8 h-8 rounded-full bg-red-400" @click="exitEdit">x</button>
        </div>
    </h1>
    
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {
        const isEditable = ref<boolean>(false);
        const title = ref<string>('My Board');
        const inputRef = ref<HTMLInputElement | null>(null);

        const edit = ():void => {
            isEditable.value = true;
        }

        const exitEdit = ():void => {
            isEditable.value = false;
        }

        const updateTitle = ():void => {
            if (inputRef.value === null) return;
            else title.value = String(inputRef.value.value);
            exitEdit();
        }

        return {
            isEditable, title, inputRef, edit, exitEdit, updateTitle
        }
    },
})
</script>