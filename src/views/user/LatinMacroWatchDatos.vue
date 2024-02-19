<template>
    <v-container fluid>
        <v-row class="ma-2 mb-6">
            <p class="text-justify">
                {{ $t("latinMacroWatchDatos.text") }}
            </p>
        </v-row>
        <v-row class="ma-2 mb-6">
            <span class="font-weight-light font-italic">
                {{ $t("general.ultimaPublicacion") + lastPublish }}
            </span>
        </v-row>
        <v-row align="center" justify="start">
            <v-col cols="12" md="6">
                <v-row align="center" justify="start" class="ma-3">
                    <v-btn color="primary" class="ma-1" dark @click="downloadAllCSV()">
                        <v-icon>mdi-download</v-icon> {{ $t("latinMacroWatchDatos.descargarDataset") }}
                    </v-btn>
                </v-row>
            </v-col>
            <v-col cols="12" md="6">
                <v-row align="center" justify="start">
                    <CopyReferenciaVue />
                </v-row>
            </v-col>
        </v-row>
        <!-- Pais -->
        <!-- <PaisSelectorVue /> -->
        <v-row align="center" justify="center">
            <v-col cols="12" lg="10" md="10">
                <PaisSelectorVue />
            </v-col>
            <v-col>
                <PeriodoSelectorVue />
            </v-col>
        </v-row>
        <!-- Perido -->
        <FechaSelectorVue />
        <!-- Árbol -->
        <ArbolLMWDatosVue />


        <v-row align="center" justify="start" class="ma-6">
            <v-btn color="primary" dark class="ma-1" @click="getConsulta()">
                <v-icon>mdi-sync</v-icon> {{ $t("latinMacroWatchDatos.generarConsulta") }}
            </v-btn>
            <v-btn color="primary" outlined dark class="ma-1" @click="downloadSelectionCSV()">
                <v-icon>mdi-download</v-icon> {{ $t("latinMacroWatchDatos.descargarSeleccion") }}
            </v-btn>
        </v-row>
        <div>
            <div class="text-center pt-2">
                <v-pagination v-if="datosTabla" v-model="page" circle :length="pageCount"
                    :total-visible="10"></v-pagination>
            </div>
            <v-data-table v-if="datosTabla" :headers="headers" :items="datosTabla" :page.sync="page" hide-default-footer
                :items-per-page="itemsPerPage"></v-data-table>
            <div class="text-center pt-2">
                <v-pagination v-if="datosTabla" v-model="page" circle :length="pageCount"
                    :total-visible="10"></v-pagination>
            </div>
        </div>
    </v-container>
</template>

<script>
import Axios from 'axios'
import { mapFields } from 'vuex-map-fields'
import Enviroment from '../../scripts/Enviroment'
import ArbolLMWDatosVue from '../../components/lmw/ArbolLMWDatos.vue'
import PaisSelectorVue from '../../components/lmw/PaisSelector.vue'
import FechaSelectorVue from '../../components/lmw/FechaSelector.vue'
import CopyReferenciaVue from '../../components/lmw/CopyReferencia.vue'
import PeriodoSelectorVue from '../../components/lmw/PeriodoSelector.vue'

