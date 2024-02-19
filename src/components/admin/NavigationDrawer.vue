<template>
    <v-navigation-drawer v-model="drawerMenuAdmin" absolute temporary right width="auto" max-width="500">
        <v-container class="ml-3">
            <v-row align="center" justify="center" class="mt-6">
                <v-avatar color="primary" size="120"><span class="white--text text-h2">
                        {{ adminData.fullName.charAt(0) }}
                    </span></v-avatar>
            </v-row>
            <v-row align="center" justify="start" class="text-h6">
                <span>{{ adminData.fullName }}</span>
            </v-row>
            <v-row align="center" justify="start" class="subtitle-2 font-weight-light">
                <span>{{ getAdmin(adminData.profile) }}</span>
            </v-row>
            <v-row align="center" justify="start" class="mb-2">
                <span class="font-weight-light font-italic">
                    {{ $t("general.ultimaPublicacion") + lastPublish }}
                </span>
            </v-row>
            <v-row align="center" justify="start" class="ma-2">
                <v-btn block color="error" @click="cerrarSesion()">
                    {{ $t("homeAdmin.cerrarSesion") }}
                </v-btn>
            </v-row>
        </v-container>

        <v-divider></v-divider>

        <v-list nav>
            <!-- Admin -->
            <v-list-item-group v-if="adminData.profile == 'admin'" v-model="selectedAdminItem" color="primary">
                <v-list-item v-for="item in itemsAdmin" :key="item.title" link :value="item.code"
                    @click="drawerMenuAdmin = false">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
            <!-- Super Admin -->
            <v-list-item-group v-if="adminData.profile == 'super'" v-model="selectedAdminItem" color="primary">
                <v-list-item v-for="item in itemsSuperAdmin" :key="item.title" link :value="item.code"
                    @click="drawerMenuAdmin = false">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>

        <template v-slot:append>
            <div class="pa-2 ma-2 mb-6">

            </div>
        </template>
    </v-navigation-drawer>
</template>

<script>
import Axios from 'axios';
import Enviroment from '../../scripts/Enviroment';
import { mapFields } from "vuex-map-fields";
import generalFunctions from '../../assets/scripts/generalFunctions';

export default {
    computed: {
        ...mapFields([
            "loader",
            "adminData",
            "lastPublish",
            "drawerMenuAdmin",
            "selectedAdminItem"
        ]),
    },
    data() {
        return {
            itemsAdmin: [
                { code: 1, title: this.$i18n.t("homeAdmin.datos"), icon: 'mdi-table' },
                { code: 2, title: this.$i18n.t("homeAdmin.agregarDatos"), icon: 'mdi-table-plus' },
                { code: 3, title: this.$i18n.t("homeAdmin.reemplazarDatos"), icon: 'mdi-table-arrow-up' },
                { code: 4, title: this.$i18n.t("homeAdmin.publicaciones"), icon: 'mdi-table-sync' },
                { code: 5, title: this.$i18n.t("homeAdmin.comentarios"), icon: 'mdi-chat-processing-outline' },
                { code: 6, title: this.$i18n.t("homeAdmin.paises"), icon: 'mdi-earth' },
                { code: 7, title: this.$i18n.t("homeAdmin.metadata"), icon: 'mdi-file-upload-outline' },
            ],
            itemsSuperAdmin: [
                { code: 1, title: this.$i18n.t("homeAdmin.datos"), icon: 'mdi-table' },
                { code: 2, title: this.$i18n.t("homeAdmin.agregarDatos"), icon: 'mdi-table-plus' },
                { code: 3, title: this.$i18n.t("homeAdmin.reemplazarDatos"), icon: 'mdi-table-arrow-up' },
                { code: 4, title: this.$i18n.t("homeAdmin.publicaciones"), icon: 'mdi-table-sync' },
                { code: 5, title: this.$i18n.t("homeAdmin.comentarios"), icon: 'mdi-chat-processing-outline' },
                { code: 6, title: this.$i18n.t("homeAdmin.paises"), icon: 'mdi-earth' },
                { code: 7, title: this.$i18n.t("homeAdmin.metadata"), icon: 'mdi-file-upload-outline' },
                { code: 8, title: this.$i18n.t("homeAdmin.administradores"), icon: 'mdi-account-group' },
            ],
        };
    },
    methods: {
        cerrarSesion() {
            generalFunctions.closeSession()
            this.selectedAdminItem = 0
            this.$router.push({ name: "LoginAdmin" });
        },
        getAdmin(profile) {
            if (profile == 'admin') {
                return this.$i18n.t("homeAdmin.admin")
            } else if (profile == 'super') {
                return this.$i18n.t("homeAdmin.superAdmin")
            }
        },
    },
    mounted() {
        this.loader = true
        if (generalFunctions.isLogged()) {
        }
        this.loader = false
    }
}
</script>

<style>

</style>