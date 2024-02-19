<template>
    <v-dialog v-model="editPaisDialog" width="80%" max-width="600" transition="dialog-bottom-transition">
        <v-card>
            <v-card-title class="text-h5 primary">
                <v-col cols="10" class="d-flex align-center justify-start">
                    <span class="font-weight-black white--text">
                        <v-icon color="white" large>mdi-note-edit-outline</v-icon>
                        {{ $t("editPaisDialog.titulo") }}
                    </span>
                </v-col>

                <v-col cols="2" class="d-flex align-center justify-end">
                    <v-btn icon x-large color="white" @click="close()">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-col>
            </v-card-title>
            <v-card-text class="mt-6">
                <v-row align="center" justify="center" class="mb-2">
                    <span class="text-body-2">
                        {{ $t("editPaisDialog.text") }}
                    </span>
                </v-row>
                <v-form ref="form">
                    <v-row align="center" justify="center">
                        <v-col cols="6">
                            <v-row align="center" justify="center">
                                <span class="title">
                                    {{ paisData.name }}
                                </span>
                            </v-row>
                            <v-row align="center" justify="center">
                                <img :src="paisData.flag" width="200">
                            </v-row>
                        </v-col>
                        <v-col cols="6">
                            <v-color-picker v-model="paisData.color" class="ma-2" mode="hexa"></v-color-picker>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="updatePais()" :disabled="!paisData.color">
                    {{ $t("editPaisDialog.actualizar") }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import Axios from 'axios';
import Enviroment from '../../scripts/Enviroment';
import { mapFields } from "vuex-map-fields";


export default {
    computed: {
        ...mapFields([
            "typeMessageBar",
            "showMessageBar",
            "messageBar",
            "loader",
            "adminData",
            "editPaisDialog"
        ]),
    },
    props: {
        paisData: {
            type: Object,
            default: function () {
                return { color: "", flag: "", id: 0, name: "" }
            }
        },
    },
    data() {
        return {
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
        close() {
            this.editPaisDialog = false
        },
        updatePais() {
            this.loader = true
            let body = {
                id: this.paisData.id,
                color: this.paisData.color
            }
            let api = Axios.post(Enviroment.url + '/catalog/update/country', body, 
            {
                headers: {
                    Authorization: "Bearer" + " " + this.adminData.token,
                }
            })
            .then(response=> {
                this.newMessage("success", this.$i18n.t("editPaisDialog.actualizarSuccessMessage"));
                this.close()
                this.loader = false
            })
            .catch(error => {
                console.error(error)
                this.newMessage("error", "Error: " + error.response.data[0]);
                this.loader = false
            })
        },
    }
}
</script>

<style>

</style>