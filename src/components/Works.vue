<template>
    <div class="works">
        <h1>Works</h1>
        <ul>
            <li class="work" v-for="work in Works" :key="work.workID">
                <div class="top">
                    <p>{{ work.title }}</p>
                    <p>
                        <span id="score" v-if="profile.works">
                            {{ getScore(work.workID) }}
                        </span>/{{
                work.score
            }}
                    </p>
                </div>
                <div class="notion">
                    <a :href="work.ref" target="_blank">View In Notion</a>
                    <img src="https://logos-download.com/wp-content/uploads/2019/06/Notion_App_Logo.png">
                </div>
            </li>
        </ul>
        <br>
        
        <p class="lastUpdate">Last Update: {{ lastUpdate() }}</p>
    </div>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import axios from 'axios';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import config from '../config';

const Works = ref([])
const profile = inject("profile");

const getScore = (id) => profile.value.works.length > 0 ? profile.value.works.filter(w => w.workID == id)[0].score : 0

const lastUpdate = () => {
    dayjs.extend(relativeTime)
    return dayjs(profile.value.updatedAt).fromNow()
}

onMounted(() => {
    axios.get(config.API_URL + "works").then(res => {
        Works.value = res.data
        // profile.value = { ...profile.value, ...res.data }
    }).catch(err => {
        console.error(err);
        externalError.value = {
            isError: true,
            code: err.response.status
        }
    })
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

.lastUpdate {
    margin-top: 1em;
    text-align: right;
    color: var(--light);
}

.project {
    display: flex;
    flex-direction: row !important;
    justify-content: space-between;
    gap: .5em !important;
}

.project li {
    width: 100%;
    text-align: center;
}
</style>