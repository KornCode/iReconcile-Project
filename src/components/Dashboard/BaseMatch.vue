<template>
  <div class="reconcile page">
    <!-- modal more -->
    <b-modal v-model="modalShow">
      <ul align="left" v-for="(val, key, index) in modalItem" :key="index">
        <li>{{ key }}: {{ val }}</li>
      </ul>
    </b-modal>

    <!-- --------------------- -->
    <!-- MODAL MERGE BANK -->
    <!-- --------------------- -->
    <b-modal
      v-model="show_modalMergeBank"
      ref="modalMergeBank"
      title="Submit merge bank"
      @ok="handleOk_MMergeBank"
      @shown="clearMergeBank"
    >
      <div slot="modal-title" v-text="$ml.get('matchModalMergeBankHeader')" />
      <form @submit.stop.prevent="handleSubmit_MMergeBank">
        <b-row class="my-2">
          <b-col sm="2"><label>Merge lists</label></b-col>
          <b-col sm="10"
            ><b-form-select
              v-model="mergeBank"
              :options="mergeBank_options"
              :select-size="4"
          /></b-col>
        </b-row>
      </form>
      <div slot="modal-ok" v-text="$ml.get('ok')" />
      <div slot="modal-cancel" v-text="$ml.get('cancel')" />
    </b-modal>

    <!-- --------------------- -->
    <!-- MODAL COMMENT -->
    <!-- --------------------- -->
    <b-modal
      v-model="show_modalComment"
      ref="modalComment"
      title="Submit comment"
      @ok="handleOk_MComment"
      @shown="clearComment"
    >
      <div slot="modal-title" v-text="$ml.get('matchModalCommentHeader')" />
      <form @submit.stop.prevent="handleSubmit_MComment">
        <b-row class="m-1">
          <b-form-textarea
            v-model="comment"
            placeholder="Comment something..."
            rows="3"
            max-rows="6"
            @keyup.ctrl.enter="handleSubmit_MComment"
          />
        </b-row>
      </form>
      <div slot="modal-ok" v-text="$ml.get('ok')" />
      <div slot="modal-cancel" v-text="$ml.get('cancel')" />
    </b-modal>

    <div style="display: inline-block;" class="w-100">
      <div class="sticky-top bg-white">
        <b-row align-h="center" class="mb-3">
          <b-col cols="5">
            <p
              class="text-left"
              style="font-size: 18px;"
              v-text="$ml.get('matchColBank')"
            />
            <hr />
            <b-row align-h="center" class="mb-3">
              <b-col></b-col>
              <b-col></b-col>
              <b-col
                ><p class="text-right" v-text="$ml.get('matchSpent')"
              /></b-col>
              <b-col
                ><p class="text-right" v-text="$ml.get('matchReceived')"
              /></b-col>
            </b-row>
          </b-col>
          <b-col cols="1" align-self="center">
            <b-row align-h="center" class="mt-2">
              <b-badge variant="warning" pill>
                {{ countStacks }} of {{ pairedLength }}
              </b-badge>
            </b-row>
          </b-col>
          <b-col cols="5">
            <p
              class="text-left"
              style="font-size: 18px;"
              v-text="$ml.get('matchColBook')"
            />
            <hr />
            <b-row align-h="center" class="mb-3">
              <b-col></b-col>
              <b-col></b-col>
              <b-col
                ><p class="text-right" v-text="$ml.get('matchSpent')"
              /></b-col>
              <b-col
                ><p class="text-right" v-text="$ml.get('matchReceived')"
              /></b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
      <transition-group leave-active-class="animated flipOutX">
        <div v-for="(item, index) in items" :key="item.index">
          <b-row align-h="center" style="min-height: 200px;" class="mb-4">
            <b-col cols="5">
              <b-card-group deck style="height: 100%">
                <b-card
                  header=" "
                  header-tag="header"
                  border-variant="secondary"
                >
                  <div slot="header">
                    <b-row>
                      <b-col>
                        <p>Index {{ item.index }}</p>
                      </b-col>
                      <b-col>
                        <b-link
                          v-if="allowMoveUnmatch(index)"
                          @click="_moveToUnmatch(index)"
                          >Move to unmatch</b-link
                        >
                      </b-col>
                    </b-row>
                  </div>
                  <div slot="footer" class="float-right">
                    <b-link
                      @click="openModal(item.bank)"
                      v-text="$ml.get('matchModalMore')"
                    />
                  </div>
                  <div slot="footer" class="float-left">
                    <b-badge variant="info">{{
                      item.bank.Bank_Entity
                    }}</b-badge>
                  </div>
                  <div v-if="Array.isArray(item.bank)">
                    <div v-for="(row, index) in item.bank" :key="index">
                      <b-row>
                        <b-col cols="6">
                          <div class="text-left">
                            <p class="date font-weight-bold">
                              {{ row.Date }}
                            </p>
                            <p class="description">{{ row.Desc }}</p>
                            <p class="reference font-italic">
                              {{ row.Reference }}
                            </p>
                          </div>
                        </b-col>
                        <div class="vr" />

                        <b-col>
                          <div class="top-right font-weight-bold">
                            <p class="spent">
                              {{ row.Withdraw | numFormatting }}
                            </p>
                          </div>
                        </b-col>
                        <div class="vr" />
                        <b-col>
                          <div class="top-right font-weight-bold">
                            <p class="received">
                              {{ row.Deposit | numFormatting }}
                            </p>
                          </div>
                        </b-col>
                      </b-row>
                      <hr />
                    </div>
                  </div>
                  <div v-else>
                    <b-row>
                      <b-col cols="6">
                        <div class="text-left">
                          <p class="date font-weight-bold">
                            {{ item.bank.Date }}
                          </p>
                          <p class="description">{{ item.bank.Desc }}</p>
                          <p class="reference font-italic">
                            {{ item.bank.Reference }}
                          </p>
                        </div>
                      </b-col>
                      <div class="vr" />

                      <b-col>
                        <div class="top-right font-weight-bold">
                          <p class="spent">
                            {{ item.bank.Withdraw | numFormatting }}
                          </p>
                        </div>
                      </b-col>
                      <div class="vr" />
                      <b-col>
                        <div class="top-right font-weight-bold">
                          <p class="received">
                            {{ item.bank.Deposit | numFormatting }}
                          </p>
                        </div>
                      </b-col>
                    </b-row>
                  </div>
                </b-card>
              </b-card-group>
            </b-col>

            <b-col cols="1" align-self="center">
              <b-button @click="del(index)" variant="outline-success">
                <font-awesome-icon icon="check" />
              </b-button>
            </b-col>

            <b-col cols="5">
              <b-card-group deck style="height: 100%">
                <b-card border-variant="secondary">
                  <div slot="header">
                    <b-row>
                      <b-col
                        ><b-link
                          @click="handleClick_MComment(index)"
                          v-text="$ml.get('matchModalComment')"
                        />
                      </b-col>
                    </b-row>
                  </div>
                  <div slot="footer" class="float-right">
                    <b-link
                      @click="openModal(item.book)"
                      v-text="$ml.get('matchModalMore')"
                    />
                  </div>
                  <div slot="footer" class="float-left">
                    <b-badge variant="info">{{ book_account }}</b-badge>
                  </div>
                  <div v-if="Array.isArray(item.book)">
                    <div v-for="(row, index) in item.book" :key="index">
                      <b-row>
                        <b-col sm="6">
                          <div class="text-left">
                            <p class="date font-weight-bold">
                              {{ row.Date }}
                            </p>
                            <p class="description">{{ row.Desc }}</p>
                          </div>
                        </b-col>
                        <div class="vr" />
                        <b-col>
                          <div class="top-right font-weight-bold">
                            <p class="spent">
                              {{ row.Credit | numFormatting }}
                            </p>
                          </div>
                        </b-col>
                        <div class="vr" />
                        <b-col>
                          <div class="top-right font-weight-bold">
                            <p class="received">
                              {{ row.Debit | numFormatting }}
                            </p>
                          </div>
                        </b-col>
                      </b-row>
                      <hr />
                    </div>
                  </div>
                  <div v-else>
                    <b-row>
                      <b-col sm="6">
                        <div class="text-left">
                          <p class="date font-weight-bold">
                            {{ item.book.Date }}
                          </p>
                          <p class="description">{{ item.book.Desc }}</p>
                        </div>
                      </b-col>
                      <div class="vr" />
                      <b-col>
                        <div class="top-right font-weight-bold">
                          <p class="spent">
                            {{ item.book.Credit | numFormatting }}
                          </p>
                        </div>
                      </b-col>
                      <div class="vr" />
                      <b-col>
                        <div class="top-right font-weight-bold">
                          <p class="received">
                            {{ item.book.Debit | numFormatting }}
                          </p>
                        </div>
                      </b-col>
                    </b-row>
                  </div>
                </b-card>
              </b-card-group>
            </b-col>
          </b-row>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import ModalMixins from "./Mixins/ModalMixins.js";
