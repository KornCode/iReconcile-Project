<template>
  <div class="hello">
    <div id="align_center" class="w-75" style="display: inline-block;">
      <b-row>
        <b-col sm="8">
          <div>
            <b-spinner v-if="show_spinner" class="mb-3" variant="primary" />
            <b-alert v-if="show_success" show variant="primary">
              <a href="/" class="alert-link"
                >Submitted - Click to redirect to homepage
              </a>
            </b-alert>
            <b-alert v-if="show_failed" show variant="danger"
              >Failed - Try again.</b-alert
            >
          </div>
          <b-card bg-variant="light" style="border-radius: 20px">
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
              <b-form-group
                label-cols-lg="3"
                label-size="lg"
                label-class="font-weight-bold pt-0"
                class="mb-0"
              >
                <div slot="label"><h2>Contacts</h2></div>
                <b-form-group
                  id="email"
                  label-cols-sm="3"
                  description="We'll never share your email with anyone else."
                  label-align-sm="right"
                  label-for="email"
                  type="email"
                  required
                >
                  <div slot="label" v-text="$ml.get('contactEmail')" />
                  <b-form-input
                    id="email"
                    v-model="form.email"
                    placeholder="Enter email"
                  />
                </b-form-group>

                <b-form-group
                  id="name"
                  label-cols-sm="3"
                  description="Let us know your name."
                  label-align-sm="right"
                  label-for="name"
                  type="text"
                  required
                >
                  <div slot="label" v-text="$ml.get('contactName')" />
                  <b-form-input
                    id="name"
                    v-model="form.name"
                    placeholder="Enter name"
                  />
                </b-form-group>

                <b-form-group
                  id="category"
                  label-cols-sm="3"
                  label="Category"
                  label-align-sm="right"
                  label-for="category"
                  type="text"
                  required
                >
                  <div slot="label" v-text="$ml.get('contactCategory')" />
                  <b-form-select
                    id="category"
                    v-model="form.category"
                    :options="categories"
                  />
                </b-form-group>

                <b-form-group
                  id="comment"
                  label-cols-sm="3"
                  label="Comment"
                  label-align-sm="right"
                  label-for="comment"
                  type="textarea"
                  required
                >
                  <div slot="label" v-text="$ml.get('contactComment')" />
                  <b-form-textarea
                    id="inputHorizontal"
                    v-model="form.comment"
                    rows="3"
                    max-rows="6"
                    placeholder="Anything you want to let us know."
                  />
                </b-form-group>

                <b-row class="mb-2 justify-content-md-center">
                  <b-button-toolbar>
                    <b-button-group class="mx-1">
                      <b-button
                        type="submit"
                        variant="primary"
                        v-text="$ml.get('contactSubmitButton')"
                      />
                    </b-button-group>
                    <b-button-group class="mx-1">
                      <b-button
                        type="reset"
                        variant="danger"
                        v-text="$ml.get('contactResetButton')"
                      />
                    </b-button-group>
                  </b-button-toolbar>
                </b-row>
              </b-form-group>
            </b-form>
          </b-card>
        </b-col>
        <b-col sm-4>
          <b-list-group class="overflow-hidden">
            <b-list-group-item
              class="d-flex justify-content-between align-items-center"
              style="border-radius: 20px 20px 0px 0px"
            >
              <!-- <font-awesome-icon icon="phone" /> -->
              <div v-text="$ml.get('contactPhone')" />
              <b-badge variant="primary" pill>090-549-6265</b-badge>
            </b-list-group-item>

            <b-list-group-item
              class="d-flex justify-content-between align-items-center"
              style="border-radius: 0px 0px 20px 20px"
            >
              <div v-text="$ml.get('contactMail')" />
              <b-badge variant="primary" pill>irecon@gmail.co.th</b-badge>
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contact",

  data() {
    return {
      form: {
        email: "",
        name: "",
        comment: "",
        category: null,
        checked: []
      },
      categories: [
        { text: "Select One", value: null },
        "Bug report",
        "Compliment",
        "Other"
      ],
      show: true,

      show_spinner: false,
      show_success: false,
      show_failed: false
    };
  },

  methods: {
    onSubmit(evt) {
      evt.preventDefault();

      this.show_success = false;
      this.show_failed = false;
      this.show_spinner = true;

      let formData = new FormData();
      formData.append("contact", JSON.stringify(this.form));

      this.$http({
        method: "post",
        url: "http://127.0.0.1:5000/contact/",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      })
        .then(() => {
          this.show_spinner = false;
          this.show_success = true;
          this.onReset(evt);
        })
        .catch(() => {
          this.show_spinner = false;
          this.show_success = false;
          this.show_failed = true;
        });
    },
    onReset(evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.email = "";
      this.form.name = "";
      this.form.comment = "";
      this.form.food = null;
      this.form.checked = [];
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

<style scoped>
#align_center {
  margin: 0 auto;
}
</style>
