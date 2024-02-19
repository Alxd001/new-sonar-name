<template>
    <v-container fluid>
        <v-row align="center" justify="center">
            <v-col cols="10" sm="10" md="9" lg="10">
                <v-card flat>
                    <v-row>
                        <v-col cols="12">
                            <v-form ref="form">
                                <v-container class="fill-height">
                                    <v-row align="center" justify="center" class="mt-6">
                                        <h1 class="text-center display-1 font-weight-black">{{ $t("general.BIDLargo") }}
                                        </h1>
                                    </v-row>
                                    <v-row align="center" justify="center">
                                        <p class="text-center title">
                                            {{ $t("agregarDatos.text") }}
                                        </p>
                                    </v-row>

                                    <v-row align="center" justify="center" class="mb-6">
                                        <v-col cols="6">
                                            <v-form ref="form">
                                                <v-row align="center" justify="start">
                                                    <v-file-input v-model="file" accept="text/csv"
                                                        :label="$t('labels.seleccionarArchivoCSV')"
                                                        :rules="requiredRules"></v-file-input>
                                                    <v-btn color="primary" class="ma-6" :disabled="!file"
                                                        @click="cargar()">
                                                        {{ $t("agregarDatos.subirArchivo") }}
                                                    </v-btn>
                                                </v-row>
                                            </v-form>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <v-card elevation="0" v-if="preData">
            <v-card-title>
                <v-row align="center" justify="end">
                    <v-col cols="6">
                        <v-row align="center" justify="start">
                            <v-btn color="success" elevation="10" class="ma-6" @click="agregarDatos()">
                                {{ $t("agregarDatos.publicarCambios") }}
                            </v-btn>
                        </v-row>
                    </v-col>
                    <v-col cols="6">
                        <v-row align="center" justify="end">
                            <v-text-field v-model="search" append-icon="mdi-magnify" :label="$t('labels.buscar')"
                                single-line hide-details></v-text-field>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-title>
            <div>
                <v-data-table v-if="preData" :headers="headers" :items="preData" :search="search" :page.sync="page"
                    hide-default-footer @page-count="pageCount = $event"></v-data-table>
                <div class="text-center pt-2">
                    <v-pagination v-model="page" circle :length="pageCount"></v-pagination>
                </div>
            </div>
        </v-card>
        <ConfirmDialogVue typeConfirm="agregar" :fileNameBackEnd="fileName" />
    </v-container>
</template>

<script>
import Axios from 'axios';
import { mapFields } from "vuex-map-fields";
import Enviroment from '../../scripts/Enviroment';
import ConfirmDialogVue from './ConfirmDialog.vue';

export default {
    computed: {
        ...mapFields([
            "loader",
            "adminData",
            "typeMessageBar",
            "showMessageBar",
            "messageBar",
            "confirmDialog",
            "transaccionCompleta"
        ]),
    },
    components: {
        ConfirmDialogVue
    },
    data() {
        return {
            file: null,
            search: '',
            requiredRules: [
                (v) => !!v || this.$i18n.t("rulesInput.campoRequerido"), //
            ],
            preData: null,
            headers: null,
            page: 1,
            pageCount: 0,
            fileName: null
        }
    },
    methods: {
        newMessage(type, message) {
            this.typeMessageBar = type;
            this.showMessageBar = true;
            this.messageBar = message;
        },
        cargar() {
            this.loader = true
            const formData = new FormData();
            formData.append("file", this.file);
            let api = Axios.post(Enviroment.url + '/datasets/verify', formData, {
                headers: {
                    Authorization: "Bearer" + " " + this.adminData.token,
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                this.loader = false
                if (response.data.code == 100) {
                    this.headers = response.data.data.headers
                    this.preData = response.data.data.rows
                    this.fileName = response.data.data.fileName
                    this.newMessage("success", this.$i18n.t("agregarDatos.archivoCargadoExito"));
                } else {
                    this.newMessage("error", this.$i18n.t("agregarDatos.archivoCargadoError"));
                }
            }).catch(error => {
                this.loader = false
                console.error(error)
                this.newMessage("error", "Error: " + error.response.data[0]);
            })
        },
        agregarDatos() {
            this.confirmDialog = true
            this.transaccionCompleta = false
        }
    },
    watch: {
        transaccionCompleta() {
            if (this.transaccionCompleta) {
                this.preData = null,
                    this.headers = null,
                    this.fileName = null
            }
        }
    }
}
</script>

<style>

</style>