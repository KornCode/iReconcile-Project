<template>
  <div class="upload">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <div style="display: inline-block;"> -->
    <Upload />
    <!-- </div> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Upload from "@/components/TheUpload.vue";

export default {
  name: "upload",
  components: {
    Upload
  }
};
</script>
