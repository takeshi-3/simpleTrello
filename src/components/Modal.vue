<template>
    <transition-group name="modal" class="">
        <div v-if="isShow" class="fixed inset-0 bg-black/30 w-screen h-screen"> <!-- mask -->
            <div class="flex w-full h-full items-center justify-around"> <!-- wrapper -->
                <div class="flex flex-col items-center justify-around py-8 px-8 bg-white w-1/2 h-1/4 rounded-lg"> <!-- container -->
                    <div> <!-- header -->
                        !!
                    </div>

                    <div>
                        <slot name="body"></slot>
                    </div>

                    <div>
                        <button 
                            @click="context.emit('reject')"
                            class="mr-4 rounded w-12 h-8 bg-cyan-600 text-white"
                            >
                            No
                        </button>
                        <button 
                            class="rounded w-12 h-8 hover:bg-rose-600 hover:text-white"
                            @click="context.emit('agree')"
                        >Yes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </transition-group>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
    props: {
        show: Boolean
    },
    setup(props, context) {
        const isShow = computed(() => props.show);

        return {isShow, context};
    },
})
</script>
