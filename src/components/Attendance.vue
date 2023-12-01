<template>
  <p v-if="profile.checkIns">
    <strong id="atd"></strong>/{{ total }}
  </p>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import { CountUp } from "countup.js";

const profile = inject("profile");

const attendance = () => {
  const a = new CountUp("atd", profile.value.checkIns.length)
  a.start()
}

const total = ref(0)

onMounted(async () => {
  total.value = await profile.value.checkIns.length

  if (profile.value.checkIns) {
    attendance()
  }
})
</script>

<style scoped>
strong {
  font-size: 2em;
  color: var(--primary);
}
</style>