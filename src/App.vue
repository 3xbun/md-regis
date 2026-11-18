<template>
  <router-view />
</template>

<script setup>
import { provide, ref } from "vue";

const profile = ref(JSON.parse(localStorage.getItem("profile") || "null"));
const state = ref({
  isAuthenticated: localStorage.isAuthenticated || false,
});
const Works = ref([])

provide("profile", profile);
provide("state", state);
provide("Works", Works)
</script>

<style scoped></style>
