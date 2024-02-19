<template>
    <v-container fluid>
        <!-- Periodo -->
        <v-range-slider v-if="rangoFechaDatos && !mapGraficoFlag" v-model="rangoFechaDatos" :max="max" :min="min"
            hide-details class="align-center ma-6" thumb-label="always">
            <template v-slot:prepend>
                <v-text-field :value="rangoFechaDatos[0]" class="mt-0 pt-0 centered-input title" hide-details
                    single-line type="number" style="width: 60px"
                    @change="$set(rangoFechaDatos, 0, $event)"></v-text-field>
            </template>
            <template v-slot:append>
                <v-text-field :value="rangoFechaDatos[1]" class="mt-0 pt-0 centered-input title" hide-details
                    single-line type="number" style="width: 60px"
                    @change="$set(rangoFechaDatos, 1, $event)"></v-text-field>
            </template>
        </v-range-slider>

        <!-- Año -->
        <v-slider v-if="rangoFechaDatos && mapGraficoFlag" v-model="fechaMapDato" :max="max" :min="min"
            thumb-label="always">
            <template v-slot:prepend>
                <v-text-field :value="min" class="mt-0 pt-0 centered-input title" hide-details single-line type="number"
                    style="width: 60px"></v-text-field>
            </template>
            <template v-slot:append>
                <v-text-field :value="max" class="mt-0 pt-0 centered-input title" hide-details single-line type="number"
                    style="width: 60px"></v-text-field>
            </template>
        </v-slider>
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
            "rangoFechaDatos",
            "mapGraficoFlag",
            "fechaMapDato",

        ]),
    },
    data() {
        return {
            // periodoData: undefined,
            fechaDatos: undefined,
            min: undefined,
            max: undefined,
            // range: undefined,
        }
    },
    methods: {
        getFechas() {
            this.loader = true
            let body = {
                useDistinct: false,
                filters: []
            }
            let api = Axios.get(Enviroment.url + '/datasets/dates')
                .then(response => {
                    // this.periodoData = response.data.data
                    this.min = new Date(response.data.data.startDate).getFullYear()
                    this.max = new Date(response.data.data.endDate).getFullYear()
                    this.rangoFechaDatos = [this.min, this.max]
                    this.fechaMapDato = this.min
                    this.loader = false
                }).catch(error => {
                    console.error(error)
                    this.loader = false
                })
        }
    },
    beforeMount() {
        this.getFechas()
    }

}
</script>

<style scoped>
.centered-input>>>input {
    text-align: center
}
</style>