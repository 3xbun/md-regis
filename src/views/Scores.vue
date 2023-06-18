<template>
    <div id="scoringPage">
        <div class="export click" @click="exportFile()">
            <font-awesome-icon :icon="['fas', 'cloud-arrow-down']" />
        </div>
        <div class="container">
            <h1>Score</h1>
            <input type="text" placeholder="Search Student ID" v-model="searchID">
            <div class="scores" v-if="Score.id">
                <table>
                    <thead>
                        <tr>
                            <td>Student ID</td>
                            <td class="left">Username</td>
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
                            <td><input type="text" v-model="Score.work1"></td>
                            <td><input type="text" v-model="Score.work2"></td>
                            <td><input type="text" v-model="Score.work3"></td>
                            <td class="click" @click="saveScore()"><font-awesome-icon :icon="['fas', 'floppy-disk']" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="scores">
                <table>
                    <thead>
                        <tr>
                            <td>Student ID</td>
                            <td class="left">Username</td>
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
                            <td>{{ score.work1 }}</td>
                            <td>{{ score.work2 }}</td>
                            <td>{{ score.work3 }}</td>
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
import { Low } from 'lowdb'
import { LocalStorage } from 'lowdb/browser'

import ScoresDB from '../database/Scores';
import { ref } from '@vue/reactivity';
import { onMounted } from 'vue';
import { computed } from '@vue/reactivity';

// Configure lowdb to write data to JSON file
const adapter = new LocalStorage('score')
// const defaultData = { posts: [] }
const lowdb = new Low(adapter, {})

const DB = []
ScoresDB.forEach(element => {
    DB.push(element)
});

localStorage.setItem('score', JSON.stringify(DB))

const Scores = ref({})
const Score = ref({})

const searchID = ref('')

const filteredScores = computed(() => {
    if (Scores.value.length) {
        return Scores.value.filter(score => score.id.startsWith(searchID.value))
    } else {
        return Scores.value
    }
})

const editScore = (id) => {
    Score.value = Scores.value.filter(score => score.id === id)[0]
}

const saveScore = async () => {
    lowdb.data = Scores.value
    const score = lowdb.data.find(e => e.id == Score.value.id)
    console.log(score);
    await lowdb.write()
    Score.value = {}
}


const exportFile = () => {
    const content = "const Scores = " + JSON.stringify(Scores.value) + "\nexport default Scores"
    navigator.clipboard.writeText(content);
}

onMounted(async () => {
    // Read data from JSON file, this will set db.data content
    // If JSON file doesn't exist, defaultData is used instead
    await lowdb.read()

    Scores.value = lowdb.data
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

.export {
    position: fixed;
    bottom: 1em;
    right: 1em;
    font-size: 2em;
    background-color: var(--accent);
    width: 2.5em;
    height: 2.5em;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--dark);
}
</style>