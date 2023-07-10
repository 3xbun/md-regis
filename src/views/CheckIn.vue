<template>
  <div id="checkIn">
    <Title title="Check In" />
    <div class="container">
      <textarea v-model="input" cols="30" rows="10"></textarea>

      <button @click="saveCheckIn()">Save</button>
      <table>
        <tr v-for="item in processor">
          <td>{{ item.id }}</td>
          <td>{{ item.time }}</td>
        </tr>
      </table>

    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { computed, ref } from "vue";
import Title from "../components/Title.vue";

const input = ref('')
const processor = computed(() => {
  try {
    const raw = JSON.parse(input.value)['Checked In']
    raw.forEach(e => {
      delete e.name
    });

    const uniq = raw.filter((item, index) => {
      const pos = raw.map(e => e.id).indexOf(item.id)
      return pos == index
    })

    return uniq
  } catch (error) {
    // console.log(error);
  }
})

const baseURL = "http://localhost:3002/CheckIn"

const saveCheckIn = async () => {
  console.log(processor.value);
  const payload = {
    "id": "19-05-23",
    "checkins": processor.value
  }

  console.log(payload);
  console.log(await axios.get(baseURL));

  axios.post(baseURL, payload)
}
</script>

<style scoped>
header {
  background: var(--primary);
  padding: 1em;
}
</style>