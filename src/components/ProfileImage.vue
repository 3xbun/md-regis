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
    width: 20vw;
    margin: 1em auto 0;
}

img {
    width: 100%;
    border-radius: 1em;
}
</style>