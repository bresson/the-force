import Vue from "vue";
// this._vm.$SAGA

export default Vue.component("async", {
  props: {
    url: { type: String, default: "", required: true },
    params: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      pending: true,
      error: false,
      data: null
    };
  },
  watch: {
    url() {
      this.requestData();
    },
    params: {
      handler() {
        this.requestData();
      },
      deep: true
    }
  },
  mounted() {
    this.requestData();
  },
  methods: {
    async requestData() {
      this.pending = true;
      console.log("from async wrapper ", this.pending);
      console.log("vm api ", this.$SWAPI);
      this.data = await this.$SWAPI.sanityCheck();

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
