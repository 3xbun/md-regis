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
    listRecords(TABLES.allScore, {
      where: `(Username,eq,${profile.value.Username || profile.value.username})`,
      pageSize: 25,
    })
      .then((records) => {
        if (records[0]) {
          profile.value = records[0];
          localStorage.setItem("profile", JSON.stringify(profile.value));
        } else {
          router.push("/register");
        }
      })
      .catch(function (error) {
        console.error(error);
        externalError.value = {
          isError: true,
          code: error.response ? error.response.status : 500,
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
