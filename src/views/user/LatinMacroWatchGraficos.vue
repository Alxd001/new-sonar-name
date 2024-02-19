<template>
    <v-container fluid>
        <v-row class="ma-2 mb-6">
            <p class="text-justify">
                {{ $t("latinMacroWatchGraficos.text") }}
            </p>
        </v-row>
        <v-row class="ma-2 mb-6">
            <span class="font-weight-light font-italic">
                {{ $t("general.ultimaPublicacion") + lastPublish }}
            </span>
        </v-row>
        <v-row align="center" justify="start">
            <v-col>
                <v-row align="center" justify="start" class="ma-3">
                    <v-btn color="primary" class="ma-1" dark @click="downloadAllCSV()">
                        <v-icon>mdi-download</v-icon> {{ $t("latinMacroWatchDatos.descargarDataset") }}
                    </v-btn>
                </v-row>
            </v-col>
            <v-col>
                <v-row align="center" justify="start">
                    <CopyReferenciaVue />
                </v-row>
            </v-col>
        </v-row>
        <v-row class="ma-1">
            <v-col cols="12" sm="3" class="">
                <SelectorIndicadorLMWDGraficos />
            </v-col>
            <v-divider vertical class=""></v-divider>
            <v-col cols="12" sm="9">
                <v-row align="center" justify="start" class="ml-1 mb-1">
                    <v-row align="center" justify="center">
                        <v-col cols="12" sm="10">
                            <PaisSelectorVue />
                        </v-col>
                        <v-col cols="12" sm="2">
                            <PeriodoSelectorVue />
                        </v-col>
                    </v-row>
                </v-row>
                <v-row align="center" justify="center" class="ma-1">
                    <v-btn color="primary" dark @click="next()" class="ma-1">
                        <v-icon>mdi-autorenew</v-icon> {{ $t("latinMacroWatchGraficos.generarGrafica") }}
                    </v-btn>
                    <div>
                        <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="primary" outlined dark v-bind="attrs" v-on="on">
                                    <v-icon>mdi-download</v-icon> {{ $t("latinMacroWatchGraficos.descarga") }}
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item v-for="(item, index) in itemsDescarga" :key="index">
                                    <v-btn text block :color="item.color" @click="download(item.download)">
                                        <v-icon>{{ item.icon }}</v-icon> {{ item.title }}
                                    </v-btn>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>
                </v-row>
                <!-- Periodo -->
                <FechaSelectorVue />
                <v-tabs v-model="tab" color="primary">
                    <v-tab>{{ $t("latinMacroWatchGraficos.grafico") }}</v-tab>
                    <v-tab>{{ $t("latinMacroWatchGraficos.datos") }}</v-tab>
                </v-tabs>
                <div id="reportPage">
                    <canvas v-show="tab == 0" id="myChart"></canvas>
                </div>
                <LMWGTableVue v-if="tab == 1" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Axios from 'axios';
import { mapFields } from 'vuex-map-fields';
import Enviroment from '../../scripts/Enviroment';
import PaisSelectorVue from '../../components/lmw/PaisSelector.vue';
import FechaSelectorVue from '../../components/lmw/FechaSelector.vue';
import SelectorIndicadorLMWDGraficos from '../../components/lmw/SelectorIndicadorLMWDGraficos.vue';
import LMWGTableVue from '../../components/lmw/LMWGTable.vue';
import CopyReferenciaVue from '../../components/lmw/CopyReferencia.vue';
import PeriodoSelectorVue from '../../components/lmw/PeriodoSelector.vue';

