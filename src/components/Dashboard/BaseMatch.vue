<template>
  <div class="reconcile page">
    <!-- modal more -->
    <b-modal v-model="modalShow">
      <ul align="left" v-for="(val, key, index) in modalItem" :key="index">
        <li>{{ key }}: {{ val }}</li>
      </ul>
    </b-modal>

    <!-- --------------------- -->
    <!-- MODAL CREATE -->
    <!-- --------------------- -->
    <b-modal
      v-model="show_modalCreate"
      ref="modalCreate"
      title="Submit creation"
      @ok="handleOk_MCreate"
      @shown="clearCreate"
    >
      <div slot="modal-title" v-text="$ml.get('matchModalCreateHeader')" />
      <form @submit.stop.prevent="handleSubmit_MCreate">
        <b-row class="my-2">
          <b-col sm="2"><label>Who</label></b-col>
          <b-col sm="10"
            ><b-form-input
              type="text"
              placeholder="Name of the contact..."
              v-model="create.who"
              @keyup.enter="handleSubmit_MCreate"
          /></b-col>
        </b-row>
        <b-row class="my-2">
          <b-col sm="2"><label>What</label></b-col>
          <b-col sm="10">
            <b-form-select
              v-model="create.what"
              :options="ref_options"
              :select-size="1"
            />
          </b-col>
        </b-row>
        <b-row class="my-2">
          <b-col sm="2"><label>Why</label></b-col>
          <b-col sm="10"
            ><b-form-input
              type="text"
              placeholder="Enter a description..."
              v-model="create.why"
              @keyup.enter="handleSubmit_MCreate"
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
    <!-- MODAL TRANSFER -->
    <!-- --------------------- -->
    <b-modal
      v-model="show_modalTransfer"
      ref="modalTransfer"
      title="Submit transfer"
      @ok="handleOk_MTransfer"
      @shown="clearTransfer"
    >
      <div slot="modal-title" v-text="$ml.get('matchModalTransferHeader')" />
      <form @submit.stop.prevent="handleSubmit_MTransfer">
        <b-row class="m-1">
          <b-form-select
            v-model="transfer"
            :options="transfer_options"
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
                {{ countStacks }} of {{ pairedLength }}
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
          <b-row align-h="center" style="max-height: 200px;" class="mb-4">
            <b-col cols="5">
              <b-card-group deck style="height: 100%">
                <b-card
                  header=" "
                  header-tag="header"
                  border-variant="secondary"
                >
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
                  <b-row>
                    <b-col cols="6">
                      <div class="text-left">
                        <p class="date font-weight-bold">
                          {{ item.bank.Date }}
                        </p>
                        <p class="description">{{ item.bank.Desc }}</p>
                        <p class="reference font-italic">
                          {{ item.metas.create.what }}
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
                </b-card>
              </b-card-group>
            </b-col>

            <b-col cols="1" align-self="center">
              <div v-if="item.matched === true" key="matched-status">
                <b-button @click="del(index)" variant="outline-success">
                  <font-awesome-icon icon="check" />
                </b-button>
              </div>
              <div v-else key="matched-status">
                <b-button disabled><font-awesome-icon icon="check"/></b-button>
              </div>
            </b-col>

            <b-col cols="5">
              <b-card-group deck style="height: 100%">
                <b-card border-variant="secondary">
                  <div slot="header">
                    <b-row>
                      <b-col
                        ><b-link
                          @click="handleClick_MTransfer(index)"
                          v-text="$ml.get('matchModalTransfer')"
                        />
                      </b-col>
                      <b-col
                        ><b-link
                          @click="handleClick_MCreate(index)"
                          v-text="$ml.get('matchModalCreate')"
                        />
                      </b-col>
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
import _ from "lodash";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "Match",

  data() {
    return {
      modalShow: false,
      modalItem: null,

      modalIndex: null,

      // ---------------------
      // MODAL TRANSFER
      modalTransfer: null,
      transfer: null,
      show_modalTransfer: false,
      transferList: null,
      transfer_options: [],
      // ---------------------

      // ---------------------
      // MODAL CREATE
      modalCreate: null,
      create: {
        who: null,
        what: null,
        why: null
      },
      show_modalCreate: false,
      createList: [],
      // ---------------------

      // ---------------------
      // MODAL COMMENT
      modalComment: null,
      comment: null,
      show_modalComment: false,
      commentList: [],
      commentStore: {},
      // ---------------------

      ref_options: []
    };
  },

  computed: {
    ...mapState([
      "files",
      "paired",
      "book_account",
      "bank_accounts",
      "bank_ref",
      "items"
    ]),
    ...mapGetters(["countStacks", "pairedLength"])
  },

  created() {
    let paired = this.paired;
    let items_book = this.files.book;
    let items_bank = this.files.bank;

    let values = Object.values(paired);
    const values_len = values.length;

    // transfer options for Transfer Modal
    this.getTransferOptions();

    // ref options for create.who of Create Modal
    this.getRefOptions(items_bank);

    // {Array} index of null
    let book_null = index_of_null(values, values_len);

    // iteration of object paired
    const timerDateFindLodash = new Date();
    for (var i = 0, len = values_len; i < len; i++) {
      var value = values[i];
      let obj = {
        book: null,
        bank: items_bank[i],
        matched: null,
        index: i,
        metas: {
          transfer: items_bank[i].Bank_Entity,
          create: {
            who: null,
            what: items_bank[i].Reference,
            why: null
          },
          comment: null
        }
      };
      if (_.isNumber(value)) {
        obj.matched = true;
        obj.book = items_book[value];
      } else {
        obj.matched = false;
        obj.book = items_book[book_null.shift()]; // index of null
      }
      this.$store.dispatch("pushItems", obj);
    }
    console.log('lodash time', new Date() - timerDateFindLodash);
  },

  methods: {
    ...mapActions(["undo", "del", "replaceItems"]),

    getTransferOptions() {
      this.bank_accounts.forEach(acc => {
        this.transfer_options.push({ value: acc, text: acc });
      });
    },

    getRefOptions(items_bank) {
      let bankRefAll = items_bank.map(obj => obj.Reference);
      let bankRefDistinct = [...new Set(bankRefAll)];
      bankRefDistinct.forEach(ref => {
        this.ref_options.push({ value: ref, text: ref });
      });
    },

    openModal(item) {
      this.modalItem = item;
      this.modalShow = true;
    },

    // ---------------------
    // MODAL TRANSFER
    clearTransfer() {
      this.transfer = this.items[this.modalIndex].metas.transfer;
    },
    handleOk_MTransfer(evt) {
      evt.preventDefault();
      if (!this.transfer) {
        alert("Please select one");
      } else {
        this.handleSubmit_MTransfer();
      }
    },
    handleSubmit_MTransfer() {
      this.replaceItems({
        index: this.modalIndex,
        type: "transfer",
        value: this.transfer
      });
      this.replaceItems({
        index: this.modalIndex,
        type: "entity",
        value: this.transfer
      });

      this.$nextTick(() => {
        this.$refs.modalTransfer.hide();
      });
    },
    handleClick_MTransfer(index) {
      this.show_modalTransfer = true;
      this.modalIndex = parseInt(index, 10);
    },
    // ---------------------

    // ---------------------
    // MODAL CREATE
    clearCreate() {
      this.create.who = this.items[this.modalIndex].metas.create.who;
      this.create.what = this.items[this.modalIndex].metas.create.what;
      this.create.why = this.items[this.modalIndex].metas.create.why;
    },
    handleOk_MCreate(evt) {
      evt.preventDefault();
      if (
        !this.create.who &&
        !this.create.why &&
        this.create.what === this.items[this.modalIndex].metas.create.what
      ) {
        alert("Please submit creation");
      } else {
        this.handleSubmit_MCreate();
      }
    },
    handleSubmit_MCreate() {
      this.replaceItems({
        index: this.modalIndex,
        type: "create",
        value: this.create
      });
      this.$nextTick(() => {
        this.$refs.modalCreate.hide();
      });
    },
    handleClick_MCreate(index) {
      this.show_modalCreate = true;
      this.modalIndex = parseInt(index, 10);
    },
    // ---------------------

    // ---------------------
    // MODAL COMMENT
    clearComment() {
      this.comment = this.items[this.modalIndex].metas.comment;
    },
    handleOk_MComment(evt) {
      evt.preventDefault();
      if (!this.comment) {
        alert("Please enter comment");
      } else {
        this.handleSubmit_MComment();
      }
    },
    handleSubmit_MComment() {
      this.replaceItems({
        index: this.modalIndex,
        type: "comment",
        value: this.comment
      });
      this.$nextTick(() => {
        this.$refs.modalComment.hide();
      });
    },
    handleClick_MComment(index) {
      this.show_modalComment = true;
      this.modalIndex = parseInt(index, 10);
    }
    // ---------------------
  },

  filters: {
    // 12345 to 12,345
    numFormatting: function(number) {
      if (number) { //skip null
        return number.toLocaleString("en");
      }
    }
  }
};

function index_of_null(values, val_len) {
  let missing = [];
  for (var i = 0, len = val_len; i < len; i++) {
    if (values.indexOf(i) == -1) {
      missing.push(i);
    }
  }
  return missing;
}
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
