<template>
    <v-dialog v-model="newAdminDialog" width="80%" max-width="600" transition="dialog-bottom-transition">
        <v-card>
            <v-card-title class="text-h5 primary">
                <v-col cols="10" class="d-flex align-center justify-start">
                    <span class="font-weight-black white--text">
                        <v-icon color="white" large>mdi-account-plus</v-icon>
                        {{ $t("newAdminDialog.titulo") }}
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
                        {{ $t("newAdminDialog.text") }}
                    </span>
                </v-row>
                <v-form ref="form">
                    <v-text-field v-model="nombreCompleto" outlined prepend-icon="mdi-account"
                        :label="$t('labels.nombre')" :rules="requiredRules">
                    </v-text-field>
                    <v-text-field v-model="email" outlined prepend-icon="mdi-email" :label="$t('labels.email')"
                        :rules="emailRules">
                    </v-text-field>
                    <v-switch v-model="superAdmin" prepend-icon="mdi-account-star"
                        :label="$t('labels.superAdmin')"></v-switch>
                    <v-card flat outlined>
                        <v-card-text class="subtitle-1"><v-icon>mdi-checkbox-marked-outline</v-icon> &nbsp
                            {{ $t("newAdminDialog.permisos") }}</v-card-text>
                        <v-card-text>
                            <v-checkbox v-model="permisos" :label="$t('labels.lectura')" value="R"
                                :disabled="superAdmin || permisos.indexOf('W') >= 0"></v-checkbox>
                            <v-checkbox v-model="permisos" :label="$t('labels.escritura')" value="W"
                                :disabled="superAdmin" @click="addRead()"></v-checkbox>
                        </v-card-text>
                    </v-card>
                </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="next()">
                    {{ $t("newAdminDialog.agregar") }}
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
            "newAdminDialog"
        ]),
    },
    data() {
        return {
            nombreCompleto: '',
            email: '',
            superAdmin: false,
            permisos: [],
            requiredRules: [
                (v) => !!v || this.$i18n.t("rulesInput.campoRequerido"), //
            ],
            emailRules: [
                (v) => !!v || this.$i18n.t("rulesInput.campoRequerido"), //
                (v) =>
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                        v
                    ) || this.$i18n.t("rulesInput.campoRequerido"),
            ],
        }
    },
    methods: {
        newMessage(type, message) {
            this.typeMessageBar = type;
            this.showMessageBar = true;
            this.messageBar = message;
        },
        next() {
            if (this.$refs.form.validate()) {
                if (this.permisos.length) {
                    this.newAdmin()
                } else {
                    this.newMessage("error", this.$i18n.t("rulesInput.messageAsignaPermiso"));
                }
            } else {
                this.newMessage("error", this.$i18n.t("rulesInput.messageCamposObligatorios"));
            }
        },
        close() {
            this.$refs.form.reset()
            this.newAdminDialog = false
        },
        addRead() {
            if (this.permisos.indexOf("W") >= 0) {
                this.permisos = ["R", "W"]
            }
        },
        newAdmin() {
            this.loader = true
            let body = {
                fullName: this.nombreCompleto,
                email: this.email,
                auth: this.permisos.toString(),
                su: this.superAdmin
            }
            let api = Axios.post(Enviroment.url + '/admin/register/new/' + this.$i18n.locale, body, {
                headers: {
                    Authorization: "Bearer" + " " + this.adminData.token,
                }
            })
                .then(response => {
                    this.loader = false
                    this.newMessage("success", this.$i18n.t("newAdminDialog.correoEnviado"));
                    this.close()
                })
                .catch(error => {
                    this.loader = false
                    console.error(error)
                    this.newMessage("error", "Error: " + error.response.data[0]);
                })
        }
    },
    watch: {
        superAdmin() {
            if (this.superAdmin) {
                this.permisos = ["R", "W"]
            }
        },
    }
}
</script>

<style>

</style>