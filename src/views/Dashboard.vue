<template>
  <div class="upload">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <div style="display: inline-block;"> -->
    <Dashboard />
    <!-- </div> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Dashboard from "@/components/TheDashboard.vue";

export default {
  name: "dashboard",
  components: {
    Dashboard
  }
};
</script>
