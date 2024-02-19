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
            <div>
                <v-data-table v-if="datosTabla" :headers="headers" :items="datosTabla" :search="search"
                    :page.sync="page" hide-default-footer @page-count="pageCount = $event" :sort-desc="['timeStamp']">
                    <template v-slot:item.timeStamp="{ item }">
                        {{ getDate(item.timeStamp) }}
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn icon color="primary" v-bind="attrs" v-on="on" @click="restoreData(item)">
                                    <v-icon class="mr-2">
                                        mdi-autorenew
                                    </v-icon>
                                </v-btn>
                            </template>
                            <span>{{ $t("publicaciones.restaurar") }}</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn icon color="success" v-bind="attrs" v-on="on"
                                    @click="downloadCSV(item.id, item.fileName)">
                                    <v-icon class="mr-2">
                                        mdi-file-document-outline
                                    </v-icon>
                                </v-btn>
                            </template>
                            <span>{{ $t("publicaciones.descargarCSV") }}</span>
                        </v-tooltip>
                    </template>
                </v-data-table>
                <div class="text-center pt-2">
                    <v-pagination v-model="page" circle :length="pageCount"></v-pagination>
                </div>
            </div>
        </v-card>
        <ConfirmDialogVue typeConfirm="restoreDataset" :restoreDatasetData="restoreDatasetData" />
    </v-container>
</template>

<script>
import Axios from 'axios';
import { mapFields } from "vuex-map-fields";
import Enviroment from '../../scripts/Enviroment';
import ConfirmDialogVue from './ConfirmDialog.vue';


export default {
    computed: {
        ...mapFields([
            "loader",
            "adminData",
            "lastPublish",
            "confirmDialog"
        ]),
    },
    data() {
        return {
            search: '',
            datosTabla: null,
            restoreDatasetData: null,
            page: 1,
            pageCount: 0,
            itemsPerPage: 10,

            headers: [
                { text: this.$i18n.t("publicaciones.fechaPublicacion"), value: 'timeStamp', align: 'center' },
                { text: this.$i18n.t("publicaciones.idPublicacion"), value: 'id', align: 'center' },
                { text: this.$i18n.t("publicaciones.publicadoPor"), value: 'author', align: 'center' },
                { text: this.$i18n.t("publicaciones.comentario"), value: 'comment', align: 'center' },
                { text: this.$i18n.t("publicaciones.acciones"), value: 'actions', align: 'center' },
            ],
        }
    },
    components: {
        ConfirmDialogVue
    },
    methods: {
        getDatos() {
            this.loader = true
            let body = {
                useDistinct: false,
                filters: []
            }
            let api = Axios.get(Enviroment.url + '/datasets/backups/list',
                {
                    headers: {
                        Authorization: "Bearer" + " " + this.adminData.token,
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    this.datosTabla = response.data.data
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
            return fechaReturn.toLocaleString("en-US")
            // return fechaReturn.toISOString().substr(0, 10)
        },
        restoreData(item) {
            this.restoreDatasetData = item
            this.confirmDialog = true
        },
        downloadCSV(id, fileName) {
            this.loader = true
            let api = Axios.get(Enviroment.url + '/datasets/backups/download/' + id,
                {
                    headers: {
                        Authorization: "Bearer" + " " + this.adminData.token,
                    }
                }).then(response => {
                    this.loader = false
                    let blob = new Blob([response.data], { type: "text/csv" })
                    let link = document.createElement('a')
                    link.href = window.URL.createObjectURL(blob)
                    link.download = fileName + '.csv'
                    link.click()

                }).catch(error => {
                    this.loader = false
                    this.newMessage("error", "Error: " + error.response.data[0]);
                    console.error(error);
                })
        }
    },
    beforeMount() {
        this.getDatos()
    }
}
</script>

<style>

</style>