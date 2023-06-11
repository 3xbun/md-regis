<template>
  <div>
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
          <div class="circle"></div>
        </div>
        <div class="rightSummary">
          <div class="exp">
            <p>Expected Grade</p>
            <strong>4.00</strong>
          </div>
          <div class="atd">
            <p>Attendance</p>
            <p><strong>8</strong>/10</p>
          </div>
        </div>
      </div>

      <p @click="logout()" class="logout btn">Logout</p>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Footer from "../components/Footer.vue";

import CircleChart from "circle-chart";

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

  new CircleChart({
    $container: document.querySelector(".circle"),
    ringProportion: 0.4,
    staticTotal: true,
    total: 100,
    middleCircleColor: "#F8F8FF",
    background: "#81BBDB",
    definition: [
      { label: "Score", name: "score", color: "#3E64D6", value: 90 },
    ],
  });
});
</script>

<style scoped>
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
  align-items: center;
  justify-content: center;
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
</style>
