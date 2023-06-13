<template>
  <div id="dashboard">
    <header class="drop-shadow">
      <h1>Dashboard</h1>
    </header>

    <div class="profileImage">
      <img :src="profileSrc" />
    </div>

    <div class="container">
      <div class="name">
        <p>{{ profile.name }}</p>
        <p class="username">@{{ profile.username }}</p>
      </div>

      <div class="summary">
        <div class="ovr">
          <CircleProgress :viewport="true" :percent="5" :transition="1500" :fill-color="'#3E64D6'"
            :empty-color="'#81BBDB'" />
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

      <div class="works">
        <h1>Works</h1>
        <ul>
          <li class="work" v-for="work in Works" :key="work.workID">
            <div class="top">
              <p>{{ work.title }}</p>
              <p>
                <span id="score">{{ getScore(work.workID) }}</span>/{{ work.score }}
              </p>
            </div>
            <div class="notion">
              <!-- <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Notion-logo.svg/1024px-Notion-logo.svg.png"> -->
              <a :href="work.notion" target="_blank">View In Notion</a>
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
import { PublicClientApplication } from "@azure/msal-browser";
import config from "../config";

import Works from '../database/Works';
import Scores from '../database/Scores';

import { CountUp } from "countup.js";

import Footer from "../components/Footer.vue";

import { computed, inject, onMounted, ref } from "vue";
import router from "../router";

const Azure = new PublicClientApplication({
  auth: {
    clientId: config.CLIENT_ID,
    authority: config.AUTHORITY,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
});

const profile = inject("profile");
const state = inject("state");

const myScore = computed(() => Scores.filter((Score) => Score.username === profile.value.username)[0].works)
const getScore = (workID) => {
  try {
    return myScore.value.filter(work => work.workID === workID)[0].score
  } catch (error) {
    return 0
  }
}

const totalScore = computed(() => myScore.value.reduce((acc, a) => acc + a.score, 0))
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

const profileSrc = computed(
  () => "https://api.dicebear.com/6.x/thumbs/svg?seed=" + "Bunnasorn Kaewsiri"
);

const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
  state.value.isAuthenticated = false;
  profile.value = {};
  Azure.logoutRedirect();
  // router.push("login");
};

onMounted(() => {
  if (!state.value.isAuthenticated) {
    router.push("/login");
  }

  const percent = new CountUp("percent", totalScore.value, { duration: 3 });
  const exp = new CountUp("exp", parseFloat(grade.value), { duration: 4, decimalPlaces: 2 });
  const atd = new CountUp("atd", 5, { duration: 5 });
  percent.start();
  exp.start();
  atd.start();
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

.works ul {
  display: flex;
  flex-direction: column;
  gap: 1em;
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

.username {
  font-size: .8em;
  font-weight: lighter;
  color: var(--light);
}
</style>
