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
            <b-row align-h="center">
              <b-button
                v-if="countStacks > 0"
                @click="undo()"
                variant="outline-info"
              >
                <font-awesome-icon icon="undo" />
              </b-button>
            </b-row>
            <b-row align-h="center" class="mt-2">
              <span class="badge badge-primary"
                >{{ countStacks }} of {{ pairs_len }}</span
              >
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
      <transition-group
        enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut"
      >
        <div v-for="(item, index) in items" v-bind:key="item.index">
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
                    <b-col
                      ><p class="date">{{ item.bank.Date }}</p></b-col
                    >
                    <div class="vr" />
                    <b-col
                      ><p class="description">{{ item.bank.Desc }}</p></b-col
                    >
                    <div class="vr" />
                    <b-col
                      ><p class="spent">
                        {{ item.bank.Withdraw | numFormatting }}
                      </p></b-col
                    >
                    <div class="vr" />
                    <b-col
                      ><p class="received">
                        {{ item.bank.Deposit | numFormatting }}
                      </p></b-col
                    >
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
                    <b-col
                      ><p class="date">{{ item.book.Date }}</p></b-col
                    >
                    <div class="vr" />
                    <b-col
                      ><p class="description">{{ item.book.Desc }}</p></b-col
                    >
                    <div class="vr" />
                    <b-col
                      ><p class="spent">
                        {{ item.book.Credit | numFormatting }}
                      </p></b-col
                    >
                    <div class="vr" />
                    <b-col
                      ><p class="received">
                        {{ item.book.Debit | numFormatting }}
                      </p></b-col
                    >
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
import { MyFunctions } from "@/MyFunctions.js";

("use strict");

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

      pairs_len: 0,
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
    ...mapGetters(["countStacks"])
  },

  created() {
    let paired = this.paired;
    let items_book = this.files.book;
    let items_bank = this.files.bank;

    this.pairs_len = _.values(paired).length;
    let len1 = MyFunctions.range(0, this.pairs_len - 1);
    let len2 = _.values(paired).filter(o => o !== null);
    let book_null = _.difference(len1, len2);

    // transfer options for Transfer Modal
    this.bank_accounts.forEach(acc => {
      this.transfer_options.push({ value: acc, text: acc });
    });

    // ref options for create.who of Create Modal
    let bankRefAll = items_bank.map(obj => obj.Reference);
    let bankRefDistinct = [...new Set(bankRefAll)];
    bankRefDistinct.forEach(ref => {
      this.ref_options.push({ value: ref, text: ref });
    });

    for (var key in paired) {
      var value = paired[key];
      let obj = {
        book: null,
        bank: items_bank[key],
        matched: null,
        index: key,
        metas: {
          transfer: items_bank[key].Bank_Entity,
          create: {
            who: null,
            what: items_bank[key].Reference,
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
        obj.book = items_book[book_null.shift()];
      }
      this.$store.dispatch("pushItems", obj);
    }
  },

  methods: {
    ...mapActions(["undo", "del", "replaceItems"]),

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
    numFormatting: function(number) {
      if (number) {
        return number.toLocaleString("en");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vr {
  border-right: 1px solid #ccc;
}

.date {
  font-size: 18px;
}
.description {
  font-size: 12px;
}
.spent {
  font-size: 20px;
}
.received {
  font-size: 20px;
}
</style>