export default {
    computed: {
        ...mapFields([
            "loader",
            "typeMessageBar",
            "showMessageBar",
            "messageBar",
            "lastPublish",
            "indicadoresSeleccionados",
            "paisSelectedDatos",
            "rangoFechaDatos",
            "citaLMW",
            "allHeadersFilter",
            "lmwgTableData",
            "indicadoresGraficos",
            "indicadoresGraficos2",
            "graficoSeleccionado",
            "graficoSeleccionado2",
            "allPaisesData",
            "totalIndicadoresGraficos",
            "validarCamposIndicadores",
            "mapGraficoFlag",
            "fechaMapDato",
            "frecuenciaSelected"
        ]),
    },
    components: {
        PaisSelectorVue,
        FechaSelectorVue,
        SelectorIndicadorLMWDGraficos,
        LMWGTableVue,
        CopyReferenciaVue,
        PeriodoSelectorVue
    },
    data() {
        return {
            tab: 0,
            myChart: new Chart(),
            itemsDescarga: [
                { title: this.$i18n.t("latinMacroWatchGraficos.graficoPNG"), color: 'warning', icon: 'mdi-file-png-box', download: 'png' },
                { title: this.$i18n.t("latinMacroWatchGraficos.graficoJPG"), color: 'warning', icon: 'mdi-file-jpg-box', download: 'jpg' },
                { title: this.$i18n.t("latinMacroWatchGraficos.seleccionCSV"), color: 'success', icon: 'mdi-file-document-outline', download: 'csv' },
            ],
        }
    },
    methods: {
        newMessage(type, message) {
            this.typeMessageBar = type;
            this.showMessageBar = true;
            this.messageBar = message;
        },
        getLastPublish() {
            this.loader = true
            let api = Axios.get(Enviroment.url + '/datasets/backups/last')
                .then(response => {
                    this.loader = false
                    this.lastPublish = new Date(response.data.data).toLocaleString("en-US", this.optionsDate)
                    let options = { month: "long" };
                    let mes = new Intl.DateTimeFormat("en-US", options).format(new Date(response.data.data))
                    let anio = new Date(response.data.data).getFullYear()
                    let cita = 'Inter-American Development Bank, LatinMacroWatch Database, ' + mes + '-' + anio
                    this.citaLMW = cita
                }).catch(error => {
                    this.loader = false
                    console.error(error)
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
                    this.loader = false
                    this.allHeadersFilter = response.data.data.headers
                }).catch(error => {
                    console.error(error)
                    this.loader = false
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
                let mes = new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date())
                let anio = new Date().getFullYear()
                link.href = window.URL.createObjectURL(blob)
                link.download = 'LatinMacroWatch_' + mes + '_' + anio + '.csv'
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
                let mes = new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date())
                let anio = new Date().getFullYear()
                let link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = 'LatinMacroWatch_custom_' + mes + '_' + anio + '.csv'
                link.click()
            }).catch(error => {
                this.loader = false
                this.newMessage("error", "Error: " + error.response.data[0]);
                console.error(error);
            })
        },
        download(downloadType) {
            if (downloadType == 'png' || downloadType == 'jpg') {
                this.downloadImage(downloadType)
            } else if (downloadType == 'csv') {
                this.downloadSelectionCSV()
            }
        },
        downloadImage(downloadType) {
            var image = downloadType == 'png' ? this.myChart.toBase64Image() : this.myChart.toBase64Image('image/jpeg', 1);
            let mes = new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date())
            let anio = new Date().getFullYear()
            var download = document.createElement('a');
            download.href = image;
            download.download = 'LatinMacroWatch_custom_' + mes + '_' + anio;
            download.click();
        },
        next() {
            if (this.paisSelectedDatos.length) {
                this.validarCamposIndicadores = true
                if (this.indicadoresGraficos.indicadores[0].unidad) {
                    if (this.totalIndicadoresGraficos == 1) {
                        if (this.indicadoresGraficos.indicadores[1].unidad) {
                            this.getConsulta()
                        }
                    } else {
                        this.getConsulta()
                    }
                }
            } else {
                this.newMessage("error", this.$i18n.t("rulesInput.messageSeleccionaPais"));
            }
        },
        getConsulta() {
            this.loader = true
            this.tab = 0
            let bodyVisualize = null
            bodyVisualize = {
                useDistinct: false,
                usePagination: false,
                useDates: true,
                startDate: this.mapGraficoFlag ? this.getDateStartMapFilter() : this.getDatesSrartFilter(),
                endDate: this.mapGraficoFlag ? this.getDateEndMapFilter() : this.getDatesEndFilter(),
                pageOffset: 0,
                filters: this.getHeadersFilter(this.allHeadersFilter)
            }
            let api = Axios.post(Enviroment.url + '/datasets/visualize', bodyVisualize)
                .then(response => {
                    this.datosTabla = response.data.data.rows
                    this.totalDatos = response.data.data.queryRowsCount
                    this.pageCount = parseInt(((parseInt(this.totalDatos) / 100) + 1))
                    this.page = 1
                    this.lmwgTableData = response.data.data.rows
                    this.mapGraficoFlag ? this.getMapGrafica(response.data.data.rows) : this.getGrafica(response.data.data.rows)
                    this.loader = false
                }).catch(error => {
                    console.error(error)
                    this.loader = false
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
                } else if (element.value == 'unidad' || element.value == 'unit') {
                    filtro.conditions = this.getUnidadesFilter()
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
        getDateStartMapFilter() {
            let mapStartDate = this.fechaMapDato + '-01-01 0:00:00'
            return mapStartDate.toString()
        },
        getDateEndMapFilter() {
            let mapEndDate = this.fechaMapDato + '-12-31 0:00:00'
            return mapEndDate.toString()
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
            conditions.push(this.indicadoresGraficos.area)
            return conditions
        },
        getTemaFilter() {
            let conditions = []
            conditions.push(this.indicadoresGraficos.tema)
            return conditions
        },
        getIndicadoresFilter() {
            let conditions = []
            this.indicadoresGraficos.indicadores.forEach(element => {
                conditions.push(element.indicador)
            });
            return conditions
        },
        getUnidadesFilter() {
            let conditions = []
            this.indicadoresGraficos.indicadores.forEach(element => {
                conditions.push(element.unidad)
            });
            return conditions
        },
        getGrafica(dataGrafica) {
            let paises = this.getCountriesFilter()
            let labelsGrafica = []
            let datasetsGrafica = []
            let escalasGrafica = {}
            let startDate = parseInt(new Date(this.getDatesSrartFilter()).getFullYear())
            let endDate = parseInt(new Date(this.getDatesEndFilter()).getFullYear())
            let titleGrafica = ''
            // Labels
            for (let i = 0; i <= (endDate - startDate); i++) {
                labelsGrafica.push((startDate + i).toString())
            }
            // Titulo
            if (this.totalIndicadoresGraficos == 0) {
                titleGrafica = (this.indicadoresGraficos.indicadores[0].indicador + '(' + this.indicadoresGraficos.indicadores[0].unidad + ')' + ' - ' + startDate + ' - ' + endDate).toString()
            } else if (this.totalIndicadoresGraficos == 1) {
                titleGrafica = (this.indicadoresGraficos.indicadores[0].indicador + '(' + this.indicadoresGraficos.indicadores[0].unidad + ')' + ' - ' + this.indicadoresGraficos.indicadores[1].indicador + '(' + this.indicadoresGraficos.indicadores[1].unidad + ')' + ' - (' + startDate + '-' + endDate + ')').toString()
            }
            // Escala
            let escala = {
                y0: {
                    title: {
                        display: true,
                        position: 'left',
                        text: this.indicadoresGraficos.indicadores[0].indicador + ' - (' + this.indicadoresGraficos.indicadores[0].unidad + ')'
                    }
                },
                y1: {
                    display: this.totalIndicadoresGraficos == 1 ? true : false,
                    position: 'right',
                    title: {
                        display: true,
                        text: this.totalIndicadoresGraficos == 1 ? this.indicadoresGraficos.indicadores[1].indicador + ' - (' + this.indicadoresGraficos.indicadores[1].unidad + ')' : '',
                    }
                }
            }
            escalasGrafica = escala
            // Dataset
            for (let i = 0; i <= this.totalIndicadoresGraficos; i++) {
                for (let j = 0; j < paises.length; j++) {
                    let dataset = {
                        type: this.indicadoresGraficos.indicadores[i].grafico,
                        label: this.indicadoresGraficos.indicadores[i].indicador + ' - ' + paises[j] + ' - (' + this.indicadoresGraficos.indicadores[i].unidad + ')',
                        data: this.getDataGrafica(dataGrafica, paises[j], this.indicadoresGraficos.indicadores[i].indicador),
                        borderColor: this.getColorPais(paises[j]),
                        backgroundColor: this.getColorPais(paises[j]),
                        yAxisID: 'y' + i,
                    }
                    datasetsGrafica.push(dataset)
                }
            }
            this.plotGrafica(labelsGrafica, datasetsGrafica, escalasGrafica, titleGrafica)
        },
        getMapGrafica(dataGrafica) {
            const url = 'https://code.highcharts.com/mapdata/custom/north-america-no-central.topo.json';
            const url2 = 'https://code.highcharts.com/mapdata/custom/central-america.topo.json'
            const url3 = 'https://code.highcharts.com/mapdata/custom/south-america.topo.json';
            var countriesLabels = [];
            let titleGrafica = this.indicadoresGraficos.indicadores[0].indicador + ' - (' + this.indicadoresGraficos.indicadores[0].unidad + ')'
            let codigosPaises = this.getCodePais(dataGrafica)
            let api = Axios.get().then().catch()
            fetch(url)
                .then((r) => r.json())
                .then((data) => {
                    fetch(url2)
                        .then((r2) => r2.json())
                        .then((data2) => {
                            fetch(url3)
                                .then((r3) => r3.json())
                                .then((data3) => {
                                    let countriesNorth = ChartGeo.topojson.feature(data, data.objects.default).features;
                                    let countriesSouth = ChartGeo.topojson.feature(data2, data2.objects.default).features;
                                    let countriesCentral = ChartGeo.topojson.feature(data3, data3.objects.default).features;

                                    countriesLabels = countriesNorth.map((d) => d.properties.name);
                                    countriesLabels = countriesLabels.concat(countriesSouth.map((c) => c.properties.name)).concat(countriesCentral.map((c) => c.properties.name));

                                    let countriesData = []
                                    countriesData = countriesNorth.map((d) => ({
                                        feature: d,
                                        value: this.getDataGraficaMap(codigosPaises, d.id),
                                    }));
                                    countriesData = countriesData.concat(
                                        countriesSouth.map((d) => ({
                                            feature: d,
                                            value: this.getDataGraficaMap(codigosPaises, d.id),
                                        })));
                                    countriesData = countriesData.concat(
                                        countriesCentral.map((d) => ({
                                            feature: d,
                                            value: this.getDataGraficaMap(codigosPaises, d.id),
                                        })));
                                    this.plotMap(countriesLabels, countriesData, titleGrafica)
                                });
                        });
                });
        },
        getDataGrafica(datosValue, pais, indicador) {
            let data = []
            if(this.$i18n.locale == 'es') {
                datosValue.forEach(element => {
                if (element.país == pais && element.indicador == indicador) {
                    data.push(element.valor)
                }
            });
            } else if(this.$i18n.locale == 'en') {
                datosValue.forEach(element => {
                if (element.country == pais && element.indicator == indicador) {
                    data.push(element.value)
                }
            });
            }
            
            return data
        },
        getDataGraficaMap(codigosPaises, codePais) {
            let valor = ''
            codigosPaises.forEach(element => {
                if (element.code == codePais) {
                    valor = element.value
                }
            });
            return parseFloat(valor)
        },
        getCodePais(dataGrafica) {
            let data = new Array()
            this.allPaisesData.forEach(element => {
                dataGrafica.forEach(element1 => {
                    if (element.name == element1.país) {
                        let dataCode = {
                            pais: element.name,
                            code: element.code,
                            value: element1.valor
                        }
                        data.push(dataCode)
                    }
                });
            });
            return data
        },
        getColorPais(pais) {
            let color = undefined
            this.allPaisesData.forEach(element => {
                if (element.name == pais) {
                    color = element.color
                }
            });
            return color
        },
        plotGrafica(labelsGrafica, datasetsGrafica, escalasGrafica, titleGrafica) {
            this.myChart.destroy()
            const ctx = document.getElementById('myChart');
            this.myChart = new Chart(ctx, {
                type: 'scatter',
                data: {
                    labels: labelsGrafica,
                    datasets: datasetsGrafica
                },
                options: {
                    responsive: true,
                    interaction: {
                        mode: 'index',
                        intersect: false,
                    },
                    stacked: false,
                    elements: {
                        point: {
                            pointStyle: 'circle',
                            radius: '5'
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: titleGrafica
                        },
                        legend: {
                            labels: {
                                usePointStyle: true,
                                generateLabels: (chart) => {
                                    let pointStyle = [];
                                    chart.data.datasets.forEach(dataset => {
                                        if (dataset.type === 'line') {
                                            pointStyle.push('circle')
                                        } else {
                                            pointStyle.push('rect')
                                        }
                                    });
                                    return chart.data.datasets.map((dataset, index) => ({
                                        text: dataset.label,
                                        fillStyle: dataset.backgroundColor,
                                        strokeStylr: dataset.borderColor,
                                        pointStyle: pointStyle[index],
                                        hidden: false
                                    }))
                                }
                            }
                        },
                        tooltip: {
                            usePointStyle: true,
                        }
                    },
                    scales: escalasGrafica
                },
            });
        },
        plotMap(countriesLabels, countriesData, titleGrafica) {
            this.myChart.destroy()
            const chart = new Chart(document.getElementById('myChart').getContext('2d'), {
                type: 'choropleth',
                data: {
                    labels: countriesLabels,
                    datasets: [
                        {
                            label: titleGrafica,
                            data: countriesData,
                        },
                    ],
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: titleGrafica
                        },
                        legend: {
                            display: false
                        },
                    },
                    showOutline: true,
                    showGraticule: true,
                    scales: {
                        display: true,
                        xy: {
                            projection: 'equalEarth',
                        },
                    },
                },
            });

        }
    },
    mounted() {
        this.getLastPublish()
        this.getAllDatos()

    },
}

</script>

<style>

</style>