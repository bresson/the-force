<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" class="deep-purple accent-4" clipped>
      <v-list subheader>
        <v-subheader>Resources</v-subheader>
        <v-list-item-subtitle
          >Please select a resource to view</v-list-item-subtitle
        >

        <v-list-item v-for="resource in resources" :key="resource">
          <h5 @click="getResource(resource)">{{ resource }}</h5>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>SWAPI : The Force Awakens as an API!</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <v-row>
          <v-col cols="auto">
            <h4>
              Active resource:
              {{
                activeResource.header
                  ? activeResource.header
                  : "Please select a resource from left column"
              }}
            </h4>
            <template v-if="activeResource.content">
              <div
                v-for="(resource, idx) in activeResource.content"
                :key="`resource-${idx}`"
              >
                <h5>{{ resource.name || resource.title }}</h5>
              </div>
            </template>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer app>
      <span>Done by me</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  computed: {
    resources() {
      if (this.endpoints) {
        console.log(this.endpoints);
        return Object.keys(this.endpoints);
      }
      return [];
    }
  },
  methods: {
    async getResource(resource) {
      console.log("clickme ", resource);
      const _resource = await this.$SWAPI.getSingleResource({ resource });
      debugger;
      this.activeResource.header = resource;
      this.activeResource.content = _resource.results;
      console.log(_resource);
    }
  },
  data: () => ({
    drawer: null,
    activeResource: {
      header: "",
      content: []
    },
    endpoints: []
  }),

  async created() {
    const _endpoints = await this.$SWAPI.getAllResourceEndpoints();
    this.endpoints = _endpoints;
  }
};
</script>
<style scoped lang="scss">
.app {
  position: relative;
}
.panel {
  height: 100vh;
  max-width: 20rem;
  position: fixed;
}
</style>
