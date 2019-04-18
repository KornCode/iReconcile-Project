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

      mergeList: null,

      // ---------------------
      // MODAL MERGE BANK
      modalMergeBank: null,
      mergeBank: null,
      show_modalMergeBank: false,
      mergeBank_options: [],
      // ---------------------

      // ---------------------
      // MODAL MERGE BOOK
      modalMergeBook: null,
      mergeBook: null,
      show_modalMergeBook: false,
      mergeBook_options: [],
      // ---------------------

      // ---------------------
      // MODAL CREATE BANK
      modalCreateBank: null,
      createBank: {
        Date: null,
        Desc: "",
        Reference: "",
        Entity: "",
        Deposit: null,
        Withdraw: null
      },
      show_modalCreateBank: false,
      // ---------------------

      // ---------------------
      // MODAL CREATE BOOK
      modalCreateBook: null,
      createBook: {
        Date: null,
        Desc: "",
        Entity: "",
        Deposit: null,
        Withdraw: null
      },
      show_modalCreateBook: false,
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
    // MODAL CREATE BANK
    clearCreateBank() {
      this.createBank.Date = new Date(
        this.items[this.modalIndex].bank.Date
      ).yyyymmdd();
      this.createBank.Desc = this.items[this.modalIndex].bank.Desc;
      this.createBank.Reference = this.items[this.modalIndex].bank.Reference;
      this.createBank.Entity = this.items[this.modalIndex].bank.Entity;
      this.createBank.Deposit = this.items[this.modalIndex].bank.Deposit;
      this.createBank.Withdraw = this.items[this.modalIndex].bank.Withdraw;
    },
    handleOk_MCreateBank(evt) {
      evt.preventDefault();
      if (this.createBank.Deposit && this.createBank.Withdraw) {
        alert("Select either deposit or withdraw");
      } else {
        this.handleSubmit_MCreateBank();
      }
    },
    handleSubmit_MCreateBank() {
      this.createBankItems({
        index: this.modalIndex,
        data: {
          Date: this.createBank.Date,
          Desc: this.createBank.Desc,
          Reference: this.createBank.Reference,
          Entity: this.createBank.Entity,
          Deposit: this.createBank.Deposit,
          Withdraw: this.createBank.Withdraw
        }
      });
      this.$nextTick(() => {
        this.$refs.modalCreateBank.hide();
      });
    },
    handleClick_MCreateBank(index) {
      this.show_modalCreateBank = true;
      this.modalIndex = +index;
    },
    // ---------------------

    // ---------------------
    // MODAL CREATE BOOK
    clearCreateBook() {
      this.createBook.Date = new Date(
        this.items[this.modalIndex].book.Date
      ).yyyymmdd();
      this.createBook.Desc = this.items[this.modalIndex].book.Desc;
      this.createBook.Entity = this.items[this.modalIndex].book.Entity;
      this.createBook.Debit = this.items[this.modalIndex].book.Debit;
      this.createBook.Credit = this.items[this.modalIndex].book.Credit;
    },
    handleOk_MCreateBook(evt) {
      evt.preventDefault();
      if (this.createBook.Debit && this.createBook.Credit) {
        alert("Select either debit or credit");
      } else {
        this.handleSubmit_MCreateBook();
      }
    },
    handleSubmit_MCreateBook() {
      this.createBookItems({
        index: this.modalIndex,
        data: {
          Date: this.createBook.Date,
          Desc: this.createBook.Desc,
          Entity: this.createBook.Entity,
          Debit: this.createBook.Debit,
          Credit: this.createBook.Credit
        }
      });
      this.$nextTick(() => {
        this.$refs.modalCreateBook.hide();
      });
    },
    handleClick_MCreateBook(index) {
      this.show_modalCreateBook = true;
      this.modalIndex = +index;
    },
    // ---------------------

    // ---------------------
    // MODAL MERGE BANK
    clearMergeBank() {
      this.mergeBank = "";
    },
    handleOk_MMergeBank(evt) {
      evt.preventDefault();
      if (this.modalIndex == this.mergeBank) {
        alert("Cannot select same");
      } else {
        this.handleSubmit_MMergeBank();
      }
    },
    handleSubmit_MMergeBank() {
      this.mergeBankItems({
        indexF: this.modalIndex,
        indexS: +this.mergeBank
      });
      this.$nextTick(() => {
        this.$refs.modalMergeBank.hide();
      });
    },
    handleClick_MMergeBank(index) {
      this.show_modalMergeBank = true;
      this.modalIndex = +index;
    },
    // ---------------------

    // ---------------------
    // MODAL MERGE BOOK
    clearMergeBook() {
      this.mergeBook = "";
    },
    handleOk_MMergeBook(evt) {
      evt.preventDefault();
      if (this.modalIndex == this.mergeBook) {
        alert("Cannot select same");
      } else {
        this.handleSubmit_MMergeBook();
      }
    },
    handleSubmit_MMergeBook() {
      this.mergeBookItems({
        indexF: this.modalIndex,
        indexS: +this.mergeBook
      });
      this.$nextTick(() => {
        this.$refs.modalMergeBook.hide();
      });
    },
    handleClick_MMergeBook(index) {
      this.show_modalMergeBook = true;
      this.modalIndex = +index;
    },
    // ---------------------

    // ---------------------
    // MODAL COMMENT
    clearComment() {
      this.comment = this.items[this.modalIndex].comment;
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
      this.addComment({
        index: this.modalIndex,
        value: this.comment
      });
      this.$nextTick(() => {
        this.$refs.modalComment.hide();
      });
    },
    handleClick_MComment(index) {
      this.show_modalComment = true;
      this.modalIndex = +index;
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

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [
    this.getFullYear(),
    (mm > 9 ? "" : "0") + mm,
    (dd > 9 ? "" : "0") + dd
  ].join("-");
};
