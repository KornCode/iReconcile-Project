import Chrono from "chrono-node";

export default {
  data() {
    return {
      modalShow: false,
      modalItem: null,

      modalIndex: null,

      // ---------------------
      // MODAL SWAP
      modalSwap: null,
      swap: null,
      show_modalSwap: false,
      swapList: null,
      swap_options: [],
      // ---------------------

      // ---------------------
      // MODAL MERGE
      modalMerge: null,
      merge: null,
      show_modalMerge: false,
      mergeList: null,
      merge_options: [],
      // ---------------------

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
      // MODAL EDIT BANK
      modalEditBank: null,
      bank_obj: {
        Date: null,
        Desc: null,
        Deposit: null,
        Withdraw: null,
        Reference: null,
        Bank_Entity: null,
        Balance: null
      },
      show_modalEditBank: false,
      // createList: [],
      // ---------------------

      // ---------------------
      // MODAL COMMENT
      modalComment: null,
      comment: null,
      show_modalComment: false,
      commentList: [],
      commentStore: {}
      // ---------------------``````
    };
  },

  methods: {
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
    // MODAL EDIT BANK
    clearEditBank() {
      this.bank_obj.Date = new Date(
        this.items[this.modalIndex].bank.Date
      ).yyyymmdd();
      this.bank_obj.Desc = this.items[this.modalIndex].bank.Desc;
      this.bank_obj.Deposit = this.items[this.modalIndex].bank.Deposit;
      this.bank_obj.Withdraw = this.items[this.modalIndex].bank.Withdraw;
    },
    handleOk_MEditBank(evt) {
      evt.preventDefault();
      if (!this.bank_obj) {
        alert("Please submit edit");
      } else {
        this.handleSubmit_MEditBank();
      }
    },
    handleSubmit_MEditBank() {
      let payload = {
        Date: parseDate(this.bank_obj.Date),
        Desc: this.bank_obj.Desc,
        Deposit: this.bank_obj.Deposit,
        Withdraw: this.bank_obj.Withdraw
      };
      payload.index = this.modalIndex;
      this.editBank(payload);
      this.$nextTick(() => {
        this.$refs.modalEditBank.hide();
      });
    },
    handleClick_MEditBank(index) {
      this.show_modalEditBank = true;
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
    },
    // ---------------------

    // ---------------------
    // MODAL SWAP
    clearSwap() {
      this.swap = "";
    },
    handleOk_MSwap(evt) {
      evt.preventDefault();
      if (!this.swap) {
        alert("Please select one");
      } else {
        this.handleSubmit_MSwap();
      }
    },
    handleSubmit_MSwap() {
      this.swapItems({ first: this.modalIndex, second: this.swap });

      this.$nextTick(() => {
        this.$refs.modalSwap.hide();
      });
    },
    handleClick_MSwap(index) {
      this.show_modalSwap = true;
      this.modalIndex = parseInt(index, 10);
    }
    // ---------------------
  },

  watch: {
    items: function() {
      this.swap_options = this.items.map(each => {
        return { value: each.index, text: each.index };
      });
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

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [
    this.getFullYear(),
    (mm > 9 ? "" : "0") + mm,
    (dd > 9 ? "" : "0") + dd
  ].join("-");
};
