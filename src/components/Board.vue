<script lang="ts">
import { defineComponent, ref } from 'vue';
import Column from "./Column.vue";

export default defineComponent({
    components: {
        Column,
    },
    setup() {
        interface Column {
            id: string,
        };
        const getInitialBoard = (): Column[] => {
            return new Array<Column>({id: '0'});
        };
        const columns = ref<Column[]>(getInitialBoard());
        return {columns};
    },
})
</script>

<template>
    <div class="rounded-md px-4 py-4 bg-gray-50">
        <Column v-for="col in columns" :key="col.id" :info="col" />
    </div>
</template>