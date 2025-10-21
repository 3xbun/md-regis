<template>
  <p>
    <!-- <strong id="atd"></strong>/{{ total }} -->
    <strong id="atd"></strong>
  </p>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";
import { CountUp } from "countup.js";

const profile = inject("profile");
const total = ref(0);

const attendance = () => {
  const a = new CountUp("atd", total.value);
  a.start();
};

onMounted(() => {
  // total.value = 20;
  total.value = profile.value.CheckIn.length;

  if (profile.value.CheckIn) {
    attendance(total.value);
  }
});
</script>

<style scoped>
strong {
  font-size: 2em;
  color: var(--primary);
}
</style>
