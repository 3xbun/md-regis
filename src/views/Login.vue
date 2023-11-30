<template>
  <div id="loginPage">
    <div class="container">
      <Header />
      <br>
      <h1 class="subtitle">WELCOME</h1>
      <LoginForm />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
import LoginForm from "../components/LoginForm.vue";
</script>

<style scoped>
.container {
  text-align: center;
  max-width: 500px;
  margin: 3em auto;
}
</style>
