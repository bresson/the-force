<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer v-model="drawer" app right>
        <v-list dense>
          <template v-for="(resourceTitle, idx) in resourceTitles">
            <v-list-item :key="`resourceTitle-${idx}`">
              <v-list-item-content>
                <v-list-item-title @click="getAll(resourceTitle)">{{ resourceTitle }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
        <v-btn @click="getAll">get all</v-btn>
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
            </template>
          </v-row>
          <v-row>
            <template v-if="schema.length" :isHeader="activeResource.headers.includes(prop)">
              <v-chip
                class="mr-2"
                small
                v-for="prop in schema"
                :key="prop"
                @click="showProp(prop)"
                :color="`${activeResource.headers.includes(prop) ? 'blue' : 'orange'}`"
              >
                <template>
                  <v-icon left v-if="!activeResource.headers.includes(prop)">mdi-plus</v-icon>
                  <v-icon left v-else>mdi-close</v-icon>
                </template>
                {{ prop }}
              </v-chip>
            </template>
          </v-row>
          <v-row justify="start" align="start">
            <template v-if="activeResource.content.length">
              <v-col cols="12">
                <v-data-table
                  :headers="resourceHeaders"
                  :items="activeResource.content"
                  :items-per-page="10"
                  class="elevation-1"
                  :search="search"
                >
                  <template v-slot:top>
                    <v-toolbar flat>
                      <v-toolbar-title>
                        {{
                        activeResource.resource
                        }}
                      </v-toolbar-title>
                      <v-spacer></v-spacer>
                    </v-toolbar>
                  </template>

                  <template v-slot:header="{ props: { headers } }">
                    <thead>
                      <tr>
                        <!-- <td v-for="head in headers" :key="head.text">{{ head }}</td> -->
                        <!-- <th :colspan="headers.length">{{ headers.length }}</th> -->
                        <td v-for="head in headers" :key="head.text">
                          <v-text-field
                            v-model="activeResource.search[head.text]"
                            append-icon="mdi-magnify"
                            label="Filter this column"
                          ></v-text-field>
                        </td>
                      </tr>
                    </thead>
                  </template>

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

                  <!-- <template v-slot:header="{ header }">
                    <td v-for="head in header" :key="head">{{ head.text.toUpperCase() }}</td>
                  </template>-->
                  <!--   adapated from codepen https://codepen.io/pen/?&editable=true&editors=101
                  -->
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
      <v-snackbar v-model="async" :multi-line="multiLine">
        <template v-if="loading">"Loading"</template>
        <template v-else-if="error">"Error"</template>
        <template v-else-if="success">"Success!"</template>
      </v-snackbar>
      <!-- <async-notices>
        <template v-slot:default="{ pending, error, success }">
          <div v-if="pending">Loading ...</div>
          <div v-else-if="error">{{ error, }}</div>
          <div v-else>{{ success }}</div>
        </template>
      </async-notices>-->
      <!-- <async-wrapper api="sanityCheck" url="https://dog.ceo/api/breed/husky/images">
        <template v-slot:default="{ pending, error, data }">
          <div v-if="pending">Loading ...</div>
          <div v-else-if="error">{{ error }}</div>
          <div v-else>{{ data }}</div>
        </template>
      </async-wrapper>-->
      <v-footer color="cyan" app>
        <v-spacer></v-spacer>
        <span class="white--text">&copy; 2019</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import { sharedState } from "@/sharedState";
// import AsyncWrapper from "@/components/AsyncWrapper";
// import AsyncNotices from "@/components/AsyncNotices";

export default {
  components: {
    // AsyncWrapper,
    // AsyncNotices
  },
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
    },
    resourceHeaders() {
      if (this.activeResource.headers.length) {
        return this.activeResource.headers.reduce((acc, elem) => {
          return [
            ...acc,
            {
              text: elem,
              value: elem,
              sortable: false,
              filter: value => {
                if (!this.activeResource.search[elem]) return true;
                console.log(
                  "regex ",
                  value,
                  " -- ",
                  this.activeResource.search[elem],
                  RegExp(`${this.activeResource.search[elem]}`).test(value)
                );
                return RegExp(`${this.activeResource.search[elem]}`).test(
                  value
                );
              }
            }
          ];
        }, []);
      }
      return [];
    }
  },
  methods: {
    /**
     * Please THROTTLE in production!!!
     */
    // searchColumn(property) {
    //   console.log("property search col ", property);
    //   this.activeResource.content.filter({property} => RegExp())
    // },
    isolateSearch(property) {
      console.log("property ", property);
      this.activeResource.searchHeaders = property;
      // this.resourceHeaders = Object.assign({}, this.resourceHeaders, {
      //   value: property,
      //   text: property,
      //   filterable: true,
      //   sortable: false
      // });
    },
    removeIsolateSearch() {
      this.activeResource.searchHeaders = "";
    },
    clearResource() {
      const _template = {
        activeResource: {
          resource: "",
          headerKey: "",
          count: null,
          next: null,
          previous: null,
          content: [],
          headers: []
        }
      };
      this.schema = [];
      this.activeResource = Object.assign(
        {},
        this.activeResource,
        _template.activeResource
      );
    },
    transformResources(resource) {
      this.activeResource.content = resource.reduce(
        (acc, { results }) => [...acc, ...results],
        []
      );
      this.activeResource.headers.push(
        this.activeResource.content[0].name ? "name" : "title"
      );
      this.activeResource.headers.push();
      this.xtraDataCols = this.activeResource.count = resource[0].count;
      // this.activeResource.next = resource.next;
      // this.activeResource.previous = resource.previous;
      this.activeResource.search = Object.assign(
        {},
        this.activeResource.search,
        {
          [this.activeResource.headers[0]]: ""
        }
      );
      this.loading = false;
    },
    async getAll(resource) {
      this.loading = true;
      const _all = await this.$SWAPI.getAllPagesOfResource({
        resource
      });
      this.clearResource();
      this.activeResource.resource = resource;
      this.transformResources(_all);
      const { required: schema } = await this.$SWAPI.getSingleResource({
        resource: `${resource}/schema`
      });
      this.schema = schema.filter(
        property => property !== "title" && property !== "name"
      );
      this.loading = false;
    },
    async getResource(resource) {
      this.loading = true;
      const _resource = await this.$SWAPI.getAllPagesOfResource({ resource });
      this.activeResource.resource = resource;
      this.activeResource.content = _resource.results;
      this.activeResource.headers.push(
        _resource.results[0].name ? "name" : "title"
      );
      // this.activeResource.headerKey = [
      //   {
      //     text: _resource.results[0].name ? "Name" : "Title",
      //     value: _resource.results[0].name ? "name" : "title",
      //     sortable: false
      //   }
      // ];
      this.activeResource.headers.push();
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
      return await this.$SWAPI.getEveryResourceEndpoint();
    },
    async showProp(property) {
      const _propertyIndex = this.activeResource.headers.indexOf(property);
      if (_propertyIndex === -1) {
        this.activeResource.headers.push(property);
        this.message = `Added ${property}`;
      } else {
        this.activeResource.headers = [
          ...this.activeResource.headers.slice(0, _propertyIndex),
          ...this.activeResource.headers.slice(_propertyIndex + 1)
        ];
      }
    }
  },
  data: () => ({
    search: "",
    async: sharedState,
    drawer: null,
    activeResource: {
      resource: "",
      headerKey: "",
      count: null,
      next: null,
      previous: null,
      content: [],
      headers: [],
      search: {},
      searchHeaders: ""
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
