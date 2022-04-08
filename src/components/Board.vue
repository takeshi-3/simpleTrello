<script lang="ts">
import { defineComponent, ref } from 'vue';
import Column from "./Column.vue";

export default defineComponent({
    components: {
        Column,
    },
    setup() {
        const getInitialBoard = (): Object[] => {
            return new Array<Object>({pos: 0, title: 'Introduction'});
        };
        const columns = ref<Object[]>(getInitialBoard());

        const updateTitle = ($event: Event, newTitle: string, pos: number) => {
            
        }
        return {columns, updateTitle};
    },
})
</script>

<template>
    <div class="rounded-md px-4 py-4 bg-gray-50">
        <Column v-for="(col, index) in columns" :key="index" :data="col" @update="updateTitle($event, newTitle)" />
    </div>
</template>