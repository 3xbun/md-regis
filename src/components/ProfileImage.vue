<template>
    <div class="profileImage">
        <img :src="profileSrc" />
    </div>
</template>

<script setup>
import { inject, computed } from 'vue';

const profile = inject("profile");

const profileSrc = computed(
    () => "https://api.dicebear.com/6.x/thumbs/svg?seed=" + profile.value.username
);
</script>

<style scoped>
.profileImage {
    width: 100%;
    height: 15vh;
    margin: 1em auto 0;
    text-align: center;
}

img {
    height: 100%;
    border-radius: 1em;
}
</style>