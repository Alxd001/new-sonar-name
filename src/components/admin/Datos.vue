<template>
    <v-container fluid>
        <v-card elevation="0">
            <v-card-title>
                <v-row align="center" justify="start">
                    <v-col cols="6">
                        <v-row align="center" justify="start">
                            <span class="font-weight-light font-italic">
                                {{ $t("general.ultimaPublicacion") + lastPublish }}
                            </span>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-title>
            <div>
                <div class="text-center pt-2">
                    <v-pagination v-if="datosTabla" v-model="page" circle :length="pageCount"
                        :total-visible="10"></v-pagination>
                </div>
                <v-data-table v-if="datosTabla" :headers="headers" :items="datosTabla"
                    :page.sync="page" hide-default-footer :items-per-page="itemsPerPage"></v-data-table>
                <div class="text-center pt-2">
                    <v-pagination v-if="datosTabla" v-model="page" circle :length="pageCount"
                        :total-visible="10"></v-pagination>
                </div>
            </div>
        </v-card>
    </v-container>
</template>

<script>
import Axios from 'axios';
import { mapFields } from "vuex-map-fields";
import Enviroment from '../../scripts/Enviroment';

export default {
    computed: {
        ...mapFields([
            "loader",
            "adminData",
            "typeMessageBar",
            "showMessageBar",
            "messageBar",
            "lastPublish"
        ]),
    },
    data() {
        return {
            headers: null,
            datosTabla: null,
            totalDatos: 0,
            page: 1,
            pageCount: 0,
            itemsPerPage: 100,
        }
    },
    methods: {
        newMessage(type, message) {
            this.typeMessageBar = type;
            this.showMessageBar = true;
            this.messageBar = message;
        },
        getDatos() {
            this.loader = true
            let bodyHeaders = {
                useLang: false,
                lang: ""
            }
            let bodyVisualize = {
                useDistinct: true,
                usePagination: true,
                useDates: false,
                startDate: "",
                endDate: "",
                pageOffset: 0,
                filters: []
            }
            let api = Axios.post(Enviroment.url + '/datasets/headers', bodyHeaders)
                .then(response => {
                    this.headers = response.data.data.headers
                    return Axios.post(Enviroment.url + '/datasets/visualize', bodyVisualize)
                })
                .then(response => {
                    this.datosTabla = response.data.data.rows
                    this.totalDatos = response.data.data.totalTableRowsCount
                    this.pageCount = parseInt(((parseInt(this.totalDatos) / 100) + 1))
                    this.loader = false
                }).catch(error => {
                    console.error(error)
                    this.loader = false
                })
        },
        nextPage(newPage) {
            this.loader = true
            let bodyVisualize = {
                useLang: false,
                lang: "",
                useDistinct: true,
                usePagination: true,
                useDates: false,
                startDate: "",
                endDate: "",
                pageOffset: newPage,
                filters: []
            }
            let api = Axios.post(Enviroment.url + '/datasets/visualize', bodyVisualize)
                .then(response => {
                    this.datosTabla = response.data.data.rows
                    this.loader = false
                })
                .catch(error => {
                    console.error(error)
                    this.newMessage("error", "Error: " + error.response.data[0]);
                })
        }
    },
    watch: {
        page() {
            this.nextPage((parseInt(this.page)-1))
        }
    },
    beforeMount() {
        this.getDatos()
    }
}
</script>

<style>

</style>