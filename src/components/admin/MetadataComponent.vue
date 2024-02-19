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
                                        <h1 class="text-center display-1 font-weight-black">{{ $t("general.BIDLargo") }}</h1>
                                    </v-row>
                                    <v-row align="center" justify="center">
                                        <p class="text-center title">
                                            {{ $t("metadata.text") }}
                                        </p>
                                    </v-row>

                                    <v-row align="center" justify="center" class="mb-6">
                                        <v-col cols="6">
                                            <v-form ref="form">
                                                <v-row align="center" justify="start">
                                                    <v-file-input v-model="file" accept="application/pdf"
                                                        :label="$t('labels.seleccionarArchivoPDF')"
                                                        :rules="requiredRules"></v-file-input>
                                                    <v-btn color="primary" class="ma-6" :disabled="!file"
                                                        @click="cargar()">
                                                        {{ $t("metadata.subirArchivo") }}
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
    </v-container>
</template>

<script>
import Axios from 'axios';
import { mapFields } from "vuex-map-fields";
import Enviroment from '../../scripts/Enviroment';

export default {
    computed: {
        ...mapFields([
            "loader",
            "adminData",
            "typeMessageBar",
            "showMessageBar",
            "messageBar",
        ]),
    },
    data() {
        return {
            file: null,
            requiredRules: [
                (v) => !!v || this.$i18n.t("rulesInput.campoRequerido"), //
            ],
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
            let api = Axios.post(Enviroment.url + '/metadata/upload', formData, {
                headers: {
                    Authorization: "Bearer" + " " + this.adminData.token,
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                this.loader = false
                this.$refs.form.reset()
                this.newMessage("success", this.$i18n.t("metadata.archivoCargadoExito"));
            }).catch(error => {
                this.loader = false
                console.error(error)
                this.newMessage("error", "Error: " + error.response.data[0]);
            })
        }
    }
}
</script>

<style>

</style>