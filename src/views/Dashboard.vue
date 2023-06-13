<template>
  <div id="dashboard">
    <Title />
    <ProfileImage />

    <div class="container">
      <Name />
      <Summary />
      <Works />
      <Logout />
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

import { inject, onMounted } from "vue";
import router from "../router";

const state = inject("state");

onMounted(() => {
  if (!state.value.isAuthenticated) {
    router.push("/login");
  }
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
</style>
