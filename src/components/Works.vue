<template>
    <div class="works">
        <h1>Works</h1>
        <ul>
            <li class="work" v-for="work in WorksDB" :key="work.workID">
                <div class="top">
                    <p>{{ work.title }}</p>
                    <p>
                        <span id="score">{{ myScore[work.workID] }}</span>/{{ work.score }}
                    </p>
                </div>
                <div class="notion">
                    <!-- <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Notion-logo.svg/1024px-Notion-logo.svg.png"> -->
                    <a :href="work.notion" target="_blank">View In Notion</a>
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
}

#score {
    font-weight: bold;
    color: var(--primary);
}
</style>