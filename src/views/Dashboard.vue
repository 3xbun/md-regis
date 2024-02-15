<template>
  <div class="externalError" v-if="externalError">
    <img src="https://httpstatusdogs.com/img/500.jpg" alt="500">
  </div>
  <div id="dashboard">
    <Title title='Dashboard' />
    <div v-if="profile.checkIns">
      <ProfileImage />

      <div class="container">
        <Name />
        <Summary />
        <Works />
        <Logout />
      </div>
    </div>
    <div class="loading" v-else>
      <Loading />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import axios from 'axios';

import Title from "../components/Title.vue";
import ProfileImage from "../components/ProfileImage.vue";
import Name from "../components/Name.vue";
import Summary from "../components/Summary.vue";
import Works from "../components/Works.vue";
import Logout from "../components/Logout.vue";
import Footer from "../components/Footer.vue";
import Loading from '../components/Loading.vue';

import { inject, onMounted, ref } from "vue";
import router from "../router";
import config from '../config';

const state = inject("state");
const profile = inject('profile')
const externalError = ref(false)

onMounted(() => {
  if (!state.value.isAuthenticated) {
    router.push("/login");
  }

  axios.get(config.API_URL + profile.value.username).then(res => {
    profile.value = { ...profile.value, ...res.data }
  }).catch(err => {
    console.error(err);
    externalError.value = true
  })
});
</script>

<style scoped>
#dashboard {
  padding-bottom: 10em;
}

.container {
  width: 90vw;
  margin: auto;
  padding: 1em;
  max-width: 600px;
}

.externalError {
  width: 100vw;
  height: 100vh;
  background-color: black;
  display: grid;
  place-items: center;
  position: fixed;
  z-index: 99;
}
</style>
