/**
 * In lieu of Vuex or other "global" state resource
 */
export const sharedState = {
  state: {
    debug: true,
    error: null,
    loading: null,
    success: null
  },

  setSuccess() {},
  clearSuccess() {},
  setLoading() {},
  clearLoading() {},

  reducer(type, newState) {
    switch (type) {
      case "success":
        return {
          ...this.state,
          success: newState
        };
      case "error":
        return {
          ...this.state,
          error: newState
        };
      case "loading":
        return {
          ...this.state,
          loading: newState
        };
    }
  },

  setMessageAction(newValue) {
    if (this.debug) console.log("setMessageAction triggered with", newValue);
    this.state.message = newValue;
  },
  clearMessageAction() {
    if (this.debug) console.log("clearMessageAction triggered");
    this.state.message = "";
  }
};
