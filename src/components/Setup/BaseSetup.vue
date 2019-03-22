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
      <transition leave-active-class="animated zoomOut">
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
              v-text="$ml.get('setupParseButton')"
            />
            <div v-show="show_progress">
              <hr class="my-4" />
              <b-progress
                :value="progress_value"
                :max="100"
                height="10px"
                :precision="2"
                show-value
              />
            </div>
          </b-jumbotron>

          <b-col cols="5" class="pl-0 float-left">
            <p class="text-left">
              We need to make sure we got the right columns name, <br />please
              confirm each column name.
            </p>
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
            <p class="text-left">
              Set range of date and range of amount for matching. <br />Set to
              zero for no error.
            </p>
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

              <div class="my-4"></div>

              <b-form-group
                label-cols-lg="3"
                label-size="lg"
                label-class="font-weight-bold pt-0"
                class="mb-0"
                align="left"
              >
                <div slot="label" v-text="$ml.get('setupRangeAmount')" />
                <b-input-group prepend="฿" append=".00">
                  <b-form-input v-model="amount_range" />
                </b-input-group>
                <div class="mt-2" align="left">Value: {{ amount_range }}</div>
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
import { MyFunctions } from "@/MyFunctions.js";

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
      amount_range: 0,

      show_progress: false,
      progress_value: 0,

      show_failed: false,
      error_message: "",

      dismissSecs: 10,
      dismissCountDown: 0
    };
  },

  methods: {
    ...mapActions([
      "showNavDashboard",
      "addFiles",
      "addPairs",
      "addBookAcc",
      "addBankAcc"
    ]),

    submitSetup() {
      /*************************
       * Book
       */
      this.files.book.data.forEach(item => {
        let obj = {
          Date: parseDate(item[this.fields.book.date]),
          Desc: item[this.fields.book.desc],
          Debit: MyFunctions.parseNumber(item[this.fields.book.debit]),
          Credit: MyFunctions.parseNumber(item[this.fields.book.credit]),
          Balance: MyFunctions.parseNumber(item[this.fields.book.balance])
        };

        this.parsed_book.push(obj);
      });

      /*************************
       * Bank
       */
      this.files.bank.forEach((each, index) => {
        each.data.forEach(item => {
          let obj = {
            Date: parseDate(item[this.fields.bank.date[index]]),
            Desc: item[this.fields.bank.desc[index]],
            Deposit: MyFunctions.parseNumber(
              item[this.fields.bank.deposit[index]]
            ),
            Reference: item[this.fields.bank.ref[index]],
            Withdraw: MyFunctions.parseNumber(
              item[this.fields.bank.withdraw[index]]
            ),
            Balance: MyFunctions.parseNumber(
              item[this.fields.bank.balance[index]]
            ),
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
      formData.append("ranges[]", this.date_range);
      formData.append("ranges[]", this.amount_range);

      // State Action Dispatch
      let files_payload = { book: this.parsed_book, bank: this.parsed_bank };
      this.addFiles(files_payload);

      this.show_progress = true;

      this.$http({
        method: "post",
        url: "http://127.0.0.1:5000/main/",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: progEvt => {
          let percentCompleted = Math.round(
            (progEvt.loaded * 100) / progEvt.total
          );
          this.progress_value = percentCompleted;
        }
      })
        .then(obj => {
          let matched = JSON.parse(obj.data);
          this.addPairs(matched);
          this.showNavDashboard(true);
          this.$router.push({ name: "dashboard" });
        })
        .catch(err => {
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
    progress_value(newVal) {
      if (newVal == 100) {
        this.show_setup = false;
      }
    },

    dismissCountDown: function(newVal) {
      if (newVal == 0) {
        location.reload();
      }
    }
  }
};

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
</style>