import { mapState, mapActions, mapGetters } from "vuex";
class BankTemplate {
  constructor(_Date, Desc, Reference, Entity, Deposit, Withdraw) {
    this.Date = _Date || null;
    this.Desc = Desc || "";
    this.Reference = Reference || "";
    this.Entity = Entity || "";
    this.Deposit = Deposit || null;
    this.Withdraw = Withdraw || null;
  }

  get bankObj() {
    let obj = {
      Date: this.Date,
      Desc: this.Desc,
      Reference: this.Reference,
      Entity: this.Entity,
      Deposit: this.Deposit,
      Withdraw: this.Withdraw
    };
    return obj;
  }
}
class BookTemplate {
  constructor(_Date, Desc, Entity, Debit, Credit) {
    this.Date = _Date || null;
    this.Desc = Desc || "";
    this.Entity = Entity || "";
    this.Debit = Debit || null;
    this.Credit = Credit || null;
  }

  get bookObj() {
    let obj = {
      Date: this.Date,
      Desc: this.Desc,
      Entity: this.Entity,
      Debit: this.Debit,
      Credit: this.Credit
    };
    return obj;
  }
}

export default {
  name: "Match",

  mixins: [ModalMixins],

  data() {
    return {
      ref_options: []
    };
  },

  computed: {
    ...mapState(["files", "book_account", "bank_accounts", "bank_ref"]),
    ...mapState("Match", ["items", "paired", "grouped"]),
    ...mapGetters("Match", ["countStacks", "pairedLength"])
  },

  created() {
    let paired = this.paired;
    let grouped = this.grouped;
    let items_book = this.files.book;
    let items_bank = this.files.bank;

    let iterator = 0;

    let bank_template = new BankTemplate();
    let book_template = new BookTemplate();

    // iteration of object paired
    for (var key_i in paired) {
      let value = paired[key_i];
      let obj = {
        book: items_book[value],
        bank: items_bank[key_i],
        index: iterator,
        comment: ""
      };
      iterator += 1;
      this.$store.dispatch("Match/pushItems", obj);
    }

    let groupVal = Object.values(grouped);
    for (var key_j in groupVal) {
      let bookIndex = groupVal[key_j].ledger;
      let bankIndex = groupVal[key_j].bank;

      let obj = {
        book: book_template.bookObj,
        bank: bank_template.bankObj,
        index: iterator,
        comment: "",
        mergeable: true
      };

      if (bookIndex.length > 1) {
        obj.book = [];
        bookIndex.forEach(index => {
          obj.book.push(items_book[index]);
        });
      } else {
        obj.book = items_book[bookIndex];
      }

      if (bankIndex.length > 1) {
        obj.bank = [];
        bankIndex.forEach(index => {
          obj.bank.push(items_bank[index]);
        });
      } else {
        obj.bank = items_bank[bankIndex];
      }

      iterator += 1;

      this.$store.dispatch("Match/pushItems", obj);
    }
  },

  methods: {
    ...mapActions("Match", [
      "undo_match",
      "del",
      "delToUnmatch",
      "addComment",
      "editBankItems"
    ]),
    ...mapActions("Unmatch", ["moveToUnmatch"]),

    allowMoveUnmatch(index) {
      let item = this.items[index];
      return Array.isArray(item.bank) || Array.isArray(item.book)
        ? true
        : false;
    },

    _moveToUnmatch(index) {
      this.moveToUnmatch(this.items[index]);
      this.delToUnmatch(index);
    }
  },

  watch: {
    items: function() {
      this.mergeBank_options = this.items.map(each => {
        return { value: each.index, text: each.index };
      });
    }
  },

  filters: {
    // 12345 to 12,345
    numFormatting: function(number) {
      if (number) {
        number = +number;
        return number.toFixed(2).toLocaleString("en");
      }
    }
  }
};

// function index_of_null(values, val_len) {
//   let missing = [];
//   for (var i = 0, len = val_len; i < len; i++) {
//     if (values.indexOf(i) == -1) {
//       missing.push(i);
//     }
//   }
//   return missing;
// }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vr {
  border-right: 1px solid #ccc;
}

.date {
  font-size: 16px;
}
.description {
  font-size: 15px;
}
.reference {
  font-size: 15px;
}
.spent {
  font-size: 20px;
}
.received {
  font-size: 20px;
}

.top-right {
  /* margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%); */
  position: absolute;
  top: 0;
  right: 0;
  padding-right: 10%;
  text-align: right;
}

p {
  margin: 0;
}

hr {
  border-top: 1px solid #000;
}
</style>
