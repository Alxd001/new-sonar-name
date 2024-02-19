<template>
    <v-container fluid>
        <!-- Periodo -->
        <v-select v-model="frecuenciaSelected" :items="datosPeriodo" :label="$t('labels.periodo')" outlined></v-select>
    </v-container>
</template>

<script>
import Axios from 'axios'
import { mapFields } from 'vuex-map-fields';
import Enviroment from '../../scripts/Enviroment';

export default {
    computed: {
        ...mapFields([
            "loader",
            "typeMessageBar",
            "showMessageBar",
            "messageBar",
            "frecuenciaSelected",
        ]),
    },
    data() {
        return {
            datosPeriodo: new Array(),
        }
    },
    methods: {
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
        getConsulta() {
            this.loader = true
            let bodyVisualize = null
            let headerFrecuencia = this.$i18n.locale == 'es' ? 'frecuencia' : 'frequency'
            bodyVisualize = {
                useDistinct: true,
                usePagination: false,
                useDates: false,
                startDate: '',
                endDate: '',
                pageOffset: 0,
                filters: [
                    {
                        header: headerFrecuencia,
                        conditions: []
                    }
                ]
            }
            let api = Axios.post(Enviroment.url + '/datasets/visualize', bodyVisualize)
                .then(response => {
                    let data = response.data.data.rows
                    data.forEach(element => {
                        if(this.$i18n.locale == 'es') {
                            this.datosPeriodo.push(element.frecuencia)
                        } else if(this.$i18n.locale == 'en') {
                            this.datosPeriodo.push(element.frequency)
                        }
                    });
                    this.frecuenciaSelected = this.datosPeriodo[0]
                    this.loader = false
                }).catch(error => {
                    console.error(error)
                    this.loader = false
                })
        },
    },
    beforeMount() {
        this.getConsulta()
    }

}
</script>

<style scoped>
.centered-input>>>input {
    text-align: center
}
</style>