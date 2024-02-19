<template>
  <v-app>
    <NavigationDrawerVue v-if="$route.name == 'HomeAdmin'" />
    <AppBarVue />
    <v-main>
      <router-view />
    </v-main>
    <MessageBar />
    <LoaderVue />
    <ContactButtonVue v-if="$route.name == 'HomeUser' || $route.name == 'LMWG' || $route.name == 'LMWD'" />
  </v-app>
</template>

<script>
import { mapFields } from "vuex-map-fields";

import AppBarVue from './components/general/AppBar.vue';
import ContactButtonVue from './components/general/ContactButton.vue';
import LoaderVue from './components/general/Loader.vue';
import MessageBar from './components/general/MessageBar.vue';
// import generalFunctions from './assets/scripts/generalFunctions';
import NavigationDrawerVue from './components/admin/NavigationDrawer.vue';
import Enviroment from './scripts/Enviroment';
import Axios from 'axios';

export default {
  components: {
    AppBarVue,
    ContactButtonVue,
    MessageBar,
    LoaderVue,
    NavigationDrawerVue
  },
  computed: {
    ...mapFields([
      "typeMessageBar",
      "showMessageBar",
      "messageBar",
      "loader",
      "adminData",
      "lastPublish"
    ]),
  },
  methods: {
    getLastPublish() {
      this.loader = true
      let api = Axios.get(Enviroment.url + '/datasets/backups/last')
        .then(response => {
          this.loader = false
          this.lastPublish = new Date(response.data.data).toLocaleString("en-US", this.optionsDate)
        }).catch(error => {
          this.loader = false
          console.error(error)
        })
    }
  },
  mounted() {
    this.getLastPublish()
  }
};
</script>
