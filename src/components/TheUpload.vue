<template>
  <div class="upload">
    <div id="align_center" class="w-50 center-xy">
      <transition leave-active-class="animated fadeOutUpBig">
        <div v-show="show_upload">
          <b-card-group deck>
            <b-card
              class="overflow-hidden shadow-sm"
              border-variant="dark"
              header-border-variant="dark"
              header-tag="header"
              header-bg-variant="dark"
              header-text-variant="light"
              body-bg-variant="light"
              style="border-radius: 30px;"
            >
              <h3
                slot="header"
                class="mb-0"
                v-text="$ml.get('uploadHeader')"
              ></h3>

              <b-card-body>
                <b-row class="mb-4 justify-content-md-center">
                  <b-col md="10">
                    <b-form-file
                      accept=".csv"
                      v-model="file_book"
                      :state="Boolean(file_book)"
                      ref="file_book"
                      placeholder="Ledger statement..."
                    />
                    <b-tooltip
                      :target="() => $refs.file_book"
                      placement="rightbottom"
                      title="Support single file"
                    />
                  </b-col>
                </b-row>

                <b-row class="mb-4 justify-content-md-center">
                  <b-col md="10">
                    <b-form-file
                      accept=".csv"
                      v-model="file_bank"
                      :state="Boolean(file_bank)"
                      :multiple="Boolean(true)"
                      ref="file_bank"
                      placeholder="Bank statements..."
                    />
                    <b-tooltip
                      :target="() => $refs.file_bank"
                      placement="rightbottom"
                      title="Support multiple files"
                    />
                    <div class="mt-3">
                      <font-awesome-icon icon="file-csv" />
                      Bank files: {{ file_bank && file_bank.length }}
                    </div>
                  </b-col>
                </b-row>

                <b-row class="mb-2 justify-content-md-center">
                  <b-button-toolbar>
                    <b-button-group class="mx-1">
                      <b-button
                        @click="clearBook"
                        variant="outline-secondary"
                        v-text="$ml.get('uploadClearLedger')"
                      />
                    </b-button-group>
                    <b-button-group class="mx-1">
                      <b-button
                        @click="clearBank"
                        variant="outline-secondary"
                        v-text="$ml.get('uploadClearBanks')"
                      />
                    </b-button-group>
                  </b-button-toolbar>
                </b-row>
              </b-card-body>

              <div slot="footer" align="center">
                <b-button
                  @click="submitFiles"
                  variant="success"
                  class="btn-lg btn-block"
                  v-text="$ml.get('uploadReview')"
                  style="border-radius: 30px;"
                />
              </div>
            </b-card>
          </b-card-group>

          <div class="my-4"></div>
        </div>
      </transition>
    </div>

    <transition enter-active-class="animated fadeInUpBig">
      <Setup
        v-if="show_setupfile"
        :files="files"
        :fields="fields"
        :columns="columns"
        :fileNames="file_names"
      />
    </transition>
  </div>
</template>

<script>
import fuzz from "fuzzball";
import Papa from "papaparse";

import Setup from "@/components/Setup/BaseSetup.vue";
import { MyFunctions } from "@/MyFunctions.js";
import { mapActions } from "vuex";

