<template>
    <div class="works">
        <h1>Works</h1>
        <ul>
            <li class="work" v-for="work in WorksDB" :key="work.workID">
                <div class="top">
                    <p>{{ work.title }}</p>
                    <p>
                        <span id="score">{{ myScore['work' + work.workID] }}</span>/{{ work.score }}
                    </p>
                </div>
                <div class="notion">
                    <a :href="work.notion" target="_blank">View In Notion</a>
                    <img src="https://logos-download.com/wp-content/uploads/2019/06/Notion_App_Logo.png">
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { inject, computed } from 'vue';

import WorksDB from '../database/Works';
import ScoresDB from '../database/Scores';

const profile = inject("profile");

const myScore = computed(() => ScoresDB.filter((score) => score.username === profile.value.username)[0])
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