<template>
  <div class="name">
    <p>{{ profile.FullName }}</p>
    <p class="username">@{{ profile.Username }}</p>
  </div>
</template>

<script setup>
import { inject } from "vue";

const profile = inject("profile");
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
