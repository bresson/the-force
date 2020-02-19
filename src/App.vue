<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer v-model="drawer" app right>
        <v-list dense>
          <template v-for="(resourceTitle, idx) in resourceTitles">
            <v-list-item :key="`resourceTitle-${idx}`">
              <v-list-item-content>
                <v-list-item-title @click="getResource(resourceTitle)">
                  {{ resourceTitle }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app color="cyan" dark>
        <v-spacer></v-spacer>
        <v-toolbar-title>SWAPI</v-toolbar-title>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </v-app-bar>

      <v-content>
        <v-container fluid>
          <v-row>
            <template v-if="schema.length">
              <h4>Select a property to display more info!</h4>

              <v-chip
                class="mr-2"
                v-for="prop in schema"
                :key="prop"
                @click="showProp(prop)"
              >
                <template>
                  <v-icon left v-if="!activeResource.headerKey.includes(prop)"
                    >mdi-plus</v-icon
                  >
                  <v-icon left v-else>mdi-close</v-icon>
                </template>
                {{ prop }}</v-chip
              >
            </template>
          </v-row>
          <v-row justify="start" align="start">
            <template v-if="activeResource.content.length">
              <v-col cols="12">
                <v-data-table
                  :headers="activeResource.headerKey"
                  :items="activeResource.content"
                  :items-per-page="10"
                  class="elevation-1"
                  :server-items-length="activeResource.count"
                >
                  <template v-slot:top>
                    <v-toolbar flat>
                      <v-toolbar-title>{{
                        activeResource.header
                      }}</v-toolbar-title>
                      <v-spacer></v-spacer>
                    </v-toolbar>
                  </template>

                  <!-- <template v-slot:header="{ props: { headers } }">
                    <thead>
                      <tr>
                        <th :colspan="headers.length">{{ headers.length }}</th>
                      </tr>
                    </thead>
                  </template> -->

                  <!-- <template v-slot:item.name="{ item }"> -->
                  <!-- {{ item.name.toUpperCase() }} -->
                  <!-- <tr v-for="index in item.items" :key="index">
                      <td
                        v-for="header in headers"
                        class="text-left font-weight-black"
                        :key="header"
                      >{{ index[header.value]}}
                      
                      </td>
                    </tr>
                  </template>-->
                  <!-- </template> -->

                  <!-- <template v-slot:item="props">
                    <tr v-for="index in props.items" :key="index">
                      <td
                        v-for="header in headers"
                        class="text-left font-weight-black"
                        :key="header"
                      >{{ index[header.value]}}</td>
                    </tr>
                  </template>-->

                  <!-- <template slot="items" slot-scope="props">
                    <td v-for="header in headers" :key="header">{{ props.item[header.value] }}</td>
                  </template>-->
                  <!-- <template v-slot:item="props">
                    <td v-for="head in header" :key="head">{{ myprops.item[header.value] }}</td>
                  </template>-->
                </v-data-table>
              </v-col>
            </template>

            <template v-else>
              <h4>Please select a resource to fetch from the hamburger icon</h4>
            </template>
            <!-- <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Name | Title</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, idx) in activeResource.content"
                    :key="`item-${idx}`"
                  >
                    <td>{{ item.name || item.title }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>-->
          </v-row>
        </v-container>
      </v-content>

      <v-footer color="cyan" app>
        <v-spacer></v-spacer>
        <span class="white--text">&copy; 2019</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
export default {
  props: {
    source: String
  },
  errorCaptured(err, component, details) {
    alert("error captured ", err, component, details);
  },
  computed: {
    resources() {
      if (this.endpoints) {
        console.log(this.endpoints);
        return Object.keys(this.endpoints);
      }
      return [];
    },
    resourceTitles() {
      if (this.endpoints) {
        return Object.keys(this.endpoints);
      }
      return [];
    }
  },
  methods: {
    async getResource(resource) {
      this.loading = true;
      const _resource = await this.$SWAPI.getSingleResource({ resource });
      this.activeResource.header = resource;
      this.activeResource.content = _resource.results;
      this.activeResource.headerKey = [
        {
          text: _resource.results[0].name ? "Name" : "Title",
          value: _resource.results[0].name ? "name" : "title",
          sortable: false
        }
      ];
      this.xtraDataCols = this.activeResource.count = _resource.count;
      this.activeResource.next = _resource.next;
      this.activeResource.previous = _resource.previous;
      this.loading = false;
      const { required: schema } = await this.$SWAPI.getSingleResource({
        resource: `${resource}/schema`
      });
      this.schema = schema.filter(
        property => property !== "title" && property !== "name"
      );
      console.log(this.schema);
    },
    async getEndpoints() {
      return await this.$SWAPI.getAllResourceEndpoints();
    },
    async showProp(property) {
      // this.$set(
      //   this.activeResource.headerKey,
      //   this.activeResource.headerKey.length,
      //   {
      //     text: property,
      //     value: property,
      //     sortable: false
      //   }
      // );
      this.activeResource.headerKey.push({
        text: property,
        value: property,
        sortable: false
      });
    }
  },
  data: () => ({
    drawer: null,
    activeResource: {
      header: "",
      headerKey: "",
      count: null,
      next: null,
      previous: null,
      content: [],
      haaders: []
    },
    schema: [],
    endpoints: [],
    loading: false,
    error: null
  }),

  async created() {
    this.loading = true;
    this.endpoints = await this.getEndpoints();
    this.loading = false;
  }
};
</script>
<style scoped lang="scss">
.app {
  position: relative;
}
.panel {
  &__drawer {
    min-height: 100vh;
    max-width: 20rem;
    position: fixed;
  }
}
</style>
