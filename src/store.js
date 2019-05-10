import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";
const add = (a, b) => a + b;

// const timerDateFindLodash = new Date();
// console.log('lodash time', new Date() - timerDateFindLodash);

import Unmatch from "./modules/Unmatch";
import Match from "./modules/Match";

export default new Vuex.Store({
  strict: debug,
  modules: {
    Unmatch,
    Match
  },
  state: {
    files: null,
    raw_files: null,
    matched: [],
    book_account: [],
    bank_accounts: [],

    bank_ref: null,

    show_nav_dashboard: false
  },
  getters: {
    bookBalance: state => {
      return state.files
        ? state.files.book
            .map(bal => bal["Balance"])
            .filter(each => Number(each))
            .reduce(add)
        : 0;
    },
    bankBalance: state => {
      return state.files
        ? state.files.bank
            .flat()
            .map(bal => bal["Balance"])
            .filter(each => Number(each))
            .reduce(add)
        : 0;
    }
  },
  mutations: {
    SHOW_NAV_DASHBOARD: (state, cond) => {
      state.show_nav_dashboard = cond;
    },
    ADD_FILES: (state, file) => {
      state.files = file;
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
    ADD_RAW_FILES: (state, files) => {
      state.raw_files = files;
    }
  },
  actions: {
    showNavDashboard: (context, cond) => {
      context.commit("SHOW_NAV_DASHBOARD", cond);
    },
    addFiles: (context, file) => {
      context.commit("ADD_FILES", file);
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
    addRawFiles: (context, files) => {
      context.commit("ADD_RAW_FILES", files);
    }
  }
});
