<template>
  <div id="loginPage">
    <div class="container">
      <Header />
      <br />
      <h1 class="subtitle">Register</h1>
      <table class="form">
        <tr>
          <td>ID:</td>
          <td>
            <strong
              ><input
                @click="isDup = false"
                :class="{ error: isDup }"
                type="text"
                v-model="stdID"
            /></strong>
          </td>
        </tr>
        <tr>
          <td>Name:</td>
          <td>
            <strong>{{ profile.name }}</strong>
          </td>
        </tr>
        <tr>
          <td>Username:</td>
          <td>
            <strong>{{ profile.username }}</strong>
          </td>
        </tr>
        <tr>
          <td>Secret:</td>
          <td>
            <strong
              ><input
                @click="wrongpassword = false"
                :class="{ error: wrongpassword }"
                type="text"
                v-model="password"
            /></strong>
          </td>
        </tr>
      </table>
      <div class="btn" @click="register()">Register</div>
      <!-- <Register /> -->
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
// import Register from '../components/RegisterForm.vue';

import { inject, onMounted, ref } from "vue";
import axios from "axios";
import { PublicClientApplication } from "@azure/msal-browser";
import router from "../router";
import config from "../config";
import { listRecords, createRecord, TABLES } from "../api/nocodb";

const profile = inject("profile");
const state = inject("state");

const stdID = ref("");
const isDup = ref(false);
const wrongpassword = ref(false);
const password = ref("");

const register = async () => {
  if (password.value !== "serviam") {
    wrongpassword.value = true;
    return;
  }

  try {
    const existing = await listRecords(TABLES.allScore, {
      where: `(studentID,eq,${stdID.value})`,
      pageSize: 1,
    });
    if (existing.length > 0) {
      isDup.value = true;
      return;
    }

    const [f_Name, ...rest] = (profile.value.name || "").split(" ");
    await createRecord(TABLES.allScore, {
      studentID: stdID.value,
      f_Name: f_Name,
      l_Name: rest.join(" "),
      cube: 0,
      quiz: 0,
      sketch: 0,
      project: 0,
    });
    router.push("/");
  } catch (err) {
    console.error(err);
  }
};

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
    profile.value = account;

    localStorage.setItem("profile", JSON.stringify(account));
    localStorage.setItem("isAuthenticated", true);

    router.push("/dashboard");
  }
};

Azure.handleRedirectPromise().then(handleResponse);

const login = () => {
  Azure.loginRedirect(config.SCOPES);
};

onMounted(() => {
  profile.value = JSON.parse(localStorage.getItem("profile"));
});
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
  padding: 0.5em;
}

.btn {
  text-decoration: underline;
}

input {
  font-family: inherit;
  font-size: inherit;
  padding: 0.5em;
  border: none;
  border-radius: 0.5em;
}

input.error {
  background-color: #cb3232;
  color: #feeded;
}
</style>
