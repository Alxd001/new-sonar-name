<template>
    <v-container fluid>
                <v-container v-if="!selectedAdminItem" class="fill-height">
                    <v-img v-if="$i18n.locale == 'es'" src="../../assets/images/bid_logo_es.png" contain
                        height="100%"></v-img>
                    <v-img v-if="$i18n.locale == 'en'" src="../../assets/images/bid_logo_en.png" contain
                        height="100%"></v-img>
                </v-container>
                <DatosVue v-if="selectedAdminItem === 1" />
                <AgregarDatosVue v-if="selectedAdminItem === 2" />
                <ReemplazarDatosVue v-if="selectedAdminItem === 3" />
                <PublicacionesVue v-if="selectedAdminItem === 4" />
                <ComentariosVue v-if="selectedAdminItem === 5" />
                <PaisesVue v-if="selectedAdminItem === 6" />
                <MetadataComponentVue v-if="selectedAdminItem === 7" />
                <AdminComponentVue v-if="selectedAdminItem === 8" />
    </v-container>
</template>

<script>
import Axios from 'axios';
import Enviroment from '../../scripts/Enviroment';
import { mapFields } from "vuex-map-fields";
import AdminComponentVue from '../../components/admin/AdminComponent.vue';
import MetadataComponentVue from '../../components/admin/MetadataComponent.vue';
import ReemplazarDatosVue from '../../components/admin/ReemplazarDatos.vue';
import AgregarDatosVue from '../../components/admin/AgregarDatos.vue';
import DatosVue from '../../components/admin/Datos.vue';
import PublicacionesVue from '../../components/admin/Publicaciones.vue';
import PaisesVue from '../../components/admin/Paises.vue';
import ComentariosVue from '../../components/admin/Comentarios.vue';
import generalFunctions from '../../assets/scripts/generalFunctions';

export default {
    computed: {
        ...mapFields([
            "loader",
            "adminData",
            "lastPublish",
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
    components: {
        AdminComponentVue,
        MetadataComponentVue,
        ReemplazarDatosVue,
        AgregarDatosVue,
        DatosVue,
        PublicacionesVue,
        PaisesVue,
        ComentariosVue
    },
    mounted() {
        this.loader = true
        if (generalFunctions.isLogged()) {
            this.loader = false
        } else {
            this.loader = false
            this.$router.push({ name: 'LoginAdmin' })
        }
    }
}
</script>

<style>

</style>