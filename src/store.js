import Vue from "vue";
import Vuex from "vuex";
// import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

// const timerDateFindLodash = new Date();
// console.log('lodash time', new Date() - timerDateFindLodash);

export default new Vuex.Store({
  // plugins: [createPersistedState({ storage: window.sessionStorage })],
  strict: debug,
  state: {
    files: null,
    paired: null,
    matched: [],
    book_account: null,
    bank_accounts: [],

    stack: [],
    bank_ref: null,
    items: [],

    show_nav_dashboard: false
  },
  getters: {
    countStacks: state => {
      return state.stack.length;
    },
    bookBalance: state => {
      const add = (a, b) => a + b;
      return state.files.book.map(bal => bal["Balance"]).reduce(add);
    },
    bankBalance: state => {
      const add = (a, b) => a + b;
      return state.files.bank
        .flat()
        .map(bal => bal["Balance"])
        .reduce(add);
    }
  },
  mutations: {
    SHOW_NAV_DASHBOARD: (state, cond) => {
      state.show_nav_dashboard = cond;
    },
    ADD_FILES: (state, file) => {
      state.files = file;
    },
    ADD_PAIRS: (state, pairs) => {
      state.paired = pairs;
    },
    ADD_BOOK_ACC: (state, account) => {
      state.book_account = account;
    },
    ADD_BANK_ACC: (state, account) => {
      state.bank_accounts = account;
    },
    ADD_BANK_REF: (state, ref) => {
      state.bank_ref = ref;
    },
    PUSH_ITEMS: (state, obj) => {
      state.items.push(obj);
    },
    DEL: (state, index) => {
      state.stack.push(state.items[index]);
      Vue.delete(state.items, index);
      // state.items.splice(index, 1);
    },
    UNDO: (state, index) => {
      const _sort_index = (a, b) => a.index - b.index;
      const _index_ObjInArray = (array, index) => {
        let _select_obj = array.find(obj => obj.index === index);
        return array.indexOf(_select_obj);
      };

      let select_obj = _index_ObjInArray(state.stack, index);

      state.items.push(state.stack[select_obj]);
      Vue.delete(state.stack, select_obj);
      state.items.sort(_sort_index);
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
      newVal.matched = true;
      state.items.splice(payload.index, 1, newVal);
    }
  },
  actions: {
    showNavDashboard: (context, cond) => {
      context.commit("SHOW_NAV_DASHBOARD", cond);
    },
    addFiles: (context, file) => {
      context.commit("ADD_FILES", file);
    },
    addPairs: (context, pairs) => {
      context.commit("ADD_PAIRS", pairs);
    },
    addBookAcc: (context, account) => {
      context.commit("ADD_BOOK_ACC", account);
    },
    addBankAcc: (context, account) => {
      context.commit("ADD_BANK_ACC", account);
    },
    addBankRef: (context, ref) => {
      context.commit("ADD_BANK_REF", ref);
    },
    pushItems: (context, obj) => {
      context.commit("PUSH_ITEMS", obj);
    },
    del: (context, index) => {
      context.commit("DEL", index);
    },
    undo: (context, index) => {
      context.commit("UNDO", index);
    },
    replaceItems: (context, payload) => {
      context.commit("REPLACE_ITEMS", payload);
    }
  }
});
