<template>
    <v-app-bar app height="100%">
        <!-- Pantallas xs - md -->
        <v-row align="center" justify="center" class="d-flex d-md-none">
            <v-col cols="10">
                <v-row align="center" justify="start">
                    <div v-if="$route.name == 'HomeUser' || $route.name == 'LMWG' || $route.name == 'LMWD'"
                        class="text-center">
                        <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="primary" icon dark v-bind="attrs" v-on="on">
                                    <v-icon>mdi-menu</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item>
                                    <v-btn text color="primary" x-large @click="toDatos()">
                                        {{ $t("appBar.datos") }}
                                    </v-btn>
                                </v-list-item>
                                <v-list-item>
                                    <v-btn text color="primary" x-large @click="toGraficos()">
                                        {{ $t("appBar.graficos") }}
                                    </v-btn>
                                </v-list-item>
                                <v-list-item>
                                    <v-btn text color="primary" x-large @click="download()">
                                        {{ $t("appBar.metadata") }}
                                    </v-btn>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>
                    <v-img v-if="$i18n.locale == 'es'" src="../../assets/images/bid_logo_short_es.png"
                        class="shrink mr-2 selected" contain width="100" @click="toHome()"></v-img>
                    <v-img v-if="$i18n.locale == 'en'" src="../../assets/images/bid_logo_short_en.png"
                        class="shrink mr-2 selected" contain width="100" @click="toHome()"></v-img>
                </v-row>
            </v-col>
            <v-col cols="2" class="d-flex justify-end">
                <LanguageSwitcherVue class="d-flex justify-end" />
                <v-btn v-if="$route.name == 'HomeAdmin'" icon color="primary" x-large @click="drawerMenuAdmin = true">
                    <v-avatar color="primary" size="50"><span class="white--text">
                            {{ adminData.fullName.charAt(0) }}
                        </span></v-avatar>
                </v-btn>
            </v-col>
        </v-row>
        <!-- Pantallas md - xl -->
        <v-row align="center" justify="center" class="d-none d-md-flex">
            <v-col cols="10">
                <v-row align="center" justify="start">
                    <v-img v-if="$i18n.locale == 'es'" src="../../assets/images/bid_logo_es.png"
                        class="shrink mr-2 selected" contain width="300" @click="toHome()"></v-img>
                    <v-img v-if="$i18n.locale == 'en'" src="../../assets/images/bid_logo_en.png"
                        class="shrink mr-2 selected" contain width="300" @click="toHome()"></v-img>
                    <v-btn v-if="$route.name == 'HomeUser' || $route.name == 'LMWG' || $route.name == 'LMWD'" text
                        color="primary" x-large @click="toDatos()">
                        {{ $t("appBar.datos") }}
                    </v-btn>
                    <v-btn v-if="$route.name == 'HomeUser' || $route.name == 'LMWG' || $route.name == 'LMWD'" text
                        color="primary" x-large @click="toGraficos()">
                        {{ $t("appBar.graficos") }}
                    </v-btn>
                    <v-btn v-if="$route.name == 'HomeUser' || $route.name == 'LMWG' || $route.name == 'LMWD'" text
                        color="primary" x-large @click="download()">
                        {{ $t("appBar.metadata") }}
                    </v-btn>
                </v-row>
            </v-col>
            <v-col cols="2" class="d-flex justify-end">
                <LanguageSwitcherVue class="d-flex justify-end" />
                <v-btn v-if="$route.name == 'HomeAdmin'" icon color="primary" x-large @click="drawerMenuAdmin = true">
                    <v-avatar color="primary" size="50"><span class="white--text">
                            {{ adminData.fullName.charAt(0) }}
                        </span></v-avatar>
                </v-btn>
            </v-col>
        </v-row>
    </v-app-bar>

</template>

<script>
import LanguageSwitcherVue from './LanguageSwitcher.vue';
import Axios from 'axios';
import { mapFields } from 'vuex-map-fields';
import Enviroment from '../../scripts/Enviroment';

export default {
    computed: {
        ...mapFields([
            "loader",
            "adminData",
            "lastPublish",
            "drawerMenuAdmin"
        ]),
    },
    methods: {
        toHome() {
            this.$router.push({ name: "HomeUser" });
        },
        toDatos() {
            this.$router.push({ name: "LMWD" });
        },
        toGraficos() {
            this.$router.push({ name: "LMWG" });
        },
        download() {
            this.loader = true
            let api = Axios.get(Enviroment.url + '/metadata/download', { responseType: 'blob' })
                .then(response => {
                    this.loader = false
                    window.open(URL.createObjectURL(response.data));
                })
                .catch(error => {
                    this.loader = false
                    console.error(error);
                })
        }
    },
    components: {
        LanguageSwitcherVue
    }
}
</script>

<style>
.selected {
    cursor: pointer;
}
</style>