<template>
  <router-view />
</template>

<script setup>
import { onMounted, provide, ref } from "vue";

const profile = ref({});
const state = ref({
  isAuthenticated: localStorage.isAuthenticated || false,
});
const Works = ref([])

provide("profile", profile);
provide("state", state);
provide("Works", Works)

onMounted(() => {
  if (localStorage.getItem("profile")) {
    profile.value = JSON.parse(localStorage.getItem("profile"))
  }
})
</script>

<style scoped></style>
