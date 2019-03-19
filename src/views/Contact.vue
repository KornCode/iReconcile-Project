<template>
  <div class="contact">
    <Contact />
  </div>
</template>

<script>
// @ is an alias to /src
import Contact from "@/components/TheContact.vue";

export default {
  name: "contact",
  components: {
    Contact
  }
};
</script>

<style scoped>
html {
  background: url(../assets/wallpaper.jpg) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
