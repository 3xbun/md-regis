<template>
  <div class="summary">
    <div class="ovr">
      <CircleProgress :viewport="true" :percent="totalScore" :transition="1500" :fill-color="'#3E64D6'"
        :empty-color="'#81BBDB'" />
      <p class="totalScore"><span id="percent"><count-up :end-val="totalScore" :duration="3"></count-up></span><span
          class="total">/100</span></p>
    </div>
    <div class="rightSummary">
      <div class="exp">
        <p>Projected Grade</p>
        <strong id="exp">
          <count-up :end-val="parseFloat(grade)" :duration="3" :decimalPlaces="1"></count-up>
        </strong>
      </div>
      <!-- <div class="atd">
        <p>Attendance</p>
        <Attendance />
        <p class="subtitle" @click="calMan()">{{ showCalendar.text }}</p>
      </div> -->
    </div>
  </div>
  <Calendar v-if="showCalendar.status" />
</template>

<script setup>
import CircleProgress from "vue3-circle-progress";
import { computed, inject, onMounted, ref } from 'vue';
import CountUp from 'vue-countup-v3'

import "vue3-circle-progress/dist/circle-progress.css";

import Attendance from './Attendance.vue';
import Calendar from './Calendar.vue';

const profile = inject("profile");
const Works = inject('Works')

const showCalendar = ref({ text: 'Show Details', status: false })

const calMan = () => {
  if (showCalendar.value.status) {
    showCalendar.value = { text: 'Show Details', status: false }
  } else {
    showCalendar.value = { text: 'Hide Details', status: true }
  }
}

const totalScore = computed(() => {
  let total = 0
  Works.value.forEach(work => {
    total += profile.value['Work' + work.Id]
  });

  return total
}
)

const grade = computed(() => {
  const score = totalScore.value
  let g = '0'

  if (score >= 80) {
    g = '4'
  } else if (score >= 75) {
    g = '3.5'
  } else if (score >= 70) {
    g = '3'
  } else if (score >= 65) {
    g = '2.5'
  } else if (score >= 60) {
    g = '2'
  } else if (score >= 55) {
    g = '1.5'
  } else if (score >= 50) {
    g = '1'
  }

  return g
})
</script>

<style scoped>
.summary {
  display: flex;
  justify-content: center;
  gap: 1em;
  margin: 1em 0;
  text-align: center;
}

.ovr,
.rightSummary {
  color: var(--dark);
  width: 100%;
}

.ovr {
  padding: 0.5em;
  border-radius: 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--primary);
  font-weight: bold;
}

.ovr p {
  position: absolute;
}

#percent {
  font-size: 3em;
}

.totalScore {
  display: flex;
  align-items: center;
  margin-left: 1.5em;
}

.total {
  font-weight: normal;
  color: var(--dark);
  font-size: 1rem;
}

.ovr,
.exp,
.atd {
  background-color: var(--white);
}

.subtitle {
  color: var(--light);
  cursor: pointer;
}

.rightSummary {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.exp,
.atd {
  padding: 0.5em;
  border-radius: 0.5em;
}

.rightSummary strong {
  font-size: 2em;
  color: var(--primary);
}
</style>
