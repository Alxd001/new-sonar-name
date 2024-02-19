<template>
    <v-dialog v-model="recoverPasswordAdminDialog" width="80%" max-width="600" transition="dialog-bottom-transition">
        <v-card>
            <v-card-title class="text-h5 primary">
                <v-col cols="10" class="d-flex align-center justify-start">
                    <span class="font-weight-black white--text">
                        <v-icon color="white" large>mdi-lock-reset</v-icon>
                        {{ $t("recoverPasswordDialog.titulo") }}
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
                    <span class="text-body-2">{{ $t("recoverPasswordDialog.text") }}</span>
                </v-row>
                <v-form ref="form">
                    <v-text-field v-model="email" outlined prepend-icon="mdi-email" :label="$t('labels.email')"
                        :rules="emailRules">
                    </v-text-field>
                </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="next()">
                    {{ $t("recoverPasswordDialog.recuperar") }}
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
            "recoverPasswordAdminDialog"
        ]),
    },
    data() {
        return {
            email: '',
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
                this.newAdmin()
            } else {
                this.newMessage("error", this.$i18n.t("rulesInput.messageCamposObligatorios"));
            }
        },
        close() {
            this.$refs.form.reset()
            this.recoverPasswordAdminDialog = false
        },
        newAdmin() {
            this.loader = true
            let body = {
                email: this.email,
            }
            let api = Axios.post(Enviroment.url + '/admin/recover/password/' + this.$i18n.locale, body)
                .then(response => {
                    this.loader = false
                    this.newMessage("success", this.$i18n.t("recoverPasswordDialog.messageSend"));
                    this.close()
                })
                .catch(error => {
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