export default {
  name: "Upload",

  components: {
    Setup
  },

  data() {
    return {
      /*****
       * Form inputs
       */
      file_book: null,
      file_bank: null,

      /*****
       * show and hide components
       */
      show_upload: true,
      show_setupfile: false,

      /*****
       * Data sending to props
       */
      files: {
        book: null,
        bank: null
      },
      fields: {
        book: {
          date: null,
          desc: null,
          debit: null,
          credit: null,
          balance: null
        },
        bank: {
          date: [],
          desc: [],
          ref: [],
          deposit: [],
          withdraw: [],
          balance: []
        }
      },
      columns: {
        book: null,
        bank: []
      },
      file_names: {
        book: null,
        bank: null
      }
    };
  },

  methods: {
    ...mapActions(["addRawFiles"]),

    submitFiles() {
      if (this.file_book && this.file_bank) {
        let parseBookPromise = file => {
          return new Promise((complete, error) => {
            Papa.parse(file, {
              complete,
              error,
              header: true
            });
          });
        };

        let parseBankPromise = file => {
          let combined = [];
          file.forEach(val => {
            let each_bank = new Promise((complete, error) => {
              Papa.parse(val, {
                complete,
                error,
                header: true
              });
            });
            combined.push(each_bank);
          });
          return Promise.all(combined);
        };

        let parseAllPromise = async () => {
          let [err, res] = await MyFunctions.handle(
            Promise.all([
              parseBookPromise(this.file_book),
              parseBankPromise(this.file_bank)
            ])
          );
          if (err || !res) {
            throw new Error("An error parsing document.");
          }

          return { parsedBook: res[0], parsedBank: res[1] };
        };

        parseAllPromise()
          .then(payload => {
            this.retrieveData(payload);
          })
          .then(() => {
            this.selectColumnToken();
          })
          .then(() => {
            this.toggleSetupComponent();
          })
          .catch(err => {
            alert(err);
            location.reload();
          });
      } else {
        alert("Form is empty.");
      }
    },

    retrieveData(payload) {
      this.addRawFiles({ book: payload.parsedBook, banks: payload.parsedBank });

      // Prop data (files) -------------
      this.files.book = payload.parsedBook;
      this.files.bank = payload.parsedBank;
      // -------------------------------

      // Prop data (columns) -----------
      this.columns.book = Object.keys(payload.parsedBook.data[0]);
      this.columns.bank = payload.parsedBank.map(o => Object.keys(o.data[0]));
      // -------------------------------

      // Prop data (file_names) --------
      this.file_names.book = getAccName(this.file_book);
      this.file_names.bank = this.file_bank.map(acc => getAccName(acc));
      // -------------------------------
    },

    selectColumnToken() {
      let token_book = new BookColumns(this.columns.book);

      this.fields.book.date = token_book.selectDate;
      this.fields.book.desc = token_book.selectDesc;
      this.fields.book.debit = token_book.selectDebit;
      this.fields.book.credit = token_book.selectCredit;
      this.fields.book.balance = token_book.selectBalance;

      for (var i = 0, len = this.columns.bank.length; i < len; i++) {
        let token_bank = new BankColumns(this.columns.bank[i]);
        this.fields.bank.date.push(token_bank.selectDate);
        this.fields.bank.desc.push(token_bank.selectDesc);
        this.fields.bank.ref.push(token_bank.selectReference);
        this.fields.bank.deposit.push(token_bank.selectDeposit);
        this.fields.bank.withdraw.push(token_bank.selectWithdraw);
        this.fields.bank.balance.push(token_bank.selectBalance);
      }
    },

    toggleSetupComponent() {
      this.show_upload = false;
      this.show_setupfile = true;
    },

    clearBook() {
      this.$refs.file_book.reset();
    },
    clearBank() {
      this.$refs.file_bank.reset();
    }
  }
};

class TokenSetRatio {
  constructor(columns) {
    this.columns = columns;
  }

  get selectDesc() {
    return this.token_set_ratio("Description");
  }
  get selectDate() {
    return this.token_set_ratio("Date");
  }
  get selectBalance() {
    return this.token_set_ratio("Balance");
  }

  token_set_ratio(select_col) {
    let result = this.columns.find(o => {
      return fuzz.token_set_ratio(o, select_col) > 80 ? true : false;
    });
    return result;
  }
}

class BookColumns extends TokenSetRatio {
  constructor(columns) {
    super(columns);
  }

  get selectDebit() {
    return this.token_set_ratio("Debit");
  }
  get selectCredit() {
    return this.token_set_ratio("Credit");
  }
}

class BankColumns extends TokenSetRatio {
  constructor(columns) {
    super(columns);
  }

  get selectDeposit() {
    return this.token_set_ratio("Deposit");
  }
  get selectWithdraw() {
    return this.token_set_ratio("Withdraw");
  }
  get selectReference() {
    return this.token_set_ratio("Reference");
  }
}

function getAccName(account) {
  return account.name
    .split(".")
    .slice(0, -1)
    .join(".");
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#align_center {
  margin: 0 auto;
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
