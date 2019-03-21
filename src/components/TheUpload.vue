<template>
  <div class="upload page">
    <div id="align_center" class="w-50">
      <transition leave-active-class="animated bounceOutDown">
        <div v-show="show_upload">
          <b-card-group deck>
            <b-card
              class="shadow-sm"
              border-variant="dark"
              header-border-variant="dark"
              header-tag="header"
            >
              <h3
                slot="header"
                class="mb-0"
                v-text="$ml.get('uploadHeader')"
              ></h3>

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

              <div slot="footer" align="center">
                <b-button
                  @click="submitFiles"
                  variant="success"
                  class="btn-lg btn-block"
                  v-text="$ml.get('uploadReview')"
                />
              </div>
            </b-card>
          </b-card-group>

          <div class="my-4"></div>
        </div>
      </transition>
    </div>

    <transition
      enter-active-class="animated slideInUp delay-1s"
      leave-active-class="animated zoomOut"
    >
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
import { mapActions } from "vuex";

("use strict");

export default {
  name: "Upload",

  components: {
    Setup
  },

  data() {
    return {
      file_book: null,
      file_bank: null,
      show_upload: true,
      show_setupfile: false,

      files: { book: null, bank: null },
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
      columns: { book: null, bank: [] },
      file_names: {
        book: null,
        bank: null
      },

      list: null
    };
  },

  created() {
    this.list = [
      {'index': 1, 'name': 'korn'},
      {'index': 2, 'name': 'pleaw'},
      {'index': 3, 'name': 'gift'},
      {'index': 4, 'name': 'bam'}
    ]
  },

  methods: {
    ...mapActions(["addBookAcc", "addBankAcc"]),

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
          let [err, res] = await handle(
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
            this.toggleChildComponent();
          })
          .catch(err => {
            alert(err);
            // reload this page after clicked 'OK'
            location.reload();
          });
      } else {
        alert("Form is empty.");
      }
    },

    retrieveData(payload) {
      this.checkNumRows(payload.parsedBook, payload.parsedBank);

      // Prop data (files) -------------
      this.files.book = payload.parsedBook;
      this.files.bank = payload.parsedBank;
      // -------------------------------

      // Prop data (columns) -----------
      this.columns.book = Object.keys(payload.parsedBook.data[0]);
      this.columns.bank = payload.parsedBank.map(o => Object.keys(o.data[0]));
      // -------------------------------

      // Prop data (columns) -----------
      this.file_names.book = getAccName(this.file_book);
      this.file_names.bank = this.file_bank.map(acc => getAccName(acc));
      // -------------------------------
    },

    checkNumRows(book, bank) {
      let bookLength = book.data.length;
      let bankLength = 0;

      bank.forEach(obj => {
        bankLength += obj.data.length;
      });

      if (bookLength != bankLength) {
        throw new RangeError("Ledger rows and Bank rows is not equal.");
      }
    },

    selectColumnToken() {
      let token_book = new TokenSetRatio(this.columns.book);
      // Prop data (fields.book) --------------------------
      this.fields.book.date = token_book.selectDate;
      this.fields.book.desc = token_book.selectDesc;
      this.fields.book.debit = token_book.selectDebit;
      this.fields.book.credit = token_book.selectCredit;
      this.fields.book.balance = token_book.selectBalance;
      // --------------------------------------------------

      this.columns.bank.forEach(each_bank => {
        let token_bank = new TokenSetRatio(each_bank);
        // Prop data (fields.bank) --------------------------
        this.fields.bank.date.push(token_bank.selectDate);
        this.fields.bank.desc.push(token_bank.selectDesc);
        this.fields.bank.ref.push(token_bank.selectReference);
        this.fields.bank.deposit.push(token_bank.selectDeposit);
        this.fields.bank.withdraw.push(token_bank.selectWithdraw);
        this.fields.bank.balance.push(token_bank.selectBalance);
        // --------------------------------------------------
      });
    },

    toggleChildComponent() {
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

const handle = promise =>
  promise.then(res => [null, res]).catch(err => [err, null]);

class TokenSetRatio {
  constructor(columns) {
    this.columns = columns;
  }

  get selectDate() {
    return this.token_set_ratio("Date");
  }
  get selectDesc() {
    return this.token_set_ratio("Description");
  }
  get selectDebit() {
    return this.token_set_ratio("Debit");
  }
  get selectCredit() {
    return this.token_set_ratio("Credit");
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
</style>
