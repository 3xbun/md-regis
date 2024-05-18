<template>
  <div id="loginPage">
    <div class="container">
      <Header />
      <br>
      <h1 class="subtitle">Register</h1>
      <table class="form">
        <tr>
          <td>ID: </td>
          <td>
            <strong><input @click="isDup = false" :class="{ error: isDup }" type="text" v-model="stdID"></strong>
          </td>
        </tr>
        <tr>
          <td>Name: </td>
          <td><strong>{{ profile.name }}</strong></td>
        </tr>
        <tr>
          <td>Username: </td>
          <td><strong>{{ profile.username }}</strong></td>
        </tr>
        <tr>
          <td>Secret: </td>
          <td>
            <strong><input @click="wrongpassword = false" :class="{ error: wrongpassword }" type="text"
                v-model="password"></strong>
          </td>
        </tr>
      </table>
      <div class="btn" @click="register()">Register </div>
      <!-- <Register /> -->
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
// import Register from '../components/RegisterForm.vue';

import { ref, inject, onMounted } from 'vue';
import axios from 'axios';
import { PublicClientApplication } from "@azure/msal-browser";

import config from '../config';

const profile = inject("profile");
const state = inject("state");

const stdID = ref('')
const isDup = ref(false)
const wrongpassword = ref(false)
const password = ref("")
import router from "../router";

const register = () => {
  if (password.value === 'serviam') {
    const payload = {
      stdID: stdID.value,
      username: profile.value.username
    }

    axios.get(config.API_URL + "id/" + stdID.value).then(res => {
      if (res.status == 200) {
        isDup.value = true
      }
    }).catch(err => {
      if (err.response.status == 404) {
        axios.post(config.API_URL, payload).then(res => {
          console.log(res);
          if (res.status == 200) {
            login()
          }
        })
      }
    })
  }

  else {
    wrongpassword.value = true
  }
}


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

const handleResponse = (res) => {
  if (res !== null) {
    const account = {
      username: res.account.username
        .toLowerCase()
        .replace("@m.materdei.ac.th", ""),
      name: res.account.name.replace(/[0-9]/g, ""),
    };

    state.value.isAuthenticated = true;
    profile.value = account

    localStorage.setItem("profile", JSON.stringify(account));
    localStorage.setItem("isAuthenticated", true);

    router.push("/dashboard");
  }
}

Azure.handleRedirectPromise().then(handleResponse);

const login = () => {
  Azure.loginRedirect(config.SCOPES)
};

onMounted(() => {
  profile.value = JSON.parse(localStorage.getItem("profile"))
})
</script>

<style scoped>
.container {
  text-align: center;
  max-width: 500px;
  margin: 3em auto;
}

table {
  width: 100%;
}

td:first-child {
  text-align: right;
}

td {
  text-align: left;
  padding: .5em;
}

.btn {
  text-decoration: underline;
}

input {
  font-family: inherit;
  font-size: inherit;
  padding: .5em;
  border: none;
  border-radius: .5em;
}

input.error {
  background-color: #cb3232;
  color: #feeded;
}
</style>
