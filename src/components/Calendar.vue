<template>
  <div class="card">
    <table>
      <tr>
        <td></td>
        <td v-for="day in checkedInDate">
          {{ formatDate(day) }}
        </td>
      </tr>
      <tr>
        <td><strong>Checked</strong></td>
        <td v-for="day in checkedInDate">
          <font-awesome-icon class="green" :icon="['fas', 'check']" v-if="isChecked(day)" />
          <font-awesome-icon class="red" :icon="['fas', 'xmark']" v-else />
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import dayjs from 'dayjs';
import axios from 'axios';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { inject, onMounted, ref } from 'vue';

import config from '../config';

const profile = inject("profile");
const checkedInDate = ref([])

const formatDate = (day) => {
  dayjs.extend(customParseFormat)
  return dayjs(day).format('DD MMM')
}

const isChecked = (day) => {
  if (profile.value.checkIns.filter(d => formatDate(d) == formatDate(day)).length > 0) {
    return true
  }
  return false
}

onMounted(() => {
  axios.get(config.API_URL + "bunnasorn.k").then(res => {
    checkedInDate.value = res.data.checkIns
  })
})
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