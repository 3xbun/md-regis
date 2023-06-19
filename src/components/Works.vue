<template>
    <div class="works">
        <h1>Works</h1>
        <ul>
            <li class="work" v-for="work in myScore" :key="work.workID">
                <div class="top">
                    <p>{{ workDetail(work.workID).title }}</p>
                    <p>
                        <span id="score">{{ myScore['work' + work.workID] }} {{ getScore(work.workID) }}</span>/{{
                            workDetail(work.workID).totalScore
                        }}
                    </p>
                </div>
                <div class="notion">
                    <a :href="workDetail(work.workID).notion" target="_blank">View In Notion</a>
                    <img src="https://logos-download.com/wp-content/uploads/2019/06/Notion_App_Logo.png">
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { inject, computed, onMounted, ref } from 'vue';

import Scores from '../database/Scores.json';
import Works from '../database/Works.json';
import Students from '../database/Students.json';

import axios from 'axios';

const profile = inject("profile");
const baseURL = "http://localhost:3005/Scores/"
const studentID = computed(() => Students.data.filter(std => std.username === profile.value.username)[0].id)

const workDetail = (id) => {
    return {
        title: Works.data.filter(w => w.workID == id)[0].title,
        totalScore: Works.data.filter(w => w.workID == id)[0].score,
        notion: Works.data.filter(w => w.workID == id)[0].notion
    }
}

const getScore = (id) => {
    return myScore.value.filter(w => w.workID == id)[0].score
}

const myScore = ref({})

onMounted(async () => {
    const request = await axios.get(baseURL + studentID.value)
    myScore.value = Scores.Scores.filter(s => s.username === profile.value.username)[0].works
})
</script>

<style scoped>
.works {
    margin: 1em 0;
}

.works ul {
    display: flex;
    flex-direction: column;
    gap: 1em;
}

.work {
    background-color: var(--white);
    color: var(--dark);
    padding: 0.5em;
    border-radius: 0.5em;
}

.work .top {
    display: flex;
    justify-content: space-between;
}

.notion {
    text-align: right;
    height: 2vh;
    display: flex;
    gap: .5em;
    justify-content: flex-end;
    align-items: center;
}

#score {
    font-weight: bold;
    color: var(--primary);
}

img {
    height: 100%;
    filter: invert(89%) sepia(8%) saturate(5241%) hue-rotate(172deg) brightness(90%) contrast(90%);
}

a {
    color: var(--light);
}
</style>