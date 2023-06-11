<template>
  <div id="loginPage">
    <div class="image drop-shawdow"></div>
    <div class="container">
      <h1 class="subtitle">Welcome</h1>
      <div class="signInBtn btn drop-shadow" @click="login()">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png?20210729021049"
          alt=""
          class="logo"
        />
        <strong>Sign In With Office365</strong>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Footer from "../components/Footer.vue";

import config from "../config";
import { PublicClientApplication } from "@azure/msal-browser";
import { inject } from "vue";
import router from "../router";

const profile = inject("profile");
const state = inject("state");

const Azure = new PublicClientApplication({
  auth: {
    clientId: config.CLIENT_ID,
    redirectUri: config.REDIRECT_URI,
    authority: config.AUTHORITY,
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
});

const login = () => {
  Azure.loginPopup({
    scopes: config.SCOPES,
    prompt: "select_account",
  })
    .then((res) => {
      const profile = {
        username: res.account.username
          .toLowerCase()
          .replace("@m.materdei.ac.th", ""),
        name: res.account.name.replace(/[0-9]/g, ""),
      };

      localStorage.setItem("profile", JSON.stringify(profile));
      localStorage.setItem("isAuthenticated", true);
      state.value.isAuthenticated = true;
    })
    .catch((err) => console.log(err));
};
</script>

<style scoped>
.image {
  height: 30vh;
  background: url("https://source.unsplash.com/1600x900/?education,quote")
    no-repeat;
  background-size: cover;
}

.container {
  text-align: center;
  max-width: 500px;
  margin: 3em auto;
}

.signInBtn {
  display: flex;
  height: 3em;
  background: var(--white);
  width: 80%;
  margin: 2em auto;
  padding: 0.5em;
  border-radius: 0.5em;
  gap: 1em;
  justify-content: center;
  align-items: center;
  color: var(--dark);
}

img {
  height: 100%;
}
</style>
