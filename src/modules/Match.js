import Vue from "vue";

const sort_index = (a, b) => a.index - b.index;
const real_index_of_ele = (array, index) => {
  let _select_obj = array.find(obj => obj.index === index);
  return array.indexOf(_select_obj);
};

export default {
  namespaced: true,
  state: {
    items: [],
    stack_match: [],
    paired: null,
    grouped: null,

    mergeBankRecord: {}
  },
  getters: {
    countStacks: state => {
      return state.stack_match.length;
    },
    pairedLength: state => {
      return state.items ? Object.values(state.items).length : 0;
    }
  },
  mutations: {
    PUSH_ITEMS: (state, obj) => {
      state.items.push(obj);
    },
    UNDO_MATCH: (state, index) => {
      let select_obj = real_index_of_ele(state.stack_match, index);
      state.items.push(state.stack_match[select_obj]);
      Vue.delete(state.stack_match, select_obj);
      state.items.sort(sort_index);
    },
    DEL: (state, index) => {
      state.stack_match.push(state.items[index]);
      Vue.delete(state.items, index);
    },
    DEL_TO_UNMATCH: (state, index) => {
      Vue.delete(state.items, index);
    },
    ADD_COMMENT: (state, payload) => {
      let newVal = state.items[payload.index];
      newVal.comment = payload.value;
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
    delToUnmatch: (context, index) => {
      context.commit("DEL_TO_UNMATCH", index);
    },
    addComment: (context, payload) => {
      context.commit("ADD_COMMENT", payload);
    },
    addPairs: (context, pairs) => {
      context.commit("ADD_PAIRS", pairs);
    },
    addGroups: (context, groups) => {
      context.commit("ADD_GROUPS", groups);
    }
  }
};
