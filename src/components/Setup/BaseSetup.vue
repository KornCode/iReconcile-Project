<template>
  <div class="setupfile">
    <div id="align_center" class="w-75">
      <b-alert
        v-if="show_failed"
        :show="dismissCountDown"
        dismissible
        variant="danger"
        @dismissed="dismissCountDown = 0"
        @dismiss-count-down="countDownChanged"
      >
        <p class="text-left">An error occured - {{ error_message }}</p>

        <hr />
        <b-progress
          variant="secondary"
          :max="dismissSecs"
          :value="dismissCountDown"
          height="4px"
        />
      </b-alert>
    </div>

    <div style="display: inline-block;" class="w-75">
      <transition leave-active-class="animated fadeOutUpBig">
        <div v-show="show_setup">
          <b-jumbotron
            class="pt-4 pb-4 shadow-sm"
            bg-variant="dark"
            text-variant="light"
            style="border-radius: 10px"
          >
            <div slot="header" v-text="$ml.get('setupHeader')" />
            <b-button
              variant="primary"
              class="w-25 mt-2"
              @click="submitSetup()"
              style="border-radius: 30px"
              v-text="$ml.get('setupParseButton')"
            />
            <div v-show="show_progress">
              <hr class="my-4" />
              <div class="text-center">
                <b-spinner type="grow" label="Spinning"></b-spinner>
                <b-spinner
                  variant="primary"
                  type="grow"
                  label="Spinning"
                ></b-spinner>
                <b-spinner
                  variant="success"
                  type="grow"
                  label="Spinning"
                ></b-spinner>
              </div>
            </div>
          </b-jumbotron>

          <b-col cols="5" class="pl-0 float-left">
            <p class="text-left" v-text="$ml.get('setupColStatement')" />
            <hr />

            <div class="pt-3" align="left">
              <h3 v-text="$ml.get('setupBookStatement')" />
            </div>
            <b-list-group class="shadow-sm">
              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <div class="col_header" v-text="$ml.get('setupBookDate')" />
                <div class="w-50 float-left">
                  <b-form-select
                    v-model="fields.book.date"
                    :options="columns.book"
                  />
                </div>
              </b-list-group-item>

              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <div
                  class="col_header"
                  v-text="$ml.get('setupBookDescription')"
                />
                <div class="w-50 float-left">
                  <b-form-select
                    v-model="fields.book.desc"
                    :options="columns.book"
                  />
                </div>
              </b-list-group-item>

              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <div class="col_header" v-text="$ml.get('setupBookDebit')" />
                <div class="w-50 float-left">
                  <b-form-select
                    v-model="fields.book.debit"
                    :options="columns.book"
                  />
                </div>
              </b-list-group-item>

              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <div class="col_header" v-text="$ml.get('setupBookCredit')" />
                <div class="w-50 float-left">
                  <b-form-select
                    v-model="fields.book.credit"
                    :options="columns.book"
                  />
                </div>
              </b-list-group-item>

              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <div class="col_header" v-text="$ml.get('setupBookBalance')" />
                <div class="w-50 float-left">
                  <b-form-select
                    v-model="fields.book.balance"
                    :options="columns.book"
                  />
                </div>
              </b-list-group-item>
            </b-list-group>

            <div class="my-4"></div>
            <hr />

            <div v-for="(each_bank, index) in columns.bank" :key="index">
              <div class="my-2"></div>
              <div class="pt-3" align="left">
                <h3 v-text="$ml.get('setupBankStatement')" />
                <p>{{ fileNames.bank[index] }}</p>
              </div>
              <b-list-group class="shadow-sm">
                <b-list-group-item
                  class="d-flex justify-content-between align-items-center"
                >
                  <div class="col_header" v-text="$ml.get('setupBankDate')" />
                  <div class="w-50 float-left">
                    <b-form-select
                      v-model="fields.bank.date[index]"
                      :options="each_bank"
                    />
                  </div>
                </b-list-group-item>

                <b-list-group-item
                  class="d-flex justify-content-between align-items-center"
                >
                  <div
                    class="col_header"
                    v-text="$ml.get('setupBankDescription')"
                  />
                  <div class="w-50 float-left">
                    <b-form-select
                      v-model="fields.bank.desc[index]"
                      :options="each_bank"
                    />
                  </div>
                </b-list-group-item>

                <b-list-group-item
                  class="d-flex justify-content-between align-items-center"
                >
                  <div
                    class="col_header"
                    v-text="$ml.get('setupBankReference')"
                  />
                  <div class="w-50 float-left">
                    <b-form-select
                      v-model="fields.bank.ref[index]"
                      :options="each_bank"
                    />
                  </div>
                </b-list-group-item>

                <b-list-group-item
                  class="d-flex justify-content-between align-items-center"
                >
                  <div
                    class="col_header"
                    v-text="$ml.get('setupBankDeposit')"
                  />
                  <div class="w-50 float-left">
                    <b-form-select
                      v-model="fields.bank.deposit[index]"
                      :options="each_bank"
                    />
                  </div>
                </b-list-group-item>

                <b-list-group-item
                  class="d-flex justify-content-between align-items-center"
                >
                  <div
                    class="col_header"
                    v-text="$ml.get('setupBankWithdraw')"
                  />
                  <div class="w-50 float-left">
                    <b-form-select
                      v-model="fields.bank.withdraw[index]"
                      :options="each_bank"
                    />
                  </div>
                </b-list-group-item>

                <b-list-group-item
                  class="d-flex justify-content-between align-items-center"
                >
                  <div
                    class="col_header"
                    v-text="$ml.get('setupBankBalance')"
                  />
                  <div class="w-50 float-left">
                    <b-form-select
                      v-model="fields.bank.balance[index]"
                      :options="each_bank"
                    />
                  </div>
                </b-list-group-item>
              </b-list-group>
            </div>
          </b-col>

          <b-col cols="7" class="pr-0 float-right">
            <p class="text-left" v-text="$ml.get('setupColRange')" />
            <hr />

            <div class="pt-3" align="left">
              <h3 v-text="$ml.get('setupRange')" />
            </div>
            <b-card class="shadow-sm">
              <b-form-group
                label-cols-lg="3"
                label-size="lg"
                label-class="font-weight-bold pt-0"
                class="mb-0"
                align="left"
              >
                <div slot="label" v-text="$ml.get('setupRangeDate')" />
                <b-input-group prepend="0" append="30">
                  <b-form-input
                    type="range"
                    v-model="date_range"
                    min="0"
                    max="30"
                    step="1"
                  />
                </b-input-group>
                <div class="mt-2" align="left">Value: {{ date_range }}</div>
              </b-form-group>
            </b-card>
          </b-col>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Papa from "papaparse";
