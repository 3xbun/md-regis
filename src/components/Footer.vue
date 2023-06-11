<template>
  <footer class="drop-shadow">
    <p>
      Made with
      <font-awesome-icon :icon="['fas', 'heart']" class="heart" /> for Mater Dei
      School
    </p>
    <p>
      Copyright &copy;2023
      <a href="https://3xbun.github.io/" target="_black">Bunnasorn Kaewsiri</a>
    </p>
    <p class="version">1.0.0 - Pre Release</p>
  </footer>
</template>

<style scoped>
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--dark);
  color: var(--light);
  padding: 1em 0;
  text-align: center;
}

a {
  color: inherit;
  text-decoration: underline;
}

.heart {
  color: #ff8787;
}
</style>
