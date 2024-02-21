<template>
    <div id="scoringPage">
        <Loading v-if="isLoading" />
        <div class="container">
            <Title title="Scoring" />
            <div class="searchBar">
                <input class="searchID" type="text" placeholder="Enter Student ID" v-model="searchID">
                <p @click="showFailed = !showFailed">≤60</p>
            </div>
            <div class="scores">
                <table>
                    <thead>
                        <tr>
                            <td class="studentID">Student ID</td>
                            <td class="left username">Username</td>
                            <td>Work #1</td>
                            <td>Work #2</td>
                            <td>Work #3</td>
                            <td class="btn"></td>
                        </tr>
                    </thead>
                    <tbody v-if="isEditing">
                        <tr v-for="user in filteredScores">
                            <td>{{ user.stdID }}</td>
                            <td class="left">{{ user.username }}</td>
                            <td><input v-if="user.works[0]" type="text" v-model="user.works[0].score"></td>
                            <td><input v-if="user.works[1]" type="text" v-model="user.works[1].score"></td>
                            <td><input v-if="user.works[2]" type="text" v-model="user.works[2].score"></td>
                            <td class="click" @click="saveScore(user)">
                                <font-awesome-icon :icon="['fas', 'floppy-disk']" />
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr v-for="user in filteredScores">
                            <td>{{ user.stdID }}</td>
                            <td class="left">{{ user.username }}</td>
                            <td v-if="user.works[0]">{{ user.works[0].score }}</td>
                            <td v-if="user.works[1]">{{ user.works[1].score }}</td>
                            <td v-if="user.works[2]">{{ user.works[2].score }}</td>
                            <td class="click" @click="editScore(user.stdID)">
                                <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';

import { ref } from '@vue/reactivity';
import { computed } from '@vue/reactivity';
import { inject, onMounted } from 'vue';

import Title from "../components/Title.vue";
import Loading from '../components/Loading.vue';

import router from "../router";
import config from '../config';

const profile = inject('profile')
const Scores = ref({})
const User = ref([])
const isEditing = ref(false)
const isLoading = ref(false)
const showFailed = ref(false)

const searchID = ref('')

const filteredScores = computed(() => {
    if (showFailed.value) {
        if (Scores.value.length) {
            return Scores.value.filter(score => parseInt(score.works[0].score) + parseInt(score.works[1].score) + parseInt(score.works[2].score) <= 60)
        } else {
            return Scores.value
        }
    } else {
        if (Scores.value.length) {
            return Scores.value.filter(score => score.stdID.startsWith(searchID.value))
        } else {
            return Scores.value
        }
    }
})

const editScore = async (id) => {
    searchID.value = id
    User.value = Scores.value.filter(user => user.stdID == searchID.value)
    isEditing.value = true
}

const saveScore = async (user) => {
    const payload = user
    isLoading.value = true
    axios.patch(config.API_URL + user.username, payload).then(res => {
        isEditing.value = false
        searchID.value = ''
        isLoading.value = false
        router.go(0)
    }).catch(err => console.log(err))
}

onMounted(() => {
    if (profile.value.username !== 'bunnasorn.k') {
        window.location.replace("https://httpstatusdogs.com/img/403.jpg")
    }

    axios.get(config.API_URL).then(res => Scores.value = res.data)
})

</script>

<style scoped>
.container {
    text-align: center;
    width: 90vw;
    margin: 3em auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin: 1em 0;
    font-size: 1.5em;
}

thead {
    font-weight: bold;
}

thead tr {
    background-color: var(--primary);
    color: #ffffff;
}

th,
td {
    padding: .5em 0;
}

td {
    width: 15%;
}

.left {
    text-align: left;
}

tbody tr:nth-of-type(even) {
    background-color: #3d4a7d;
}

tbody tr:hover {
    background-color: #6277c9;
}

.click {
    cursor: pointer;
    padding: .5em;
}

.btn {
    width: 5%;
}


.scores input {
    font-size: inherit;
    font-family: inherit;
    text-align: center;
    border: none;
    background-color: var(--light);
    color: var(--white);
    border-radius: 1em;
    width: 100%;
}

.searchID {
    width: 100%;
    font-size: 1.5em;
    font-family: inherit;
    border: none;
    border-radius: .5em;
    padding: .5em;
    text-align: center;
    margin: 1em 0;
    background-color: var(--light);
    color: var(--white);
}

::placeholder {
    color: inherit;
}

.studentID {
    width: 15%;
}

.username {
    width: 20%;
}

.searchBar {
    display: flex;
    align-items: center;
    gap: 1em;
}

.searchBar p {
    font-size: 1.5em;
    background-color: #dc3545;
    padding: .5em;
    border-radius: .5em;
    cursor: pointer;
}
</style>