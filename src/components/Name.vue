<template>
  <div class="name">
    <p>{{ fullName }}</p>
    <p class="username">@{{ userName }}</p>
  </div>
</template>

<script setup>
import { computed, inject } from "vue";

const profile = inject("profile");

const fullName = computed(() => {
  const p = profile.value || {};
  if (p.f_Name || p.l_Name) return `${p.f_Name || ""} ${p.l_Name || ""}`.trim();
  return p.FullName || p.name || "";
});

const userName = computed(() => {
  const p = profile.value || {};
  return p.Username || p.username || p.studentID || "";
});
</script>

<style scoped>
.name {
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  background-color: var(--white);
  color: var(--dark);
  border-radius: 0.5em;
  padding: 0.5em;
}

.username {
  font-size: 0.8em;
  font-weight: lighter;
  color: var(--light);
}
</style>
