<template>
  <div class="externalError" v-if="externalError.isError">
    <img :src="'https://httpstatusdogs.com/img/' + externalError.code + '.jpg'" :alt="externalError.code">
  </div>
  <div id="dashboard">
    <Title title='Dashboard' />
    <div v-if="profile">
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
const externalError = ref({
  isError: false,
  code: 200
})

onMounted(() => {
  if (!state.value.isAuthenticated) {
    router.push("/login");
  }

  const options = {
    method: 'GET',
    url: 'https://ndb.3xbun.com/api/v2/tables/m2r39rntqdpwuta/records',
    params: { offset: '0', limit: '1', where: `where=(username,eq,${profile.value.username})`, viewId: 'vw8rysdenslqijcc' },
    headers: {
      'xc-token': '1GOWVXZS15GxMGLJNwMqPJHqFRQ_VXZ6CJJ9hehM'
    }
  };

  axios.request(options).then(function (response) {
    console.log(response.data.list[0]);
    profile.value = response.data.list[0]
  }).catch(function (error) {
    console.error(err);
    externalError.value = {
      isError: true,
      code: err.response.status
    }
  });
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
