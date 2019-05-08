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
    <!-- MODAL MERGE BANK -->
    <!-- --------------------- -->
    <b-modal
      v-model="show_modalMergeBook"
      ref="modalMergeBook"
      title="Submit merge book"
      @ok="handleOk_MMergeBook"
      @shown="clearMergeBook"
    >
      <div slot="modal-title" v-text="$ml.get('matchModalMergeBookHeader')" />
      <form @submit.stop.prevent="handleSubmit_MMergeBook">
        <b-row class="my-2">
          <b-col sm="2"><label>Merge lists</label></b-col>
          <b-col sm="10"
            ><b-form-select
              v-model="mergeBook"
              :options="mergeBook_options"
              :select-size="4"
          /></b-col>
        </b-row>
      </form>
      <div slot="modal-ok" v-text="$ml.get('ok')" />
      <div slot="modal-cancel" v-text="$ml.get('cancel')" />
    </b-modal>

    <!-- --------------------- -->
    <!-- MODAL CREATE BANK -->
    <!-- --------------------- -->
    <b-modal
      v-model="show_modalCreateBank"
      ref="modalCreateBank"
      title="Submit bank creation"
      @ok="handleOk_MCreateBank"
      @shown="clearCreateBank"
    >
      <div slot="modal-title" v-text="$ml.get('matchModalCreateBankHeader')" />
      <form @submit.stop.prevent="handleSubmit_MCreateBank">
        <b-row class="my-2">
          <b-col sm="2"><label>Date</label></b-col>
          <b-col sm="10"
            ><b-form-input
              type="date"
              v-model="createBank.Date"
              @keyup.enter="handleSubmit_MCreateBank"
          /></b-col>
        </b-row>
        <b-row class="my-2">
          <b-col sm="2"><label>Desc</label></b-col>
          <b-col sm="10"
            ><b-form-input
              type="text"
              v-model="createBank.Desc"
              @keyup.enter="handleSubmit_MCreateBank"
          /></b-col>
        </b-row>
        <b-row class="my-2">
          <b-col sm="2"><label>Ref</label></b-col>
          <b-col sm="10"
            ><b-form-input
              type="text"
              v-model="createBank.Reference"
              @keyup.enter="handleSubmit_MCreateBank"
          /></b-col>
        </b-row>
        <b-row class="my-2">
          <b-col sm="2"><label>Entity</label></b-col>
          <b-col sm="10"
            ><b-form-input
              type="text"
              v-model="createBank.Entity"
              @keyup.enter="handleSubmit_MCreateBank"
          /></b-col>
        </b-row>
        <b-row class="my-2">
          <b-col sm="2"><label>Deposit</label></b-col>
          <b-col sm="10"
            ><b-form-input
              type="number"
              v-model="createBank.Deposit"
              @keyup.enter="handleSubmit_MCreateBank"
          /></b-col>
        </b-row>
        <b-row class="my-2">
          <b-col sm="2"><label>Withdraw</label></b-col>
          <b-col sm="10"
            ><b-form-input
              type="number"
              v-model="createBank.Withdraw"
              @keyup.enter="handleSubmit_MCreateBank"
          /></b-col>
        </b-row>
      </form>
      <div slot="modal-ok" v-text="$ml.get('ok')" />
      <div slot="modal-cancel" v-text="$ml.get('cancel')" />
    </b-modal>

    <!-- --------------------- -->
    <!-- MODAL CREATE BOOK -->
    <!-- --------------------- -->
    <b-modal
      v-model="show_modalCreateBook"
      ref="modalCreateBook"
      title="Submit book creation"
      @ok="handleOk_MCreateBook"
      @shown="clearCreateBook"
    >
      <div slot="modal-title" v-text="$ml.get('matchModalCreateBookHeader')" />
      <form @submit.stop.prevent="handleSubmit_MCreateBook">
        <b-row class="my-2">
          <b-col sm="2"><label>Date</label></b-col>
          <b-col sm="10"
            ><b-form-input
              type="date"
              v-model="createBook.Date"
              @keyup.enter="handleSubmit_MCreateBook"
          /></b-col>
        </b-row>
        <b-row class="my-2">
          <b-col sm="2"><label>Desc</label></b-col>
          <b-col sm="10"
            ><b-form-input
              type="text"
              v-model="createBook.Desc"
              @keyup.enter="handleSubmit_MCreateBook"
          /></b-col>
        </b-row>
        <b-row class="my-2">
          <b-col sm="2"><label>Entity</label></b-col>
          <b-col sm="10"
            ><b-form-input
              type="text"
              v-model="createBook.Entity"
              @keyup.enter="handleSubmit_MCreateBook"
          /></b-col>
        </b-row>
        <b-row class="my-2">
          <b-col sm="2"><label>Debit</label></b-col>
          <b-col sm="10"
            ><b-form-input
              type="number"
              v-model="createBook.Debit"
              @keyup.enter="handleSubmit_MCreateBook"
          /></b-col>
        </b-row>
        <b-row class="my-2">
          <b-col sm="2"><label>Credit</label></b-col>
          <b-col sm="10"
            ><b-form-input
              type="number"
              v-model="createBook.Credit"
              @keyup.enter="handleSubmit_MCreateBook"
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

    <!-- --------------------- -->
    <!-- MODAL SWAP -->
    <!-- --------------------- -->
    <b-modal
      v-model="show_modalSwap"
      ref="modalSwap"
      title="Submit swap"
      @ok="handleOk_MSwap"
      @shown="clearSwap"
    >
      <div slot="modal-title" v-text="$ml.get('matchModalSwapHeader')" />
      <form @submit.stop.prevent="handleSubmit_MSwap">
        <b-row class="m-1">
          <b-form-select
            v-model="swap"
            :options="swap_options"
            :select-size="4"
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
            <p class="text-left" style="font-size: 18px;">
              Review your bank statement lines...
            </p>
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
                {{ countStackUnmatch }} of {{ remainingLength }}
              </b-badge>
            </b-row>
          </b-col>
          <b-col cols="5">
            <p class="text-left" style="font-size: 18px;">
              ...then match with your transactions
            </p>
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
                      <b-col
                        ><b-link
                          v-if="editable(index)"
                          @click="handleClick_MCreateBank(index)"
                          v-text="$ml.get('matchModalCreateBank')"
                        />
                      </b-col>
                      <b-col
                        ><b-link
                          @click="handleClick_MMergeBank(index)"
                          v-text="$ml.get('matchModalMergeBank')"
                        />
                      </b-col>
                      <b-col v-if="Array.isArray(item.bank)">
                        <b-link @click="unmergeBankItems(index)"
                          >Unmerge</b-link
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
                    <b-badge variant="info">{{ item.bank.Entity }}</b-badge>
                  </div>
                  <div v-if="Array.isArray(item.bank)">
                    <div
                      v-for="(row, index) in flatten(item.bank)"
                      :key="index"
                    >
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
                    <b-row v-if="item !== null">
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
              <b-button
                v-if="item.match"
                key="checkMatch"
                @click="del(index)"
                variant="outline-success"
              >
                <font-awesome-icon icon="check" />
              </b-button>
              <b-button v-else key="checkMatch" @click="del(index)" disabled>
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
                          @click="handleClick_MCreateBook(index)"
                          v-text="$ml.get('matchModalCreateBook')"
                        />
                      </b-col>
                      <b-col
                        ><b-link
                          @click="handleClick_MComment(index)"
                          v-text="$ml.get('matchModalComment')"
                        />
                      </b-col>
                      <b-col
                        ><b-link
                          @click="handleClick_MMergeBook(index)"
                          v-text="$ml.get('matchModalMergeBook')"
                        />
                      </b-col>
                      <b-col v-if="Array.isArray(item.book)">
                        <b-link @click="unmergeBookItems(index)"
                          >Unmerge</b-link
                        >
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
                    <div
                      v-for="(row, index) in flatten(item.book)"
                      :key="index"
                    >
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
  name: "Unmatch",

  mixins: [ModalMixins],

  data() {
    return {
      ref_options: []
    };
  },

  computed: {
    ...mapState(["files", "book_account", "bank_accounts", "bank_ref"]),

    ...mapState("Unmatch", ["remaining", "items", "mergeBankRecord"]),

    ...mapGetters("Unmatch", ["countStackUnmatch", "remainingLength"])
  },

  created() {
    let items_book = this.files.book;
    let items_bank = this.files.bank;

    let remainsBook = this.remaining.book;
    let remainsBank = this.remaining.bank;

    // ref options for create.who of Create Modal
    this.getRefOptions(items_bank);

    let iterator = 0;

    let bank_template = new BankTemplate();
    let book_template = new BookTemplate();

    for (var i = 0, len_i = remainsBook.length; i < len_i; i++) {
      let bookIndex = remainsBook[i];
      let obj = {
        book: items_book[bookIndex] || book_template.bookObj,
        bank: bank_template.bankObj,
        match: false,
        index: iterator,
        comment: ""
      };
      iterator += 1;
      this.$store.dispatch("Unmatch/pushItems", obj);
    }

    for (var j = 0, len_j = remainsBank.length; j < len_j; j++) {
      let bankIndex = remainsBank[j];
      let obj = {
        book: book_template.bookObj,
        bank: items_bank[bankIndex] || bank_template.bankObj,
        match: false,
        index: iterator,
        comment: ""
      };
      iterator += 1;
      this.$store.dispatch("Unmatch/pushItems", obj);
    }
  },

  methods: {
    // check
    ...mapActions("Unmatch", [
      "del", // template
      "createBankItems", // BaseUnmatch
      "createBookItems",
      "mergeBankItems",
      "mergeBookItems",
      "unmergeBankItems",
      "unmergeBookItems",
      "addComment",
      "swapItems" // BaseUnmatch
    ]),

    flatten(input) {
      const stack = [...input];
      const res = [];
      while (stack.length) {
        // pop value from stack
        const next = stack.pop();
        if (Array.isArray(next)) {
          // push back array items, won't modify the original input
          stack.push(...next);
        } else {
          res.push(next);
        }
      }
      //reverse to restore input order
      return res.reverse();
    },

    editable(index) {
      let temp = this.flatten(Object.values(this.mergeBankRecord));
      return !Array.isArray(this.items[index].bank) && !temp.includes(index)
        ? true
        : false;
    }
  },

  watch: {
    items: function() {
      this.mergeBank_options = this.items.map(each => {
        return { value: each.index, text: `Index ${each.index}` };
      });
      this.mergeBook_options = this.items.map(each => {
        return { value: each.index, text: `Index ${each.index}` };
      });
    }
  },

  filters: {
    // ex 12345 to 12,345
    numFormatting: function(number) {
      if (number) {
        number = +number;
        return number.toFixed(2).toLocaleString("en");
      }
    }
  }
};
</script>

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