import Chrono from "chrono-node";

import { mapActions } from "vuex";

export default {
  name: "Setup",

  props: {
    files: {
      type: Object,
      required: true
    },
    fields: {
      type: Object,
      required: true
    },
    columns: {
      type: Object,
      required: true
    },
    fileNames: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      show_setup: true,

      parsed_book: [],
      parsed_bank: [],

      date_range: 0,

      show_progress: false,

      /*****
       * Error handler variables
       */
      show_failed: false,
      error_message: "",
      dismissSecs: 10,
      dismissCountDown: 0
    };
  },

  methods: {
    ...mapActions(["showNavDashboard", "addFiles", "addBookAcc", "addBankAcc"]),

    submitSetup() {
      /******************
       * Book
       */
      this.files.book.data.forEach(item => {
        let obj = {
          Date: parseDate(item[this.fields.book.date]),
          Desc: item[this.fields.book.desc],
          Debit: str_to_number(item[this.fields.book.debit]),
          Credit: str_to_number(item[this.fields.book.credit]),
          Balance: str_to_number(item[this.fields.book.balance])
        };

        this.parsed_book.push(obj);
      });

      /******************
       * Bank
       */
      this.files.bank.forEach((each, index) => {
        each.data.forEach(item => {
          let obj = {
            Date: parseDate(item[this.fields.bank.date[index]]),
            Desc: item[this.fields.bank.desc[index]],
            Deposit: str_to_number(item[this.fields.bank.deposit[index]]),
            Reference: item[this.fields.bank.ref[index]],
            Withdraw: str_to_number(item[this.fields.bank.withdraw[index]]),
            Balance: str_to_number(item[this.fields.bank.balance[index]]),
            Bank_Entity: this.fileNames.bank[index]
          };

          this.parsed_bank.push(obj);
        });
      });

      this.addAccounts();
      this.uploadFile();
    },

    addAccounts() {
      this.addBookAcc(this.fileNames.book);
      this.addBankAcc(this.fileNames.bank);
    },

    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },

    uploadFile() {
      let formData = new FormData();
      formData.append("file_book", Papa.unparse(this.parsed_book));
      formData.append("file_bank", Papa.unparse(this.parsed_bank));
      formData.append("date_range", this.date_range);

      // State Action Dispatch
      let files_payload = { book: this.parsed_book, bank: this.parsed_bank };
      this.addFiles(files_payload);

      // toggle progress bar
      this.show_progress = true;

      this.$http({
        method: "post",
        url: "http://127.0.0.1:5000/main/",
        // url: "https://3b7915af.ngrok.io/main/",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      })
        .then(obj => {
          let matched = JSON.parse(obj.data[0]);
          let grouped = JSON.parse(obj.data[1]);
          let remains = { book: obj.data[2], bank: obj.data[3] };
          this.$store.dispatch("Match/addPairs", matched);
          this.$store.dispatch("Match/addGroups", grouped);
          this.$store.dispatch("Unmatch/addRemains", remains);
          this.showNavDashboard(true);
          this.$router.push({ name: "dashboard" });
        })
        .catch(err => {
          // initiate count down
          this.dismissCountDown = this.dismissSecs;
          this.show_progress = false;
          this.show_failed = true;

          if (err.response) {
            this.error_message =
              "The request was made and the server responded with a status code " +
              err.response.status;
          } else if (err.request) {
            this.error_message =
              "The request was made but no response was received";
          } else {
            this.error_message =
              "Something happened in setting up the request that triggered an Error";
          }
        });
    }
  },

  watch: {
    /*****
     * Error handler variables
     */
    dismissCountDown: function(newVal) {
      if (newVal == 0) {
        location.reload();
      }
    }
  }
};

function str_to_number(number) {
  return number && +(number.replace(",", ""));
}

function parseDate(date_str) {
  var date = Chrono.parseDate(date_str).toString();
  return date
    .split(" ")
    .slice(1, 4) // DD Month YYYY
    .join(" ");
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.col_header {
  font-size: 18px;
  font-weight: bold;
}

#align_center {
  margin: 0 auto;
}

hr {
  border-top: 1px solid #000;
}
</style>
