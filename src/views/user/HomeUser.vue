<template>
    <v-container fluid class="padding0">
        <section>
            <v-row align="center" justify="center" class="ma-1">
                <v-img contain src="../../assets/images/image301.png" width="100%"
                    gradient="to top right, rgba(1,1,1,.33), rgb(1, 79, 110, 1)">
                    <v-container class="fill-height">
                        <v-col cols="12" md="12" lg="6">
                            <v-row align="center" justify="center">
                                <!-- Pantallas xs - md -->
                                <span class="display-1 font-weight-medium white--text d-flex d-md-none">{{
                                    $t("homeUser.lmwTitle")
                                }}</span>
                                <!-- Pantallas md - xl -->
                                <span class="display-4 font-weight-medium white--text d-none d-md-flex">{{
                                    $t("homeUser.lmwTitle")
                                }}</span>

                            </v-row>
                        </v-col>
                        <v-col cols="12" md="12" lg="6">
                            <v-row align="end" justify="center">
                                <!-- Pantallas xs - md -->
                                <span class="subtitle-1 text-justify white--text d-flex d-md-none">
                                    {{ $t("homeUser.lmw") }}
                                </span>
                                <!-- Pantallas md - xl -->
                                <span class="headline text-justify white--text d-none d-md-flex">
                                    {{ $t("homeUser.lmw") }}
                                </span>
                            </v-row>
                        </v-col>
                    </v-container>
                </v-img>
            </v-row>
        </section>

        <section>
            <v-row align="center" justify="center" class="ma-6">
                <v-col cols="12" md="12" lg="6">
                    <v-hover v-slot="{ hover }">
                        <v-card width="100%" height="350" :elevation="hover ? 24 : 5" class="rounded-xl"
                            :class="{ 'on-hover': hover }" @click="toDatos()">
                            <v-container class="fill-height">
                                <v-row align="center" justify="center">
                                    <v-col cols="12" md="7">
                                        <v-row align="center" justify="center">
                                            <!-- Pantallas xs - md -->
                                            <span
                                                class="display-1 text-center font-weight-bold primary--text d-flex d-md-none">
                                                {{ $t("homeUser.baseDatosTitle") }}
                                            </span>
                                            <!-- Pantallas md - xl -->
                                            <span
                                                class="display-2 text-center font-weight-bold primary--text d-none d-md-flex">
                                                {{ $t("homeUser.baseDatosTitle") }}
                                            </span>
                                        </v-row>
                                        <v-row align="center" justify="center">
                                            <v-col cols="12" class="text-center">
                                                <!-- Pantallas xs - md -->
                                                <span class="subtitle-2 primary--text d-flex d-md-none">
                                                    {{ $t("homeUser.baseDatos") }}
                                                </span>
                                                <!-- Pantallas md - xl -->
                                                <span class="headline primary--text d-none d-md-flex">
                                                    {{ $t("homeUser.baseDatos") }}
                                                </span>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="12" md="5">
                                        <v-row align="center" justify="center">
                                            <v-img src="../../assets/images/red-en-la-nube.gif" class="d-flex d-md-none" width="80%"
                                                max-width="100"></v-img>
                                                <v-img src="../../assets/images/red-en-la-nube.gif" class="d-none d-md-flex" width="80%"
                                                max-width="200"></v-img>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card>
                    </v-hover>
                </v-col>
                <v-col cols="12" md="12" lg="6">
                    <v-hover v-slot="{ hover }">
                        <v-card width="100%" height="350" :elevation="hover ? 24 : 5" class="rounded-xl"
                            :class="{ 'on-hover': hover }" @click="toGraficos()">
                            <v-container class="fill-height">
                                <v-row align="center" justify="center">
                                    <v-col cols="12" md="7">
                                        <v-row align="center" justify="center">
                                            <!-- Pantallas xs - md -->
                                            <span
                                                class="display-1 text-center font-weight-bold primary--text d-flex d-md-none">
                                                {{ $t("homeUser.graficosTitle") }}
                                            </span>
                                            <!-- Pantallas md - xl -->
                                            <span
                                                class="display-2 text-center font-weight-bold primary--text d-none d-md-flex">
                                                {{ $t("homeUser.graficosTitle") }}
                                            </span>
                                        </v-row>
                                        <v-row align="center" justify="center">
                                            <v-col cols="12" class="text-center">
                                                <!-- Pantallas xs - md -->
                                                <span class="subtitle-2 primary--text d-flex d-md-none">
                                                    {{ $t("homeUser.graficos") }}
                                                </span>
                                                <!-- Pantallas md - xl -->
                                                <span class="headline primary--text d-none d-md-flex">
                                                    {{ $t("homeUser.graficos") }}
                                                </span>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="12" md="5">
                                        <v-row align="center" justify="center">
                                            <v-img src="../../assets/images/grafico-de-barras.gif" class="d-flex d-md-none" width="80%"
                                                max-width="100"></v-img>
                                                <v-img src="../../assets/images/grafico-de-barras.gif" class="d-none d-md-flex" width="80%"
                                                max-width="200"></v-img>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card>
                    </v-hover>
                </v-col>
            </v-row>
        </section>

        <section>
            <v-row align="center" justify="center" class="ma-6">
                <v-col cols="12" md="12" lg="6">
                    <v-hover v-slot="{ hover }">
                        <v-card width="100%" height="250" :elevation="hover ? 24 : 5" class="rounded-xl"
                            :class="{ 'on-hover': hover }" @click="download()">
                            <v-container class="fill-height">
                                <v-row align="center" justify="center">
                                    <v-col cols="12" md="7">
                                        <v-row align="center" justify="center">
                                            <!-- Pantallas xs - md -->
                                            <span
                                                class="display-1 text-center font-weight-bold primary--text d-flex d-md-none">
                                                {{ $t("homeUser.metadataTitle") }}
                                            </span>
                                            <!-- Pantallas md - xl -->
                                            <span
                                                class="display-2 text-center font-weight-bold primary--text d-none d-md-flex">
                                                {{ $t("homeUser.metadataTitle") }}
                                            </span>
                                        </v-row>
                                        <v-row align="center" justify="center">
                                            <v-col cols="12" class="text-center">
                                                <!-- Pantallas xs - md -->
                                                <span class="subtitle-2 primary--text d-flex d-md-none">
                                                    {{ $t("homeUser.metadata") }}
                                                </span>
                                                <!-- Pantallas md - xl -->
                                                <span class="headline primary--text d-none d-md-flex">
                                                    {{ $t("homeUser.metadata") }}
                                                </span>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="12" md="5">
                                        <v-row align="center" justify="center">
                                            <v-img src="../../assets/images/carpeta.gif" class="d-flex d-md-none" width="80%"
                                                max-width="100"></v-img>
                                                <v-img src="../../assets/images/carpeta.gif" class="d-none d-md-flex" width="80%"
                                                max-width="200"></v-img>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card>
                    </v-hover>
                </v-col>
            </v-row>
        </section>
    </v-container>
</template>

<script>
import Axios from 'axios';
import { mapFields } from 'vuex-map-fields';
import Enviroment from '../../scripts/Enviroment';

export default {
    computed: {
        ...mapFields([
            "loader",
            "lastPublish"
        ]),
    },
    methods: {
        toGraficos() {
            this.$router.push({ name: "LMWG" });
        },
        toDatos() {
            this.$router.push({ name: "LMWD" });
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
    }
}
</script>

<style scoped>
.padding0 {
    padding: 0 !important;
}
</style>