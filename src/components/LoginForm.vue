<template>
    <div class="signInBtn btn drop-shadow" @click="login()">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png?20210729021049"
            alt="" class="logo" />
        <strong>Sign In With Office365</strong>
    </div>
</template>

<script setup>
import { inject } from "vue";
import { PublicClientApplication } from "@azure/msal-browser";

import config from "../config";
import router from "../router";

const profile = inject("profile");
const state = inject("state");

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

        router.push("/");
    }
}

Azure.handleRedirectPromise().then(handleResponse);

const login = () => {
    Azure.loginRedirect(config.SCOPES)
};
</script>

<style scoped>
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