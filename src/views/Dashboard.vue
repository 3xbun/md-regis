<template>
  <div class="externalError" v-if="externalError.isError">
    <img
      :src="'https://httpstatusdogs.com/img/' + externalError.code + '.jpg'"
      :alt="externalError.code"
    />
  </div>
  <div id="dashboard">
    <Title title="Dashboard" />
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
import axios from "axios";

import Title from "../components/Title.vue";
import ProfileImage from "../components/ProfileImage.vue";
import Name from "../components/Name.vue";
import Summary from "../components/Summary.vue";
import Works from "../components/Works.vue";
import Logout from "../components/Logout.vue";
import Footer from "../components/Footer.vue";
import Loading from "../components/Loading.vue";

import { inject, onMounted, ref } from "vue";
import router from "../router";
import config from "../config";

const state = inject("state");
const profile = inject("profile");
const externalError = ref({
  isError: false,
  code: 200,
});

onMounted(() => {
  if (!state.value.isAuthenticated) {
    router.push("/login");
  } else {
    const options = {
      method: "GET",
      url: "https://ndb.3xbun.com/api/v2/tables/msm4wm5c4mzxr7g/records",
      params: {
        offset: "0",
        limit: "25",
        where: `where=(Username,eq,${profile.value.Username})`,
        viewId: "vwynoiiw0yghyiq9",
      },
      headers: {
        "xc-token": "wU0uyFeODMGzOqqkIUethPYhnZn_FqXXgifuiXWu",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        if (response.data.list[0]) {
          profile.value = response.data.list[0];
          localStorage.setItem("profile", JSON.stringify(profile.value));
        } else {
          router.push("/register");
        }
      })
      .catch(function (error) {
        console.error(error);
        externalError.value = {
          isError: true,
          code: error.response.status,
        };
      });
  }
});
</script>

<style scoped>
#dashboard {
  padding-bottom: 10em;
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
