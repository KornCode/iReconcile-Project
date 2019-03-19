<template>
  <div class="home">
    <div>
      <div style="display: inline-block;" class="w-75">
        <b-card no-body class="overflow-hidden mt-5" bg-variant="light">
          <b-row no-gutters>
            <b-col md="6">
              <b-card-body>
                <h1>iReconsile</h1>
                <hr />
                <b-card-text>
                  <h3 v-text="$ml.get('homeDescription')" />
                </b-card-text>
              </b-card-body>
              <b-button
                variant="primary"
                to="/uploadfile"
                v-text="$ml.get('homeUploadButton')"
              />
            </b-col>
            <b-col md="6">
              <b-card-img
                :src="require('../assets/G10266-EC.jpg')"
                class="rounded-0"
              />
            </b-col>
          </b-row>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home"
};
</script>

<style scope></style>
