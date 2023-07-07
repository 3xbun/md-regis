<template>
  <div class="summary">
    <div class="ovr">
      <CircleProgress :viewport="true" :percent="totalScore" :transition="1500" :fill-color="'#3E64D6'"
        :empty-color="'#81BBDB'" />
      <p><span id="percent"></span><span class="total">/100</span></p>
    </div>
    <div class="rightSummary">
      <div class="exp">
        <p>Projected Grade</p>
        <strong id="exp">{{ grade }}</strong>
      </div>
      <div class="atd">
        <p>Attendance</p>
        <p><strong id="atd">{{ attendance() }}</strong>/{{ Scores.Scores[0].atd }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import CircleProgress from "vue3-circle-progress";
import { onMounted, computed, inject, ref } from 'vue';
import { CountUp } from "countup.js";

import "vue3-circle-progress/dist/circle-progress.css";

import Scores from '../database/Scores.json';

const profile = inject("profile");

const myScore = ref({})

const attendance = () => {
  const n = Scores.Scores.filter(s => s.username === profile.value.username)[0].atd
  const a = new CountUp("atd", n, { duration: 5 })
  a.start()
}

const totalScore = computed(() => {
  let total = 0
  if (myScore.value.length) {
    total = myScore.value.reduce((acc, cur) => acc + parseInt(cur.score), 0)
  } else {
    total = 0
  }

  const percent = new CountUp("percent", total, { duration: 3 });
  percent.start();

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

  const exp = new CountUp("exp", parseFloat(g), { duration: 4, decimalPlaces: 2 });
  exp.start();
})

onMounted(() => {
  myScore.value = Scores.Scores.filter(s => s.username === profile.value.username)[0].works
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
