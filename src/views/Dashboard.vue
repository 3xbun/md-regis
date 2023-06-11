<template>
  <div id="dashboard">
    <header class="drop-shadow">
      <h1>Dashboard</h1>
    </header>

    <div class="profileImage">
      <img :src="profileSrc" />
    </div>

    <div class="container">
      <p class="name">BUNNASORN KAEWSIRI</p>

      <div class="summary">
        <div class="ovr">
          <CircleProgress :viewport="true" :percent="80" :transition="1500" :fill-color="'#3E64D6'" :empty-color="'#81BBDB'"/>
          <p><span id="percent">80</span><span class="total">/100</span></p>
        </div>
        <div class="rightSummary">
          <div class="exp">
            <p>Expected Grade</p>
            <strong id="exp"></strong>
          </div>
          <div class="atd">
            <p>Attendance</p>
            <p><strong id="atd"></strong>/10</p>
          </div>
        </div>
      </div>

      <div class="works">
        <h1>Works</h1>
        <ul>
          <li class="work">
            <div class="top">
              <p>Work Title #1</p>
              <p class="score"><span id="score">80</span>/100</p>
            </div>
            <div class="notion">
              <!-- <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Notion-logo.svg/1024px-Notion-logo.svg.png"> -->
              <p>View In Notion</p>
            </div>
          </li>
        </ul>
      </div>

      <p @click="logout()" class="logout btn">Logout</p>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import CircleProgress from "vue3-circle-progress";
import "vue3-circle-progress/dist/circle-progress.css";

import { CountUp } from 'countup.js';

import Footer from "../components/Footer.vue";

import { computed, inject, onMounted, ref } from "vue";
import router from "../router";

const profile = inject("profile");
const state = inject("state");

const profileSrc = computed(
  () => "https://api.dicebear.com/6.x/thumbs/svg?seed=" + "Bunnasorn Kaewsiri"
);

const logout = () => {
  state.value.isAuthenticated = false;
  profile.value = {};
  router.push("login");
};

onMounted(() => {
  // if (!state.value.isAuthenticated) {
  //   router.push("/login");
  // }

  const percent = new CountUp('percent', 80, {duration: 3})
  const exp = new CountUp('exp', 3.5, {duration: 4,decimalPlaces: 2} )
  const atd = new CountUp('atd', 5, {duration: 5})
  percent.start()
  exp.start()
  atd.start()
});
</script>

<style scoped>
#dashboard {
  padding-bottom: 10em;
}
header {
  background: var(--primary);
  padding: 1em;
}

.container {
  width: 90vw;
  margin: auto;
  padding: 1em;
  max-width: 600px;
}

img {
  width: 100%;
  border-radius: 50%;
}

.profileImage {
  width: 20vw;
  margin: 1em auto 0;
}

.name {
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  background-color: var(--white);
  color: var(--dark);
  border-radius: 0.5em;
  padding: 0.5em;
}

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

.logout {
  width: 100%;
  background-color: #ff8787;
  color: var(--dark);
  border-radius: 0.5em;
  padding: 0.5em;
  text-align: center;
  font-weight: bold;
  color: var(--white);
}

.works {
  margin: 1em 0;
}

.work {
  background-color: var(--white);
  color: var(--dark);
  padding: 0.5em;
  border-radius: 0.5em;
}

.work .top {
  display: flex;
  justify-content: space-between;
}

#score {
  font-weight: bold;
  color: var(--primary);
}

.notion {
  text-align: right;
}
</style>
