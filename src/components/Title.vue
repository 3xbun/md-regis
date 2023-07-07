<template>
    <header class="drop-shadow">
        <h1>{{ title }}</h1>
    </header>
</template>

<script setup>
const props = defineProps({ title: String })
</script>

<style scoped>
header {
    background: var(--primary);
    padding: 1em;
}
</style>