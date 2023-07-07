<template>
    <div id="scoringPage">
        <div class="container">
            <Title title="Scoring" />
            <input class="searchID" type="text" placeholder="Enter Student ID" v-model="searchID">
            <div class="scores" v-if="Score.id">
                <table>
                    <thead>
                        <tr>
                            <td class="studentID">Student ID</td>
                            <td class="left username">Username</td>
                            <td>Attendance</td>
                            <td>Work #1</td>
                            <td>Work #2</td>
                            <td>Work #3</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ Score.id }}</td>
                            <td class="left">{{ Score.username }}</td>
                            <td> {{ Score.atd }} </td>
                            <td><input type="text" v-model="Score.works[0].score"></td>
                            <td><input type="text" v-model="Score.works[1].score"></td>
                            <td><input type="text" v-model="Score.works[2].score"></td>
                            <td class="click" @click="saveScore(Score.id)"><font-awesome-icon
                                    :icon="['fas', 'floppy-disk']" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="scores">
                <table>
                    <thead>
                        <tr>
                            <td class="studentID">Student ID</td>
                            <td class="left username">Username</td>
                            <td>Attendance</td>
                            <td>Work #1</td>
                            <td>Work #2</td>
                            <td>Work #3</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="score in filteredScores">
                            <td>{{ score.id }}</td>
                            <td class="left">{{ score.username }}</td>
                            <td>{{ score.atd }}</td>
                            <td>{{ score.works[0].score }}</td>
                            <td>{{ score.works[1].score }}</td>
                            <td>{{ score.works[2].score }}</td>
                            <td class="click" @click="editScore(score.id)"><font-awesome-icon
                                    :icon="['fas', 'pen-to-square']" />
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

import ScoresDB from '../database/Scores.json';

import { ref } from '@vue/reactivity';
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';

import Title from "../components/Title.vue";

const Scores = ref({})
const Score = ref({})

const baseURL = "http://localhost:3005/Scores/"

const searchID = ref('')

const filteredScores = computed(() => {
    if (Scores.value.length) {
        return Scores.value.filter(score => score.id.startsWith(searchID.value))
    } else {
        return Scores.value
    }
})

const editScore = async (id) => {
    const request = await axios.get(baseURL + id)
    Score.value = request.data
}

const saveScore = async (id) => {
    const payload = Score.value
    payload.lastUpdate = new Date().toISOString()
    axios.patch(baseURL + id, payload)
    Scores.value = ScoresDB.Scores
    Score.value = {}
}

onMounted(() => {
    Scores.value = ScoresDB.Scores
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
    padding: .5em;
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
}

.scores input {
    width: 100%;
    font-size: inherit;
    font-family: inherit;
    text-align: center;
    border: none;
    background-color: var(--light);
    color: var(--white);
    border-radius: 1em;
    padding: .5em;
}

.studentID {
    width: 15%;
}

.username {
    width: 10%;
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
</style>