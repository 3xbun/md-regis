<template>
  <div class="summary">
    <div class="ovr">
      <CircleProgress :viewport="true" :percent="5" :transition="1500" :fill-color="'#3E64D6'" :empty-color="'#81BBDB'" />
      <p><span id="percent"></span><span class="total">/100</span></p>
    </div>
    <div class="rightSummary">
      <div class="exp">
        <p>Projected Grade</p>
        <strong id="exp"></strong>
      </div>
      <div class="atd">
        <p>Attendance</p>
        <p><strong id="atd"></strong>/10</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import CircleProgress from "vue3-circle-progress";
import { onMounted, computed, inject } from 'vue';
import { CountUp } from "countup.js";

import "vue3-circle-progress/dist/circle-progress.css";

import ScoresDB from '../database/Scores';

const profile = inject("profile");

const myScore = computed(() => ScoresDB.filter((score) => score.username === profile.value.username)[0])
const totalScore = computed(() => myScore.value.works.reduce((acc, a) => acc + a.score, 0))


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

onMounted(() => {
  const percent = new CountUp("percent", totalScore.value, { duration: 3 });
  const exp = new CountUp("exp", parseFloat(grade.value), { duration: 4, decimalPlaces: 2 });
  const atd = new CountUp("atd", myScore.value.atd, { duration: 5 });
  percent.start();
  exp.start();
  atd.start();
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