export default {
    computed: {
        ...mapFields([
            "loader",
            "lastPublish",
            "indicadoresSeleccionados",
            "paisSelectedDatos",
            "rangoFechaDatos",
            "allHeadersFilter",
            "frecuenciaSelected"
        ]),
    },
    components: {
        ArbolLMWDatosVue,
        PaisSelectorVue,
        FechaSelectorVue,
        CopyReferenciaVue,
        PeriodoSelectorVue
    },
    data() {
        return {
            headers: null,
            datosTabla: null,
            totalDatos: 0,
            page: 0,
            pageCount: 1,
            itemsPerPage: 100,

        }
    },
    methods: {
        getLastPublish() {
            this.loader = true
            let api = Axios.get(Enviroment.url + '/datasets/backups/last')
                .then(response => {
                    this.loader = false
                    this.lastPublish = new Date(response.data.data).toLocaleString("en-US", this.optionsDate)
                }).catch(error => {
                    this.loader = false
                    console.error(error)
                })
        },
        downloadAllCSV() {
            this.loader = true
            let body = {
                useDistinct: false,
                usePagination: false,
                useDates: false,
                startDate: "",
                endDate: "",
                pageOffset: 0,
                filters: []
            }
            let api = Axios.post(Enviroment.url + '/datasets/download', body).then(response => {
                this.loader = false
                let blob = new Blob([response.data], { type: "text/csv" })
                let link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = 'dataset' + '.csv'
                link.click()
            }).catch(error => {
                this.loader = false
                this.newMessage("error", "Error: " + error.response.data[0]);
                console.error(error);
            })
        },
        downloadSelectionCSV() {
            this.loader = true
            let body = {
                useDistinct: false,
                usePagination: true,
                useDates: true,
                startDate: this.getDatesSrartFilter(),
                endDate: this.getDatesEndFilter(),
                pageOffset: 0,
                filters: this.getHeadersFilter(this.allHeadersFilter)
            }
            let api = Axios.post(Enviroment.url + '/datasets/download', body).then(response => {
                this.loader = false
                let blob = new Blob([response.data], { type: "text/csv" })
                let fecha = new Date()
                let link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = 'dataset-custom-' + fecha + '.csv'
                link.click()
            }).catch(error => {
                this.loader = false
                this.newMessage("error", "Error: " + error.response.data[0]);
                console.error(error);
            })
        },
        getConsulta() {
            this.loader = true
            let bodyVisualize = {
                useDistinct: false,
                usePagination: true,
                useDates: true,
                startDate: this.getDatesSrartFilter(),
                endDate: this.getDatesEndFilter(),
                pageOffset: 0,
                filters: this.getHeadersFilter(this.allHeadersFilter)
            }
            let api = Axios.post(Enviroment.url + '/datasets/visualize', bodyVisualize)
                .then(response => {
                    this.datosTabla = response.data.data.rows
                    this.totalDatos = response.data.data.queryRowsCount
                    this.pageCount = parseInt(((parseInt(this.totalDatos) / 100) + 1))
                    this.page = 1
                    this.loader = false
                }).catch(error => {
                    console.error(error)
                    this.loader = false
                })
        },
        getAllDatos() {
            this.loader = true
            let bodyHeaders = {
                useLang: true,
                lang: this.$i18n.locale
            }
            let api = Axios.post(Enviroment.url + '/datasets/headers', bodyHeaders)
                .then(response => {
                    this.headers = response.data.data.headers
                    this.allHeadersFilter = response.data.data.headers
                    let bodyVisualize = {
                        useDistinct: false,
                        usePagination: true,
                        useDates: false,
                        startDate: "",
                        endDate: "",
                        pageOffset: 0,
                        filters: this.getHeadersFilter(response.data.data.headers)
                    }
                    return Axios.post(Enviroment.url + '/datasets/visualize', bodyVisualize)
                })
                .then(response => {
                    this.datosTabla = response.data.data.rows
                    this.totalDatos = response.data.data.queryRowsCount
                    this.page = 1
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
                filters: this.getHeadersFilter(this.allHeadersFilter)
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
        },
        getHeadersFilter(data) {
            let allHeaders = new Array
            data.forEach(element => {
                let filtro = {
                    header: element.value,
                    conditions: []
                }
                if (element.value == 'país' || element.value == 'country') {
                    filtro.conditions = this.getCountriesFilter()
                } else if (element.value == 'área' || element.value == 'area') {
                    filtro.conditions = this.getAreaFilter()
                } else if (element.value == 'tema' || element.value == 'topic') {
                    filtro.conditions = this.getTemaFilter()
                } else if (element.value == 'indicador' || element.value == 'indicator') {
                    filtro.conditions = this.getIndicadoresFilter()
                } else if (element.value == 'frecuencia' || element.value == 'frequency') {
                    filtro.conditions = new Array(this.frecuenciaSelected)
                } else {
                    filtro.conditions = []
                }
                allHeaders.push(filtro)
            });
            return allHeaders
        },
        getCountriesFilter() {
            let conditions = []
            this.paisSelectedDatos.forEach(element => {
                conditions.push(element)
            });
            return conditions
        },
        getDatesSrartFilter() {
            let startDate = this.rangoFechaDatos[0] + '-01-01 0:00:00'
            return startDate.toString()
        },
        getDatesEndFilter() {
            let endDate = this.rangoFechaDatos[1] + '-12-31 0:00:00'
            return endDate.toString()
        },
        getAreaFilter() {
            let conditions = []
            this.indicadoresSeleccionados.forEach(element => {
                conditions.push(element.area)
            });
            return conditions
        },
        getTemaFilter() {
            let conditions = []
            this.indicadoresSeleccionados.forEach(element => {
                conditions.push(element.tema)
            });
            return conditions
        },
        getIndicadoresFilter() {
            let conditions = []
            this.indicadoresSeleccionados.forEach(element => {
                conditions.push(element.name)
            });
            return conditions
        }
    },
    mounted() {
        this.getLastPublish()
        this.getAllDatos()
    },
    watch: {
        page() {
            this.nextPage((parseInt(this.page) - 1))
        },
    },
    beforeDestroy() {
        this.indicadoresSeleccionados = []
        this.paisSelectedDatos = []
        this.rangoFechaDatos = []
        this.allHeadersFilter = []
    }
}
</script>

<style>

</style>