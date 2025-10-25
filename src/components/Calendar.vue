<template>
  <div class="card">
    <i class="fa-solid fa-square"></i>
    <ul>
      <li v-for="day in checkedInDate">{{ formatDate(day) }}</li>
    </ul>
    <!-- <table>
      <tr>
        <td></td>
        <td v-for="day in checkedInDate">
          {{ formatDate(day) }}
        </td>
      </tr>
      <tr>
        <td><strong>Checked</strong></td>
        <td v-for="day in checkedInDate">
          <i class="fa-solid fa-check green" v-if="isChecked(day)"></i>
          <i class="fa-solid fa-xmark red" v-else></i>
        </td>
      </tr>
    </table> -->
  </div>
</template>

<script setup>
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { inject, onMounted, ref } from "vue";

const profile = inject("profile");
const checkedInDate = ref([]);

const formatDate = (day) => {
  dayjs.extend(customParseFormat);
  return dayjs(day).format("DD MMM");
};

const isChecked = (day) => {
  if (
    profile.value.CheckIn.filter((d) => formatDate(d) == formatDate(day))
      .length > 0
  ) {
    return true;
  }
  return false;
};

onMounted(() => {
  checkedInDate.value = profile.value.CheckIn;
});
</script>

<style scoped>
strong {
  color: var(--primary);
}

td {
  text-align: center;
}

tr > td:first-child {
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
