import Vue from "vue";

const sort_index = (a, b) => a.index - b.index;
const index_ObjInArray = (array, index) => {
  let _select_obj = array.find(obj => obj.index === index);
  return array.indexOf(_select_obj);
};
const check_match_money = (debit, credit, deposit, withdraw) => {
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
    editBalance: 0
  },
  getters: {
    countStackUnmatch: state => {
      return state.stack_unmatch.length;
    },
    remainingLength: state => {
      let remainsBook = state.remaining.book;
      let remainsBank = state.remaining.bank;
      return remainsBook.length >= remainsBank.length
        ? remainsBook.length
        : remainsBank.length;
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
      state.editBalance = 0;
      state.stack_unmatch.push(state.items[index]);
      Vue.delete(state.items, index);
    },
    SWAP_ITEMS: (state, indexs) => {
      let temp = state.items[indexs.first].bank;
      state.items[indexs.first].bank = state.items[indexs.second].bank;
      state.items[indexs.second].bank = temp;
    },
    EDIT_BANK: (state, payload) => {
      let obj = {
        Date: payload.Date,
        Desc: payload.Desc,
        Deposit: payload.Deposit,
        Withdraw: payload.Withdraw
      };
      if (payload.Deposit && payload.Withdraw) {
        alert("Choose either deposit or withdraw.")
      }
      else {
        state.items[payload.index].match = check_match_money(
          state.items[payload.index].book.Debit,
          state.items[payload.index].book.Credit,
          payload.Deposit,
          payload.Withdraw
        );
        state.editBalance = (payload.Withdraw * -1) || (payload.Deposit);
        state.items[payload.index].bank = obj;
      }
    },
    REPLACE_ITEMS: (state, payload) => {
      let newVal = state.items[payload.index];
      let expr = payload.type;
      switch (expr) {
        case "transfer":
          newVal.metas.transfer = payload.value;
          break;
        case "create":
          newVal.metas.create.who = payload.value.who;
          newVal.metas.create.what = payload.value.what;
          newVal.metas.create.why = payload.value.why;
          break;
        case "comment":
          newVal.metas.comment = payload.value;
          break;
        case "entity":
          newVal.bank.Bank_Entity = payload.value;
          break;
        default:
          break;
      }
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
    editBank: (context, payload) => {
      context.commit("EDIT_BANK", payload);
    },
    replaceItems: (context, payload) => {
      context.commit("REPLACE_ITEMS", payload);
    },
    addRemains: (context, payload) => {
      context.commit("ADD_REMAINING", payload);
    }
  }
};
