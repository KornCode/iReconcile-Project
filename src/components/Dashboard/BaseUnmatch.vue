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
    <!-- MODAL EDIT BANK -->
    <!-- --------------------- -->
    <b-modal
      v-model="show_modalEditBank"
      ref="modalEditBank"
      title="Submit editBank"
      @ok="handleOk_MEditBank"
      @shown="clearEditBank"
    >
      <div slot="modal-title" v-text="$ml.get('matchModalEditBankHeader')" />
      <form @submit.stop.prevent="handleSubmit_MEditBank">
        <b-row class="my-2">
          <b-col sm="2"><label>Date</label></b-col>
          <b-col sm="10"
            ><b-form-input
              type="date"
              v-model="bank_obj.Date"
              @keyup.enter="handleSubmit_MEditBank"
          /></b-col>
        </b-row>
        <b-row class="my-2">
          <b-col sm="2"><label>Desc</label></b-col>
          <b-col sm="10"
            ><b-form-input
              type="text"
              v-model="bank_obj.Desc"
              @keyup.enter="handleSubmit_MEditBank"
          /></b-col>
        </b-row>
        <b-row class="my-2">
          <b-col sm="2"><label>Deposit</label></b-col>
          <b-col sm="10"
            ><b-form-input
              type="number"
              v-model="bank_obj.Deposit"
              @keyup.enter="handleSubmit_MEditBank"
          /></b-col>
        </b-row>
        <b-row class="my-2">
          <b-col sm="2"><label>Withdraw</label></b-col>
          <b-col sm="10"
            ><b-form-input
              type="number"
              v-model="bank_obj.Withdraw"
              @keyup.enter="handleSubmit_MEditBank"
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
                          @click="handleClick_MSwap(index)"
                          v-text="$ml.get('matchModalSwap')"
                        />
                      </b-col>
                      <b-col
                        ><b-link
                          @click="handleClick_MEditBank(index)"
                          v-text="$ml.get('matchModalEditBank')"
                        />
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
                  <div v-if="item.group">
                    <div v-for="(row, index) in item.bank" :key="index">
                      <b-row>
                        <b-col cols="6">
                          <div class="text-left">
                            <p class="date font-weight-bold">
                              {{ row.Date }}
                            </p>
                            <p class="description">{{ row.Desc }}</p>
                            <p class="reference font-italic">
                              <!-- {{ row.metas.create.what }} -->
                            </p>
                          </div>
                        </b-col>
                        <div class="vr" />

                        <b-col>
                          <div class="top-right font-weight-bold">
                            <p class="spent">
                              {{ row.Deposit | numFormatting }}
                            </p>
                          </div>
                        </b-col>
                        <div class="vr" />
                        <b-col>
                          <div class="top-right font-weight-bold">
                            <p class="received">
                              {{ row.Withdraw | numFormatting }}
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
                  <div v-if="item.group">
                    <!-- <div v-for="(row, index) in item.book" :key="index">
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
                    </div> -->
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

    ...mapState("Unmatch", ["remaining", "items"]),

    ...mapGetters("Unmatch", ["countStackUnmatch", "remainingLength"])
  },

  created() {
    let items_book = this.files.book;
    let items_bank = this.files.bank;

    let remainsBook = this.remaining.book;
    let remainsBank = this.remaining.bank;

    // transfer options for Transfer Modal
    this.getTransferOptions();

    // ref options for create.who of Create Modal
    this.getRefOptions(items_bank);

    for (var i = 0, len = this.remainingLength; i < len; i++) {
      let bookIndex = remainsBook[i];
      let bankIndex = remainsBank[i];
      let obj = {
        book: items_book[bookIndex] || "null",
        bank: items_bank[bankIndex] || "null",
        group: false,
        match: false,
        index: i,
        metas: {
          transfer: items_bank[bankIndex].Bank_Entity || "null",
          create: {
            who: null,
            what: items_bank[bankIndex].Reference || "null",
            why: null
          },
          comment: null
        }
      };
      this.$store.dispatch("Unmatch/pushItems", obj);
    }
  },

  methods: {
    ...mapActions("Unmatch", [
      "del", // template
      "replaceItems", // BaseUnmatch
      "swapItems", // BaseUnmatch
      "editBank" // BaseUnmatch
    ])
  },

  filters: {
    // ex 12345 to 12,345
    numFormatting: function(number) {
      if (number) {
        return number.toLocaleString("en");
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
