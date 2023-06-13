<template>
    <p @click="logout()" class="logout btn">Logout</p>
</template>

<script setup>
import { inject } from 'vue';
import { PublicClientApplication } from "@azure/msal-browser";

import config from "../config";
import router from "../router";

const state = inject("state");
const profile = inject("profile");

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

const logout = () => {
    router.push('/login')
    state.value.isAuthenticated = false;
    profile.value = {};
    localStorage.clear();
    sessionStorage.clear();
    Azure.logoutRedirect();
};
</script>

<style scoped>
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