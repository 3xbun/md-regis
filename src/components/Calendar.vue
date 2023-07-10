<template>
  <div class="card">
    <table>
      <tr>
        <td></td>
        <td v-for="day in DB">
          {{ formatDate(day.id) }}
        </td>
      </tr>
      <tr>
        <td><Strong>Checked</Strong></td>
        <td v-for="day in DB">
          <font-awesome-icon class="green" :icon="['fas', 'check']" v-if="isChecked(id, day.checkins)" />
          <font-awesome-icon class="red" :icon="['fas', 'xmark']" v-else />
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import CheckIn from '../database/CheckIn.json';
import Students from '../database/Students.json';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { inject } from 'vue';

const DB = CheckIn.CheckIn.reverse();

const profile = inject("profile");
const id = Students.data.filter(e => e.username === profile.value.username)[0].id

const formatDate = (day) => {
  dayjs.extend(customParseFormat)
  return dayjs(day, "DD-MM-YY").format('DD MMM')
}

const isChecked = (id, checkins) => {
  return checkins.filter(c => c.id == id).length
}
</script>

<style scoped>
strong {
  color: var(--primary);
}

td {
  text-align: center;
}

tr>td:first-child {
  text-align: left;
  width: 0;
}

.card {
  color: var(--dark);
  background-color: var(--white);
  padding: 0.5em;
  border-radius: 0.5em;
}

table {
  width: 100%;
}

.green {
  color: green;
}

.red {
  color: red;
}
</style>