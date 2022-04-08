<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import BoardTitle from './components/BoardTitle.vue'
import ModifyDate from './components/ModifyDate.vue'
import Board from './components/Board.vue'
</script>

<template>
  <BoardTitle />
  <ModifyDate />

  <Board />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 16px 8px;
}
</style>
