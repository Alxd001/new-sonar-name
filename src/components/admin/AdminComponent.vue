<template>
    <v-container fluid>
        <v-card elevation="0">
            <v-card-title>
                <v-row align="center" justify="end">
                    <v-col cols="6">
                        <v-btn color="primary" @click="newAdminDialog = true">
                            Agregar Administrador &nbsp <v-icon>mdi-account-plus</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col cols="6">
                        <v-row align="center" justify="end">
                            <v-text-field v-model="search" append-icon="mdi-magnify" :label="$t('labels.buscar')" single-line
                                hide-details></v-text-field>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-title>
        </v-card>
        <v-data-table :headers="headers" :items="adminDataTable" :search="search" hide-default-footer :sort-by="['id']">
            <template v-slot:item.profile="{ item }">
                {{ getAdmin(item.profile) }}
            </template>
            <template v-slot:item.auth="{ item }">
                <!-- {{ item.auth }} -->
                <v-checkbox v-model="item.auth" :label="$t('labels.lectura')" value="R" class="ma-2" color="primary" hide-details
                    readonly></v-checkbox>
                <v-checkbox v-model="item.auth" :label="$t('labels.escritura')" value="W" class="ma-2" color="primary" hide-details
                    readonly></v-checkbox>
            </template>
            <template v-slot:item.regDate="{ item }">
                {{ getDate(item.regDate) }}
            </template>
            <template v-slot:item.actions="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon color="error" v-bind="attrs" v-on="on" @click="deleteAdmin(item)">
                            <v-icon class="mr-2">
                                mdi-account-remove
                            </v-icon>
                        </v-btn>
                    </template>
                    <span>Eliminar Administrador</span>
                </v-tooltip>
            </template>
        </v-data-table>
        <NewAdminDialogVue />
        <ConfirmDialogVue typeConfirm="eliminarAdmin" :adminDataDelete="adminDataDelete" />
    </v-container>
</template>

<script>
import Axios from 'axios';
import { mapFields } from "vuex-map-fields";
import NewAdminDialogVue from './NewAdminDialog.vue';
import Enviroment from '../../scripts/Enviroment';
import ConfirmDialogVue from './ConfirmDialog.vue';

export default {
    computed: {
        ...mapFields([
            "loader",
            "adminData",
            "newAdminDialog",
            "typeMessageBar",
            "showMessageBar",
            "messageBar",
            "confirmDialog"
        ]),
    },
    data() {
        return {
            search: '',
            adminDataTable: undefined,
            headers: [
                {
                    text: 'Id Administrador',
                    align: 'start',
                    value: 'id',
                },
                { text: 'Nombre Completo', value: 'fullName' },
                { text: 'Correo', value: 'email' },
                { text: 'Perfil', value: 'profile' },
                { text: 'Fecha de Registro', value: 'regDate' },
                { text: 'Permisos', value: 'auth' },
                { text: 'Acciones', value: 'actions' },
            ],
            idAdminDelete: null,
            adminDataDelete: null
        }
    },
    components: {
        NewAdminDialogVue,
        ConfirmDialogVue
    },
    methods: {
        newMessage(type, message) {
            this.typeMessageBar = type;
            this.showMessageBar = true;
            this.messageBar = message;
        },
        getAdmins() {
            this.loader = true
            let api = Axios.get(Enviroment.url + '/admin/view/all', {
                headers: {
                    Authorization: "Bearer" + " " + this.adminData.token,
                }
            }).then(response => {
                this.loader = false
                this.adminDataTable = response.data
                this.adminDataTable.forEach(element => {
                    element.auth = element.auth.split(",")
                });
            }).catch(error => {
                this.loader = false
                console.error(error)
                this.newMessage("error", "Error: " + error.response.data[0]);
            })
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
        getAdmin(profile) {
            if (profile == 'admin') {
                return this.$i18n.t("homeAdmin.admin")
            } else if (profile == 'super') {
                return this.$i18n.t("homeAdmin.superAdmin")
            }
        },
        deleteAdmin(data) {
            this.adminDataDelete = data
            this.confirmDialog = true
        }
    },
    watch: {
        newAdminDialog() {
            if (!this.newAdminDialog) {
                this.getAdmins()
            }
        },
        confirmDialog() {
            if (!this.confirmDialog) {
                this.getAdmins()
            }
        }
    },
    mounted() {
        this.getAdmins()
    }
}
</script>

<style>

</style>