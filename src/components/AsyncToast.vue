<template>
  <div slot:name="messages">
    <v-snackbar v-model="snackbar">
      {{status}}
      <template v-if="status.loading">lading!!!!</template>
      <template v-else-if="status.success">success!!!</template>
      <template v-else-if="status.error">error!!!</template>
      {{ text }}
      <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>
  
  <script>
import { store } from "@/ObservableStore";
export default {
  name: "AsyncToast",
  data: () => ({
    // status: {},
    snackbar: true,
    text: "yep yep",
    changed: null,
    timeouts: {
      error: 5000,
      success: 5000,
      loading: 0
    }
    // msg: {
    //  success: {
    //    text: "Success",
    //    timeout: 2500
    //  },
    //  error: {
    //    text: "Error",
    //  }
    // }
  }),
  created() {
    // this.status = Object.assign({}, this.status, sharedState.state);
    this.status = store;
    // console.log
  },
  computed: {
    state() {
      return store.state;
    }
  },
  watch: {
    // status(newI, oldI) {
    //   console.log("status changed async toast ", newI, oldI);
    // }
  }
};
</script>
  
  <style scoped>
</style>