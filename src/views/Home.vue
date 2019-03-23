<template>
  <div class="home">
    <div style="display: inline-block;" class="w-75 center-xy">
      <b-card
        no-body
        class="overflow-hidden shadow-sm"
        bg-variant="dark"
        text-variant="light"
        style="border-radius: 50% 20% / 10% 40%;"
      >
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
              variant="outline-info"
              size="lg"
              to="/uploadfile"
              v-text="$ml.get('homeUploadButton')"
              style="border-radius: 30px;"
              class="mt-4"
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
</template>

<script>
// @ is an alias to /src

export default {
  name: "home"
};
</script>

<style scope>
hr {
  border-top: 1px solid #fff;
}
.center-xy {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
