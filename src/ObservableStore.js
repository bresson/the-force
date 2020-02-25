import Vue from "vue";

export const store = Vue.observable({
  state: {
    error: null,
    loading: null,
    success: null
  }
});

export const mutations = {
  setCount(count) {
    store.count = count;
  },
  reducer(type, newState) {
    const _template = {
      error: null,
      loading: null,
      success: null
    };
    switch (type) {
      case "success":
        store.state = {
          ...store.state,
          ..._template,
          success: newState
        };
        console.log("new state success ", store.state);
        break;
      case "error":
        store.state = {
          ...store.state,
          ..._template,
          error: newState
        };
        console.log("new state error ", store.state);
        break;
      case "loading":
        store.state = {
          ...store.state,
          ..._template,
          loading: newState
        };
        console.log("new state loading ", store.state);
        break;
    }
  }
};
