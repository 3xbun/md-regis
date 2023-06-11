<template>
  <footer>
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
  color: var(--light);
  padding-bottom: 1em;
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
