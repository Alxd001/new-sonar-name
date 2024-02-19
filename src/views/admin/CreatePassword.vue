<template>
    <v-container fluid class="fill-height">
        <v-row align="center" justify="center">
            <v-col cols="10" sm="10" md="9" lg="6">
                <v-card class="elevation-12">
                    <v-window>
                        <v-window-item>
                            <v-row>
                                <v-col cols="12" md="8" sm="8">
                                    <v-form ref="form">
                                        <v-container class="fill-height">
                                            <!-- {{ $route.params.token }} -->
                                            <v-row align="center" justify="center" class="mt-6">
                                                <h1 class="text-center display-1 font-weight-black">
                                                    {{ $t("general.BIDLargo") }}
                                                </h1>
                                            </v-row>
                                            <v-row align="center" justify="center" class="mb-3">
                                                <p class="text-center">
                                                    {{ $t("createPassword.text") }}
                                                </p>
                                            </v-row>

                                            <v-row align="center" justify="start" class="ma-2">
                                                <v-col cols="12" md="12" sm="12">
                                                    <v-text-field v-model="password" dense
                                                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                                        :rules="minRules" :type="show1 ? 'text' : 'password'"
                                                        :label="$t('labels.contrasenia')" prepend-icon="mdi-lock"
                                                        @click:append="show1 = !show1"></v-text-field>
                                                </v-col>
                                            </v-row>

                                            <v-row align="center" justify="start" class="ma-2">
                                                <v-col cols="12" md="12" sm="12">
                                                    <v-text-field v-model="password2" dense
                                                        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                                        :rules="confirmRules" :type="show2 ? 'text' : 'password'"
                                                        :label="$t('labels.confirmContrasenia')" prepend-icon="mdi-lock"
                                                        @click:append="show2 = !show2"></v-text-field>
                                                </v-col>
                                            </v-row>

                                            <v-row align="center" justify="center">
                                                <v-btn rounded color="primary" @click="next()" class="ma-6">
                                                    {{ $t("createPassword.generarContrasenia") }}
                                                </v-btn>
                                            </v-row>
                                        </v-container>
                                    </v-form>
                                </v-col>
                                <v-divider vertical></v-divider>

                                <v-col cols="12" md="4" sm="4" class="">
                                    <v-container class="fill-height">
                                        <v-row align="center" justify="center">
                                            <v-img class="shrink mr-2" contain src="../../assets/images/bid_logo_es.png"
                                                transition="scale-transition" height="200" />
                                        </v-row>
                                    </v-container>
                                </v-col>
                            </v-row>
                        </v-window-item>
                    </v-window>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Axios from "axios";
import Enviroment from '../../scripts/Enviroment.js'
import { mapFields } from "vuex-map-fields";
import generalFunctions from '../../assets/scripts/generalFunctions.js';

export default {
    computed: {
        ...mapFields([
            "typeMessageBar",
            "showMessageBar",
            "messageBar",
            "loader",
            "adminData"]),
    },
    data() {
        return {
            show1: false,
            show2: false,
            password: "",
            password2: "",
            minRules: [
                (v) => !!v || this.$i18n.t("rulesInput.campoRequerido"), //
                (v) => v.length >= 8 || this.$i18n.t("rulesInput.minContrasenia"), //
            ],
            confirmRules: [
                (v) => !!v || this.$i18n.t("rulesInput.campoRequerido"), //
                (v) => v.length >= 8 || this.$i18n.t("rulesInput.minContrasenia"), //
                (v) => v == this.password || this.$i18n.t("rulesInput.messageContraseniaConfirm"), //
            ],

        };
    },
    methods: {
        newMessage(type, message) {
            this.typeMessageBar = type;
            this.showMessageBar = true;
            this.messageBar = message;
        },
        next() {
            if (this.$refs.form.validate()) {
                this.newPassword()
            } else {
                this.newMessage("error", this.$i18n.t("rulesInput.messageCamposObligatorios"));
            }
        },
        newPassword() {
            this.loader = true
            let body = {
                temporal: this.$route.params.token,
                password: this.password2
            }
            let api = Axios.post(Enviroment.url + '/admin/generate/password', body)
                .then(response => {
                    this.loader = false
                    this.adminData = response.data
                    generalFunctions.saveSession(this.adminData)
                    this.$router.push({ name: "HomeAdmin" });
                    this.newMessage("success", this.$i18n.t("createPassword.contraseniaActualizada"));
                }).catch(error => {
                    this.loader = false
                    this.newMessage("error", "Error: " + error.response.data[0]);
                    console.error(error.response.data[0])
                })
        },
    }
}
</script>

<style>

</style>