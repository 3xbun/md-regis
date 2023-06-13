<template>
  <router-view />
</template>

<script setup>
import { onMounted, provide, ref } from "vue";

const profile = ref({});
const state = ref({
  isAuthenticated: localStorage.isAuthenticated || false,
});

provide("profile", profile);
provide("state", state);

onMounted(() => {
  if (localStorage.getItem("profile")) {
    profile.value = localStorage.getItem("profile")
  }
})
</script>

<style scoped></style>
