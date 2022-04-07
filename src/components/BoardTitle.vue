<template>
    <h1 class="p-6 shadow-lg">
        <button class="title_clickable" v-show="!isEditable" @click="edit">{{ title }}</button>
        <input type="text" :value="title" ref="inputRef" v-show="isEditable" v-on:keyup.enter="updateTitle">
        <div class="btns" v-show="isEditable">
            <button @click="updateTitle">v</button>
            <button @click="exitEdit">x</button>
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

<style scoped>
/* .title {
    display: flex;
    align-items: flex-start;
}

.title_clickable {
    background: none;
    border-style: none;
    outline: none;
}

.title_clickable:hover {
    background: #cdcdcd;
    cursor: pointer;
}

.title input {
    padding: 10px 8px;
} */
</style>