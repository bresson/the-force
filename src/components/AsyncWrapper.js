import Vue from "vue";
// this._vm.$SAGA
// CREDIT and adapted from https://dev.to/codinglukas/vue-js-pattern-for-async-requests-using-renderless-components-3gd#the-async-renderless-component

export default Vue.component("async", {
  props: {
    url: { type: String, default: "", required: true },
    params: { type: Object, default: () => ({}) },
    api: String
  },
  data() {
    return {
      pending: true,
      error: false,
      data: null
    };
  },
  watch: {
    api() {
      this.requestData();
    }
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
    async requestData() {
      this.pending = true;
      console.log("from async wrapper ", this.pending);
      console.log("vm api ", this.$SWAPI);
      this.data = await this.$SWAPI[this.api]();

      // try {
      //   const { data } = await axios.get(this.url, { params: this.params });
      //   this.data = data;
      //   this.error = false;
      // } catch (e) {
      //   this.data = null;
      //   this.error = e;
      // }
      // this.pending = false;
    }
  },
  render() {
    return this.$scopedSlots.default({
      pending: this.pending,
      error: this.error,
      data: this.data
    });
  }
});
