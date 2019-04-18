import Vue from "vue";

const add = (a, b) => a + b;
const sort_index = (a, b) => a.index - b.index;
const index_ObjInArray = (array, index) => {
  let _select_obj = array.find(obj => obj.index === index);
  return array.indexOf(_select_obj);
};
function flatten(input) {
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
}
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
const check_matched_money = (state, index) => {
  let item = state.items[index];
  let deposit = Array.isArray(item.bank)
    ? flatten(item.bank)
        .map(each => +each.Deposit)
        .reduce(add)
    : +item.bank.Deposit;
  let withdraw = Array.isArray(item.bank)
    ? flatten(item.bank)
        .map(each => +each.Withdraw)
        .reduce(add)
    : +item.bank.Withdraw;
  let debit = Array.isArray(item.book)
    ? flatten(item.book)
        .map(each => +each.Debit)
        .reduce(add)
    : +item.book.Debit;
  let credit = Array.isArray(item.book)
    ? flatten(item.book)
        .map(each => +each.Credit)
        .reduce(add)
    : +item.book.Credit;
  if (debit && deposit) {
    return debit == deposit ? true : false;
  } else if (credit && withdraw) {
    return credit == withdraw ? true : false;
  } else {
    return false;
  }
};

export default {
  namespaced: true,
  state: {
    items: [],
    stack_unmatch: [],
    remaining: { book: null, bank: null },
    editBankBalance: 0,
    editBookBalance: 0,

    mergeBankRecord: {},
    mergeBookRecord: {}
  },
  getters: {
    countStackUnmatch: state => {
      return state.stack_unmatch.length;
    },
    remainingLength: state => {
      const isEmpty = ele => {
        return Boolean(ele) === false;
      };
      const bank_and_book_is_empty = obj => {
        let bankVal = Object.values(obj.bank);
        let bookVal = Object.values(obj.book);
        return bankVal.every(isEmpty) && bookVal.every(isEmpty);
      };
      return state.items.filter(obj => !bank_and_book_is_empty(obj)).length;
    }
  },
  mutations: {
    PUSH_ITEMS: (state, obj) => {
      state.items.push(obj);
    },
    UNDO_UNMATCH: (state, index) => {
      let select_obj = index_ObjInArray(state.stack_unmatch, index);
      state.items.push(state.stack_unmatch[select_obj]);
      Vue.delete(state.stack_unmatch, select_obj);
      state.items.sort(sort_index);
    },
    DEL: (state, index) => {
      state.editBankBalance = 0;
      state.editBookBalance = 0;
      state.stack_unmatch.push(state.items[index]);
      Vue.delete(state.items, index);
    },
    SWAP_ITEMS: (state, indexs) => {
      let temp = state.items[indexs.first].bank;
      state.items[indexs.first].bank = state.items[indexs.second].bank;
      state.items[indexs.second].bank = temp;
    },

    CREATE_BANK: (state, payload) => {
      let newVal = state.items[payload.index];
      let bank_template = new BankTemplate(
        payload.data.Date,
        payload.data.Desc,
        payload.data.Reference,
        payload.data.Entity,
        payload.data.Deposit,
        payload.data.Withdraw
      );
      newVal.bank = bank_template.bankObj;

      state.items[payload.index].match = check_matched_money(
        state,
        payload.index
      );
      state.editBankBalance =
        payload.data.Withdraw * -1 || +payload.data.Deposit;

      state.items.splice(payload.index, 1, newVal);
    },
    CREATE_BOOK: (state, payload) => {
      let newVal = state.items[payload.index];
      let book_template = new BookTemplate(
        payload.data.Date,
        payload.data.Desc,
        payload.data.Entity,
        payload.data.Deposit,
        payload.data.Credit
      );
      newVal.book = book_template.bookObj;

      state.items[payload.index].match = check_matched_money(
        state,
        payload.index
      );
      state.editBookBalance = payload.Credit * -1 || payload.Debit;

      state.items.splice(payload.index, 1, newVal);
    },
    MERGE_BANK: (state, payload) => {
      let newVal = state.items[payload.indexF];
      let oldVal = state.items[payload.indexS];
      let preVal = state.items[payload.indexF].bank;
      let posVal = state.items[payload.indexS].bank;
      if (Array.isArray(preVal)) {
        newVal.bank.push(posVal);
        state.mergeBankRecord[payload.indexF].push(payload.indexS);
      } else {
        newVal.bank = [preVal, posVal];
        state.mergeBankRecord[payload.indexF] = [payload.indexS];
      }

      state.items[payload.indexF].match = check_matched_money(
        state,
        payload.indexF
      );
      state.items[payload.indexS].match = false;

      let bank_template = new BankTemplate();
      oldVal.bank = bank_template.bankObj;
      state.items.splice(payload.indexF, 1, newVal);
      state.items.splice(payload.indexS, 1, oldVal);
    },
    MERGE_BOOK: (state, payload) => {
      let newVal = state.items[payload.indexF];
      let oldVal = state.items[payload.indexS];
      let preVal = state.items[payload.indexF].book;
      let posVal = state.items[payload.indexS].book;
      if (Array.isArray(preVal)) {
        newVal.book.push(posVal);
        state.mergeBookRecord[payload.indexF].push(payload.indexS);
      } else {
        newVal.book = [preVal, posVal];
        state.mergeBookRecord[payload.indexF] = [payload.indexS];
      }

      state.items[payload.indexF].match = check_matched_money(
        state,
        payload.indexF
      );
      state.items[payload.indexS].match = false;

      let book_template = new BookTemplate();
      oldVal.book = book_template.bookObj;
      state.items.splice(payload.indexF, 1, newVal);
      state.items.splice(payload.indexS, 1, oldVal);
    },
    UNMERGE_BANK: (state, index) => {
      let unmergeIndex = state.mergeBankRecord[index].pop();
      let unmergeItem = state.items[index].bank.pop();
      if (state.items[index].bank.length === 1) {
        state.items[index].bank = state.items[index].bank[0];
      }
      state.items[index].match = check_matched_money(state, index);
      let newVal = state.items[unmergeIndex];
      newVal.bank = unmergeItem;
      state.items.splice(unmergeIndex, 1, newVal);
    },
    UNMERGE_BOOK: (state, index) => {
      let unmergeIndex = state.mergeBookRecord[index].pop();
      let unmergeItem = state.items[index].book.pop();
      if (state.items[index].book.length === 1) {
        state.items[index].book = state.items[index].book[0];
      }
      state.items[index].match = check_matched_money(state, index);
      let newVal = state.items[unmergeIndex];
      newVal.book = unmergeItem;
      state.items.splice(unmergeIndex, 1, newVal);
    },
    MOVE_TO_UNMATCH: (state, payload) => {
      let bank = Array.isArray(payload.bank) ? payload.bank : [payload.bank];
      let book = Array.isArray(payload.book) ? payload.book : [payload.book];
      let comment = payload.comment;
      let bank_template = new BankTemplate();
      let book_template = new BookTemplate();

      for (var i = 0; i < Math.max(bank.length, book.length); i++) {
        state.items.push({
          book: book[i] || bank_template.bankObj,
          bank: bank[i] || book_template.bookObj,
          match: false,
          index: state.items.length,
          comment: comment
        });
      }
    },
    ADD_COMMENT: (state, payload) => {
      let newVal = state.items[payload.index];
      newVal.comment = payload.value;
      state.items.splice(payload.index, 1, newVal);
    },

    ADD_REMAINING: (state, payload) => {
      state.remaining.book = payload.book;
      state.remaining.bank = payload.bank;
    }
  },
  actions: {
    pushItems: (context, obj) => {
      context.commit("PUSH_ITEMS", obj);
    },
    undo_unmatch: (context, index) => {
      context.commit("UNDO_UNMATCH", index);
    },
    del: (context, index) => {
      context.commit("DEL", index);
    },
    swapItems: (context, indexs) => {
      context.commit("SWAP_ITEMS", indexs);
    },
    createBankItems: (context, payload) => {
      context.commit("CREATE_BANK", payload);
    },
    createBookItems: (context, payload) => {
      context.commit("CREATE_BOOK", payload);
    },
    mergeBankItems: (context, payload) => {
      context.commit("MERGE_BANK", payload);
    },
    mergeBookItems: (context, payload) => {
      context.commit("MERGE_BOOK", payload);
    },
    unmergeBankItems: (context, index) => {
      context.commit("UNMERGE_BANK", index);
    },
    unmergeBookItems: (context, index) => {
      context.commit("UNMERGE_BOOK", index);
    },
    moveToUnmatch: (context, payload) => {
      context.commit("MOVE_TO_UNMATCH", payload);
    },
    addComment: (context, payload) => {
      context.commit("ADD_COMMENT", payload);
    },
    addRemains: (context, payload) => {
      context.commit("ADD_REMAINING", payload);
    }
  }
};
