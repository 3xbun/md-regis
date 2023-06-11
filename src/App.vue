<template>
  <router-view />
</template>

<script setup>
import { provide, ref } from "vue";

const profile = ref({});
const state = ref({
  isAuthenticated: localStorage.isAuthenticated || false,
});

provide("profile", profile);
provide("state", state);
</script>

<style scoped></style>
