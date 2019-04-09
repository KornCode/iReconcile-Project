import Vue from "vue";

const sort_index = (a, b) => a.index - b.index;
const index_ObjInArray = (array, index) => {
  let _select_obj = array.find(obj => obj.index === index);
  return array.indexOf(_select_obj);
};

export default {
  namespaced: true,
  state: {
    items: [],
    stack_match: [],
    paired: null,
    grouped: null
  },
  getters: {
    countStacks: state => {
      return state.stack_match.length;
    },
    pairedLength: state => {
      return state.paired ? Object.values(state.paired).length : 0;
    }
  },
  mutations: {
    PUSH_ITEMS: (state, obj) => {
      state.items.push(obj);
    },
    UNDO_MATCH: (state, index) => {
      let select_obj = index_ObjInArray(state.stack_match, index);
      state.items.push(state.stack_match[select_obj]);
      Vue.delete(state.stack_match, select_obj);
      state.items.sort(sort_index);
    },
    DEL: (state, index) => {
      state.stack_match.push(state.items[index]);
      Vue.delete(state.items, index);
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
      // newVal.matched = true;
      state.items.splice(payload.index, 1, newVal);
    },
    ADD_PAIRS: (state, pairs) => {
      state.paired = pairs;
    },
    ADD_GROUPS: (state, groups) => {
      state.grouped = groups;
    }
  },
  actions: {
    pushItems: (context, obj) => {
      context.commit("PUSH_ITEMS", obj);
    },
    undo_match: (context, index) => {
      context.commit("UNDO_MATCH", index);
    },
    del: (context, index) => {
      context.commit("DEL", index);
    },
    replaceItems: (context, payload) => {
      context.commit("REPLACE_ITEMS", payload);
    },
    addPairs: (context, pairs) => {
      context.commit("ADD_PAIRS", pairs);
    },
    addGroups: (context, groups) => {
      context.commit("ADD_GROUPS", groups);
    }
  }
};
