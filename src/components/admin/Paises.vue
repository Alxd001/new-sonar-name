<template>
    <v-container fluid>
        <v-card elevation="0">
            <v-card-title>
                <v-row align="center" justify="end">
                    <v-col cols="6">
                        <v-row align="center" justify="start">
                            <span class="font-weight-light font-italic">
                                {{ $t("general.ultimaPublicacion") + lastPublish }}
                            </span>
                        </v-row>
                    </v-col>
                    <v-col cols="6">
                        <v-row align="center" justify="end">
                            <v-text-field v-model="search" append-icon="mdi-magnify" :label="$t('labels.buscar')"
                                single-line hide-details></v-text-field>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-title>
            <!-- {{ datosTabla }} -->
            <div>
                <v-data-table v-if="datosTabla" :headers="headers" :items="datosTabla" :search="search"
                    :page.sync="page" hide-default-footer @page-count="pageCount = $event" :sort-by="['name']"
                    :items-per-page="itemsPerPage">
                    <template v-slot:item.flag="{ item }">
                        <img :src="item.flag" width="50">
                        <!-- <div v-html="item.flag" max-width="50"></div> -->

                    </template>
                    <template v-slot:item.color="{ item }">
                        <v-sheet width="50%" height="50%" :color="item.color"></v-sheet>
                    </template>

                    <template v-slot:item.actions="{ item }">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn icon color="primary" v-bind="attrs" v-on="on" @click="updatePais(item)">
                                    <v-icon class="mr-2">
                                        mdi-pencil
                                    </v-icon>
                                </v-btn>
                            </template>
                            <span>Editar</span>
                        </v-tooltip>
                    </template>
                </v-data-table>
                <div class="text-center pt-2">
                    <v-pagination v-model="page" :length="pageCount"></v-pagination>
                </div>
            </div>
        </v-card>
        <EditPaisVue :paisData="dataPais" />
    </v-container>
</template>

<script>
import Axios from 'axios';
import { mapFields } from "vuex-map-fields";
import Enviroment from '../../scripts/Enviroment';
import EditPaisVue from './EditPais.vue';

export default {
    computed: {
        ...mapFields([
            "loader",
            "adminData",
            "lastPublish",
            "editPaisDialog"
        ]),
    },
    components: {
        EditPaisVue
    },
    data() {
        return {
            search: '',
            headers: null,
            datosTabla: null,
            page: 1,
            pageCount: 0,
            itemsPerPage: 26,
            dataPais: {},
            headers: [
                { text: this.$i18n.t("paises.pais"), value: 'name' },
                { text: this.$i18n.t("paises.bandera"), value: 'flag' },
                { text: this.$i18n.t("paises.color"), value: 'color' },
                { text: this.$i18n.t("paises.acciones"), value: 'actions' },
            ],
        }
    },
    methods: {
        getDatos() {
            this.loader = true
            let body = {
                useDistinct: false,
                filters: []
            }
            let api = Axios.get(Enviroment.url + '/catalog/view/all/countries/' + this.$i18n.locale.toUpperCase())
                .then(response => {
                    this.datosTabla = response.data
                    this.loader = false
                }).catch(error => {
                    console.error(error)
                    this.loader = false
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
        updatePais(item) {
            this.dataPais = item
            this.editPaisDialog = true
        }
    },
    watch: {
        editPaisDialog() {
            if(!this.editPaisDialog) {
                this.getDatos()
            }
        }
    },
    beforeMount() {
        this.getDatos()
    }
}
</script>

<style>

</style>