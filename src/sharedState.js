/**
 * In lieu of Vuex or other "global" state resource
 * Very simple "state" machine
 * Only one state can be active at any time
 */
export default {
  debug: false,
  state: {
    error: null,
    loading: null,
    success: null
  },

  setSuccess() {},
  clearSuccess() {},
  setLoading() {},
  clearLoading() {},

  reducer(type, newState) {
    const _template = {
      error: null,
      loading: null,
      success: null
    };
    switch (type) {
      case "success":
        this.state = {
          ..._template,
          success: newState
        };
        console.log("new state ", this.state);
        break;
      case "error":
        this.state = {
          ..._template,
          error: newState
        };
        console.log("new state ", this.state);
        break;
      case "loading":
        this.state = {
          ..._template,
          loading: newState
        };
        console.log("new state ", this.state);
        break;
    }
  }

  // setMessageAction(newValue) {
  //   if (this.debug) console.log("setMessageAction triggered with", newValue);
  //   this.state.message = newValue;
  // },
  // clearMessageAction() {
  //   if (this.debug) console.log("clearMessageAction triggered");
  //   this.state.message = "";
  // }
};
