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
                                            <v-row align="center" justify="center" class="mt-6">
                                                <h1 class="text-center display-1 font-weight-black">{{
                                                    $t("general.BIDLargo")
                                                }}</h1>
                                            </v-row>
                                            <v-row align="center" justify="center" class="mb-3">
                                                <p class="text-center"> {{ $t("loginAdmin.instrucciones") }} </p>
                                            </v-row>

                                            <v-row align="center" justify="start" class="ma-2">
                                                <v-col cols="12" md="12" sm="12">
                                                    <v-text-field v-model="email" :label="$t('labels.email')" dense
                                                        :hint="$t('hints.email')" prepend-icon="mdi-email"
                                                        :rules="emailRules" required></v-text-field>
                                                </v-col>
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

                                            <v-row align="center" justify="center">
                                                <v-btn text color="primary" @click="recoverPassword()">
                                                    {{ $t("loginAdmin.recuperarContrasenia") }}
                                                </v-btn>
                                            </v-row>

                                            <v-row align="center" justify="center">
                                                <v-btn rounded color="primary" @click="next()" class="ma-6">
                                                    {{ $t("loginAdmin.iniciarSesion") }}
                                                </v-btn>
                                            </v-row>
                                        </v-container>
                                    </v-form>
                                </v-col>
                                <v-divider vertical></v-divider>

                                <v-col cols="12" md="4" sm="4" class="">
                                    <v-container class="fill-height">
                                        <v-row align="center" justify="center">
                                            <v-img v-if="$i18n.locale == 'es'" class="shrink mr-2" contain
                                                src="../../assets/images/bid_logo_es.png" transition="scale-transition"
                                                height="200" />
                                            <v-img v-if="$i18n.locale == 'en'" class="shrink mr-2" contain
                                                src="../../assets/images/bid_logo_en.png" transition="scale-transition"
                                                height="200" />
                                        </v-row>
                                    </v-container>
                                </v-col>
                            </v-row>
                        </v-window-item>
                    </v-window>
                </v-card>
            </v-col>
        </v-row>
        <RecoverPasswordDialogVue />
    </v-container>
</template>

<script>
import Axios from "axios";
import Enviroment from '../../scripts/Enviroment.js'
import { mapFields } from "vuex-map-fields";
import RecoverPasswordDialogVue from "../../components/admin/RecoverPasswordDialog.vue";
import generalFunctions from '../../assets/scripts/generalFunctions.js'

export default {
    computed: {
        ...mapFields([
            "typeMessageBar",
            "showMessageBar",
            "messageBar",
            "loader",
            "adminData",
            "recoverPasswordAdminDialog"]),
    },
    components: {
        RecoverPasswordDialogVue
    },
    data() {
        return {
            show1: false,
            email: "",
            password: "",
            minRules: [
                (v) => !!v || this.$i18n.t("rulesInput.campoRequerido"), //
                (v) => v.length >= 8 || this.$i18n.t("rulesInput.minContrasenia"), //
            ],
            emailRules: [
                (v) => !!v || this.$i18n.t("rulesInput.campoRequerido"), //
                (v) =>
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                        v
                    ) || this.$i18n.t("rulesInput.campoRequerido"),
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
                this.login()
            } else {
                this.newMessage("error", this.$i18n.t("rulesInput.messageCamposObligatorios"));
            }
        },
        recoverPassword() {
            this.recoverPasswordAdminDialog = true
        },
        login() {
            this.loader = true
            let body = {
                email: this.email,
                password: this.password
            }
            let api = Axios.post(Enviroment.url + '/admin/login', body)
                .then(response => {
                    this.loader = false
                    this.adminData = response.data
                    generalFunctions.saveSession(this.adminData)
                    this.$router.push({ name: "HomeAdmin" });
                    this.newMessage("success", this.$i18n.t("general.bienvenido"));
                }).catch(error => {
                    this.loader = false
                    this.newMessage("error", "Error: " + error.response.data[0]);
                    console.error(error)
                })
        }
    },
    mounted() {
        this.loader = true
        if (generalFunctions.isLogged()) {
            this.loader = false
            this.$router.push({ name: "HomeAdmin" })
            this.newMessage("success", this.$i18n.t("general.bienvenido"));
        } else {
            this.loader = false
        }
    },
    created() {
    this.loader = true
    if (generalFunctions.isLogged()) {
      this.adminData = generalFunctions.getSession()
    }
    this.loader = false
  }
}
</script>

<style>

</style>