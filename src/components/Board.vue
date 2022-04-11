<script lang="ts">
import { defineComponent, ref } from 'vue';
import Column from "./Column.vue";
import SquareButton from "./SquareButton.vue";

export default defineComponent({
    components: {
        Column,
        SquareButton,
    },
    setup() {
        interface Column {
            id: string,
        };

        const isAddingColumn = ref<boolean>(false);
        const getInitialBoard = (): Column[] => {
            return new Array<Column>();
        };
        const columns = ref<Column[]>(getInitialBoard());

        const handleAddNewColumn = (): void => {
            isAddingColumn.value = true;
            columns.value.push({id: columns.value.length.toString()});
        };

        const handleColumnCreated = (): void => {
            isAddingColumn.value = false;
        }

        const handleDeleteColumn = (targetId: string): void => {
            columns.value = columns.value.filter(col => col.id !== targetId);
            isAddingColumn.value = false;
        }

        return {isAddingColumn, columns, handleAddNewColumn, handleDeleteColumn, handleColumnCreated};
    },
})
</script>

<template>
    <div class="flex align-top justify-start h-full rounded-md px-4 py-4 bg-gray-50">
        <Column v-for="col in columns" :key="col.id" :info="col" @delete="handleDeleteColumn" @created="handleColumnCreated" />
        <div 
            name="add-button-transition"
            enter-class="opacity-0"
            enter-active-class="transition duration-400"
            enter-to-class="opacity-100"
            >
            <div
                v-if="!isAddingColumn"
                class="rounded-md bg-gray-200 w-72 px-2 py-4 self-start"
            >
                <square-button @_click="handleAddNewColumn">+ Add More List</square-button>
            </div>
        </div>
    </div>
</template>