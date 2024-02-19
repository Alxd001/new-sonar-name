<template>
    <v-dialog v-model="confirmDialog" width="80%" max-width="600" transition="dialog-bottom-transition" persistent>
        <v-card>
            <v-card-title class="text-h5 primary">
                <v-col cols="10" class="d-flex align-center justify-start">
                    <!-- Reemplazar -->
                    <span v-if="typeConfirm === 'reemplazar'" class="font-weight-black white--text">
                        <v-icon color="white" large>mdi-table-arrow-up</v-icon>
                        {{ $t("confirmDialog.reemplazarTitle") }}
                    </span>
                    <!-- Agregar -->
                    <span v-if="typeConfirm === 'agregar'" class="font-weight-black white--text">
                        <v-icon color="white" large>mdi-table-plus</v-icon>
                        {{ $t("confirmDialog.agregarTitle") }}
                    </span>
                    <!-- Eliminar Admin -->
                    <span v-if="typeConfirm === 'eliminarAdmin'" class="font-weight-black white--text">
                        <v-icon color="white" large>mdi-account-remove</v-icon>
                        {{ $t("confirmDialog.eliminarTitle") }}
                    </span>
                    <!-- Restore Dataset -->
                    <span v-if="typeConfirm === 'restoreDataset'" class="font-weight-black white--text">
                        <v-icon color="white" large>mdi-autorenew</v-icon>
                        {{ $t("confirmDialog.restoreSubtitle") }}
                    </span>
                </v-col>

                <v-col cols="2" class="d-flex align-center justify-end">
                    <v-btn icon x-large color="white" @click="close()">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-col>
            </v-card-title>
            <!-- Reemplazar -->
            <v-card-text v-if="typeConfirm === 'reemplazar'" class="mt-6">
                <v-row align="center" justify="center" class="mb-2">
                    <span class="font-weight-black headline text-center">
                        {{ $t("confirmDialog.reemplazarText") }}
                    </span>
                    <span class="subtitle-1 text-justify">
                        {{ $t("confirmDialog.reemplazarText2") }}
                    </span>
                </v-row>
                <v-form ref="form">
                    <v-textarea v-model="comentario" outlined name="input-7-4" :label="$t('labels.agregarComentario')"
                        class="ma-1" :rules="requiredRules"></v-textarea>
                </v-form>
            </v-card-text>

            <!-- Agregar -->
            <v-card-text v-if="typeConfirm === 'agregar'" class="mt-6">
                <v-row align="center" justify="center" class="mb-2">
                    <span class="font-weight-black headline text-center">
                        {{ $t("confirmDialog.agregarText") }}
                    </span>
                    <span class="subtitle-1 text-justify">
                        {{ $t("confirmDialog.agregarText2") }}
                    </span>
                </v-row>
                <v-form ref="form">
                    <v-textarea v-model="comentario" outlined name="input-7-4" :label="$t('labels.agregarComentario')"
                        class="ma-1" :rules="requiredRules"></v-textarea>
                </v-form>
            </v-card-text>

            <!-- Eliminar Administrador -->
            <v-card-text v-if="typeConfirm === 'eliminarAdmin'" class="mt-6">
                <v-row v-if="adminDataDelete" align="center" justify="center" class="mb-2">
                    <span class="font-weight-black headline text-center">
                        {{ $t("confirmDialog.eliminarText") }}
                    </span>
                    <v-col cols="12">
                        <v-row align="center" justify="start" class="ma-1">
                            <span class="title font-weight-black">
                                {{ $t("confirmDialog.eliminarId") }}
                                <span class="title font-weight-regular">
                                    {{ adminDataDelete.id }}
                                </span>
                            </span>
                        </v-row>
                        <v-row align="center" justify="start" class="ma-1">
                            <span class="title font-weight-black">
                                {{ $t("confirmDialog.eliminarNombre") }}
                                <span class="title font-weight-regular">
                                    {{ adminDataDelete.fullName }}
                                </span>
                            </span>
                        </v-row>
                        <v-row align="center" justify="start" class="ma-1">
                            <span class="title font-weight-black">
                                {{ $t("confirmDialog.eliminarCorreo") }}
                                <span class="title font-weight-regular">
                                    {{ adminDataDelete.email }}
                                </span>
                            </span>
                        </v-row>
                        <v-row align="center" justify="start" class="ma-1">
                            <span class="title font-weight-black">
                                {{ $t("confirmDialog.eliminarPerfil") }}
                                <span class="title font-weight-regular">
                                    {{ getAdmin(adminDataDelete.profile) }}
                                </span>
                            </span>
                        </v-row>
                        <v-row align="center" justify="start" class="ma-1">
                            <span class="title font-weight-black">
                                {{ $t("confirmDialog.eliminarFecha") }}
                                <span class="title font-weight-regular">
                                    {{ getDate(adminDataDelete.regDate) }}
                                </span>
                            </span>
                        </v-row>
                        <v-row align="center" justify="start" class="ma-1">
                            <span class="title font-weight-black">
                                {{ $t("confirmDialog.eliminarPermisos") }}
                                <v-checkbox v-model="adminDataDelete.auth" :label="$t('labels.lectura')" value="W"
                                    class="ma-2 title font-weight-regular" color="primary" hide-details
                                    readonly></v-checkbox>
                                <v-checkbox v-model="adminDataDelete.auth" :label="$t('labels.escritura')" value="R"
                                    class="ma-2 title font-weight-regular" color="primary" hide-details
                                    readonly></v-checkbox>
                            </span>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>

            <!-- Restore Dataset -->
            <v-card-text v-if="typeConfirm === 'restoreDataset'" class="mt-6">
                <v-row align="center" justify="center" class="mb-2">
                    <span class="font-weight-black headline text-center">
                        {{ $t("confirmDialog.restoreText") }}
                    </span>
                    <span class="subtitle-1 text-justify">
                        {{ $t("confirmDialog.restoreText2") }}
                    </span>
                    <v-col cols="12">
                        <v-row align="center" justify="start" class="ma-1">
                            <span class="title font-weight-black">
                                {{ $t("confirmDialog.restoreFechaPublicacion") }}
                                <span class="title font-weight-regular">
                                    {{ getDate(restoreDatasetData.timeStamp) }}
                                </span>
                            </span>
                        </v-row>
                        <v-row align="center" justify="start" class="ma-1">
                            <span class="title font-weight-black">
                                {{ $t("confirmDialog.restoreIdPublicacion") }}
                                <span class="title font-weight-regular">
                                    {{ restoreDatasetData.id }}
                                </span>
                            </span>
                        </v-row>
                        <v-row align="center" justify="start" class="ma-1">
                            <span class="title font-weight-black">
                                {{ $t("confirmDialog.restorePublicadoPor") }}
                                <span class="title font-weight-regular">
                                    {{ restoreDatasetData.author }}
                                </span>
                            </span>
                        </v-row>
                        <v-row align="center" justify="start" class="ma-1">
                            <span class="title font-weight-black">
                                {{ $t("confirmDialog.restoreTipo") }}
                                <span class="title font-weight-regular">
                                    {{ restoreDatasetData.type }}
                                </span>
                            </span>
                        </v-row>
                        <v-row align="center" justify="start" class="ma-1">
                            <span class="title font-weight-black">
                                {{ $t("confirmDialog.restoreComentario") }}
                                <span class="title font-weight-regular">
                                    {{ restoreDatasetData.comment }}
                                </span>
                            </span>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-divider></v-divider>
            <v-card-actions class="d-flex justify-center">
                <v-col cols="4">
                    <v-btn color="error" block outlined @click="close()">
                        {{ $t("confirmDialog.cancelar") }}
                    </v-btn>
                </v-col>
                <v-col cols="4">
                    <v-btn color="success" block @click="next()">
                        {{ $t("confirmDialog.aceptar") }}
                    </v-btn>
                </v-col>
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
            "confirmDialog",
            "transaccionCompleta"
        ]),
    },
    props: {
        typeConfirm: {
            type: String,
            default: "reemplazar",
        },
        fileNameBackEnd: {
            type: String,
            default: "",
        },
        adminDataDelete: {
            type: Object,
            default: function () {
                return { id: 0, fullName: "", email: "", auth: [], profile: "", regDate: new Date() }
            }
        },
        restoreDatasetData: {
            type: Object,
            default: function () {
                return {
                    author: "",
                    comment: "",
                    fileName: "",
                    id: 0,
                    timeStamp: new Date(),
                    type: ""
                }
            }
        }
    },
    data() {
        return {
            comentario: '',
            requiredRules: [
                (v) => !!v || this.$i18n.t("rulesInput.campoRequerido"), //
                (v) => v.length < 250 || this.$i18n.t("rulesInput.messageNoExcederCaracteres"),
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
            if (this.typeConfirm == 'reemplazar') {
                if (this.$refs.form.validate()) {
                    this.reemplazarDatos()
                } else {
                    this.newMessage("error", this.$i18n.t("rulesInput.messageCamposObligatorios"));
                }
            } else if (this.typeConfirm == 'agregar') {
                if (this.$refs.form.validate()) {
                    this.agregarDatos()
                } else {
                    this.newMessage("error", this.$i18n.t("rulesInput.messageCamposObligatorios"));
                }
            } else if (this.typeConfirm == 'eliminarAdmin') {
                this.deleteAdmin()
            } else if (this.typeConfirm == 'restoreDataset') {
                this.restoreDataset()
            }
        },
        close() {
            this.confirmDialog = false
        },
        reemplazarDatos() {
            this.loader = true
            let body = {
                fileName: this.fileNameBackEnd,
                comment: this.comentario
            }
            let api = Axios.post(Enviroment.url + '/datasets/replace', body,
                {
                    headers: {
                        Authorization: "Bearer" + " " + this.adminData.token,
                    }
                })
                .then(response => {
                    this.loader = false
                    if (response.data.code == 100) {
                        this.newMessage("success", this.$i18n.t("confirmDialog.reemplazarMessageSuccess"));
                        this.close()
                        this.transaccionCompleta = true
                    } else {
                        this.newMessage("error", this.$i18n.t("confirmDialog.reemplazarMessageError"));
                    }
                })
                .catch(error => {
                    this.loader = false
                    console.error(error)
                    this.newMessage("error", "Error: " + error.response.data[0]);
                })
        },
        agregarDatos() {
            this.loader = true
            let body = {
                fileName: this.fileNameBackEnd,
                comment: this.comentario
            }
            let api = Axios.post(Enviroment.url + '/datasets/update', body,
                {
                    headers: {
                        Authorization: "Bearer" + " " + this.adminData.token,
                    }
                })
                .then(response => {
                    this.loader = false
                    if (response.data.code == 100) {
                        this.newMessage("success", this.$i18n.t("confirmDialog.agregarMessageSuccess"));
                        this.close()
                        this.transaccionCompleta = true
                    } else {
                        this.newMessage("error", this.$i18n.t("confirmDialog.agregarMessageError"));
                    }
                })
                .catch(error => {
                    this.loader = false
                    console.error(error)
                    this.newMessage("error", "Error: " + error.response.data[0]);
                })
        },
        getAdmin(profile) {
            if (profile == 'admin') {
                return 'Administrador'
            }
        },
        getDate(fecha) {
            const options = {
                year: "numeric",
                month: "numeric",
                day: "numeric",
            }
            options.timeZoneName = "short";
            let fechaReturn = new Date(fecha)
            return fechaReturn.toLocaleString("en-US", options)
            // return fechaReturn.toISOString().substr(0, 10)
        },
        deleteAdmin() {
            this.loader = true
            let api = Axios.delete(Enviroment.url + '/admin/delete/' + this.adminDataDelete.id,
                {
                    headers: {
                        Authorization: "Bearer" + " " + this.adminData.token,
                    }
                }).then(response => {
                    this.loader = false
                    this.newMessage("success", this.$i18n.t("confirmDialog.eliminarMessageSuccess"));
                    this.close()
                }).catch(error => {
                    this.loader = false
                    this.newMessage("error", "Error: " + error.response.data[0]);
                    console.error(error);
                })
        },
        restoreDataset() {
            this.loader = true
            let api = Axios.post(Enviroment.url + '/datasets/backups/restore?id=' + this.restoreDatasetData.id, undefined,
                {
                    headers: {
                        Authorization: "Bearer" + " " + this.adminData.token,
                    }
                })
                .then(response => {
                    this.newMessage("success", this.$i18n.t("confirmDialog.restoreMessageSuccess"));
                    this.close()
                    this.loader = false
                })
                .catch(error => {
                    this.newMessage("error", "Error: " + error.response.data[0]);
                    console.error(error);
                    this.loader = false
                })
        }
    }
}
</script>

<style>

</style>