<template>
  <p>
    <strong id="atd"></strong>/{{ total }}
  </p>
</template>

<script setup>
import { inject, onMounted } from 'vue';
import CheckIn from '../database/CheckIn.json';
import Students from '../database/Students.json';
import { CountUp } from "countup.js";

const DB = CheckIn.CheckIn

const profile = inject("profile");

const id = Students.data.filter(e => e.username === profile.value.username)[0].id

const attendance = () => {
  let counter = 0
  for (let index = 0; index < total; index++) {
    const checkins = DB[index].checkins
    counter += checkins.filter(e => e.id == id).length
  }

  const a = new CountUp("atd", counter)
  a.start()
}
const total = DB.length

onMounted(() => {
  attendance()
})
</script>

<style scoped>
strong {
  font-size: 2em;
  color: var(--primary);
}
</style>