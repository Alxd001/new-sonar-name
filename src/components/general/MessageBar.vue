<template>
    <v-snackbar
      v-model="showMessageBar"
      top
      right
      elevation="10"
      :color="typeMessageBar"
      prominent
      transition="slide-x-reverse-transition"
    >
      <v-row class="d-flex align-center justify-center">
        <v-col cols="3">
          <v-row align="center" justify="center">
            <v-icon v-if="typeMessageBar === 'success'" color="white">
              mdi-check-circle
            </v-icon>
            <v-icon v-if="typeMessageBar === 'error'" color="white">
              mdi-alert-octagon
            </v-icon>
            <v-icon v-if="typeMessageBar === 'info'" color="white">
              mdi-alert-circle-outline
            </v-icon>
          </v-row>
        </v-col>
        <v-col cols="9">
          <v-row align="center" justify="center">
            <p class="textCenter">{{ messageBar }}</p>
          </v-row>
        </v-col>
      </v-row>
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          icon
          small
          v-bind="attrs"
          @click="showMessageBar = false"
        >
          <v-icon> mdi-close </v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </template>
  
  <script>
  import { mapFields } from "vuex-map-fields";
  
  export default {
    computed: {
      ...mapFields(["typeMessageBar", "showMessageBar", "messageBar"]),
    },
    // methods: {
    //   newMessage(type, message) {
    //     this.typeMessageBar = type;
    //     this.showMessageBar = true;
    //     this.messageBar = message;
    //   },
    // },
  };
  </script>
  
  <style scoped>
  .textCenter {
    text-align: center;
    text-justify: distribute;
    margin-bottom: 0 !important;
  }
  </style>