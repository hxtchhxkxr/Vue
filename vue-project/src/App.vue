<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style>
body {
  margin: 0;
  background: #f8f5f0;
  color: #382e28;
  font-family: "맑은 고딕", sans-serif;
}

#app {
  box-sizing: border-box;
  display: block;
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  padding: 40px 20px 64px;
  text-align: left;
}

@media (max-width: 480px) {
  #app {
    padding: 24px 16px 40px;
  }
}
</style>