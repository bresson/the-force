import Vue from "vue";
import sharedState from "@/sharedState";
// this._vm.$SAGA
// CREDIT and adapted from https://dev.to/codinglukas/vue-js-pattern-for-async-requests-using-renderless-components-3gd#the-async-renderless-component
// ummmm.... this is really no different than any other component
export default Vue.component("asyncnotices", {
  data() {
    return {
      status: sharedState.state
    };
  },
  created() {
    // this.status = Object.assign({}, this.status, sharedState.state);
  },
  watch: {
    sharedState() {
      console.log("changed shared state");
    },
    status() {
      console.log("changed status ", this.status);
    }
    // sharedState.state() {
    // }
    // params: {
    //   handler() {
    //     this.requestData();
    //   },
    //   deep: true
    // }
  },
  // mounted() {
  //   this.requestData();
  // },
  methods: {
    // async requestData() {
    // this.pending = true;
    // console.log("from async wrapper ", this.pending);
    // console.log("vm api ", this.$SWAPI);
    // this.data = await this.$SWAPI[this.api]();
    // try {
    //   const { data } = await axios.get(this.url, { params: this.params });
    //   this.data = data;
    //   this.error = false;
    // } catch (e) {
    //   this.data = null;
    //   this.error = e;
    // }
    // this.pending = false;
    // }
  },
  render() {
    return this.$scopedSlots.default({
      status
    });
  }
});
