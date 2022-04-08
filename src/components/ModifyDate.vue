<template>
    <p class="text-left px-3 py-2 text-sm">Last Modified : {{ updateDate }}</p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    setup() {
        const getStringFormatDate = (date: Date): string => {
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const hour = date.getHours();
            const minute = date.getMinutes();
            const second = date.getSeconds();

            const formatStr = `${day}/${month}/${year}, ${hour}:${minute}:${second}`;
            return formatStr;
        }

        const updateDate = ref<string>(getStringFormatDate(new Date()));

        const update = () => {
            updateDate.value = getStringFormatDate(new Date());
        }

        return {
            updateDate
        }
    },
})
</script>