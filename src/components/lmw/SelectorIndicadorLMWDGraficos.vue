<template>
    <v-container>
        <v-form ref="form">
            <!-- {{ indicadoresGraficos }} -->
            <v-row align="center" justify="center" class="mr-1">
                <v-select v-model="areaSelected" :items="areasData" item-text="name" item-value="name"
                    :label="$t('labels.area')" outlined :rules="requiredRules"></v-select>
            </v-row>
            <v-row align="center" justify="center" class="mr-1">
                <v-select v-model="temaSelected" :items="temasData" :label="$t('labels.tema')" outlined
                    :disabled="!areaSelected" :rules="requiredRules"></v-select>
            </v-row>
            <!-- Primer Indicador -->
            <v-row align="center" justify="center" class="ma-1 mb-5">
                <v-card width="100%" max-width="500" height="100%" elevation="10" rounded="xl">
                    <v-card-title>
                        <v-row align="center" justify="center">
                            <v-col class="d-flex align-center justify-start">
                                <span class="subtitle-1 grey--text text--darken-1">{{
                                    $t("selectorIndicadorLMWG.indicador1")
                                }}</span>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-card-text>
                        <v-row align="center" justify="center">
                            <v-col cols="12">
                                <v-select v-model="indicadorSelected" :items="indicadoresData"
                                    :label="$t('labels.indicador')" outlined class="ma-1" :disabled="!temaSelected"
                                    :rules="requiredRules"></v-select>
                                <v-select v-model="unidadSelected" :items="unidadesData" :label="$t('labels.unidad')"
                                    outlined class="ma-1" :disabled="!indicadorSelected"
                                    :rules="requiredRules"></v-select>
                                <v-row align="center" justify="center">
                                    <v-btn-toggle v-model="graficoSelected" mandatory tile color="primary" group>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn icon v-bind="attrs" v-on="on">
                                                    <v-icon color="primary" x-large>mdi-chart-bar</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>{{ $t("selectorIndicadorLMWG.barras") }}</span>
                                        </v-tooltip>

                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn icon v-bind="attrs" v-on="on">
                                                    <v-icon color="primary" x-large>mdi-chart-line</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>{{ $t("selectorIndicadorLMWG.lineas") }}</span>
                                        </v-tooltip>

                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn icon v-bind="attrs" v-on="on"
                                                    :disabled="totalIndicadoresGraficos == 1">
                                                    <v-icon color="primary" x-large>mdi-chart-scatter-plot</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>{{ $t("selectorIndicadorLMWG.dispercion") }}</span>
                                        </v-tooltip>

                                        <!-- <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn icon v-bind="attrs" v-on="on"
                                                    :disabled="totalIndicadoresGraficos == 1">
                                                    <v-icon color="primary" x-large>mdi-earth</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>{{ $t("selectorIndicadorLMWG.mapa") }}</span>
                                        </v-tooltip> -->
                                    </v-btn-toggle>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-row>
            <!-- Segundo Indicador -->
            <v-row v-if="totalIndicadoresGraficos == 1" align="center" justify="center" class="ma-1">
                <v-card width="100%" max-width="500" height="100%" elevation="10" rounded="xl">
                    <v-card-title>
                        <v-row align="center" justify="center">
                            <v-col class="d-flex align-center justify-start">
                                <span class="subtitle-1 grey--text text--darken-1">{{
                                    $t("selectorIndicadorLMWG.indicador2")
                                }}</span>
                            </v-col>
                            <v-col class="d-flex align-center justify-end">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon x-large color="error" @click="deleteIndicador()" v-bind="attrs"
                                            v-on="on">
                                            <v-icon>mdi-close</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>{{ $t("selectorIndicadorLMWG.eliminar") }}</span>
                                </v-tooltip>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-card-text>
                        <v-row align="center" justify="center">
                            <v-col cols="12">
                                <v-select v-model="indicadorSelected2" :items="indicadoresData"
                                    :label="$t('labels.indicador')" outlined class="ma-1" :disabled="!temaSelected"
                                    :rules="requiredRules"></v-select>
                                <v-select v-model="unidadSelected2" :items="unidadesData2" :label="$t('labels.unidad')"
                                    outlined class="ma-1" :disabled="!indicadorSelected2"
                                    :rules="requiredRules"></v-select>
                                <v-row align="center" justify="center">
                                    <v-btn-toggle v-model="graficoSelected2" mandatory tile color="primary" group>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn icon v-bind="attrs" v-on="on">
                                                    <v-icon color="primary" x-large>mdi-chart-bar</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>{{ $t("selectorIndicadorLMWG.barras") }}</span>
                                        </v-tooltip>

                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn icon v-bind="attrs" v-on="on">
                                                    <v-icon color="primary" x-large>mdi-chart-line</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>{{ $t("selectorIndicadorLMWG.lineas") }}</span>
                                        </v-tooltip>

                                        <!-- <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn icon v-bind="attrs" v-on="on">
                                                <v-icon color="primary" x-large>mdi-chart-scatter-plot</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>{{ $t("selectorIndicadorLMWG.dispercion") }}</span>
                                    </v-tooltip>

                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn icon v-bind="attrs" v-on="on">
                                                <v-icon color="primary" x-large>mdi-earth</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>{{ $t("selectorIndicadorLMWG.mapa") }}</span>
                                    </v-tooltip> -->
                                    </v-btn-toggle>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-row>
        </v-form>

        <v-row v-if="totalIndicadoresGraficos == 0" align="center" justify="end" class="ma-6">
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark fab @click="addIndicador()" v-bind="attrs" v-on="on"
                        :disabled="graficoSelected == 2">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </template>
                <span>{{ $t("selectorIndicadorLMWG.agregar") }}</span>
            </v-tooltip>
        </v-row>
    </v-container>
</template>

<script>
import Axios from 'axios'
import { mapFields } from 'vuex-map-fields'
import Enviroment from '../../scripts/Enviroment'

export default {
    computed: {
        ...mapFields([
            "loader",
            "typeMessageBar",
            "showMessageBar",
            "messageBar",
            "indicadoresGraficos",
            "totalIndicadoresGraficos",
            "validarCamposIndicadores",
            "camposIndicadoresValidados",
            "mapGraficoFlag"
        ]),
    },
    data() {
        return {
            requiredRules: [
                (v) => !!v || this.$i18n.t("rulesInput.campoRequerido"), //
            ],
            itemsArbolGraficos: [],
            contadorID: 0,
            areasData: [],
            areaSelected: '',
            temasData: [],
            temaSelected: '',
            indicadoresData: [],
            indicadorSelected: '',
            indicadorSelected2: '',
            unidadesData: [],
            unidadesData2: [],
            unidadSelected: '',
            unidadSelected2: '',
            graficoSelected: 0,
            graficoSelected2: 0
        }
    },
    methods: {
        newMessage(type, message) {
            this.typeMessageBar = type;
            this.showMessageBar = true;
            this.messageBar = message;
        },
        addIndicador() {
            this.totalIndicadoresGraficos++
            this.indicadoresGraficos.indicadores.push({
                indicador: "",
                unidad: "",
                grafico: "bar"
            })
        },
        deleteIndicador() {
            this.totalIndicadoresGraficos--
            this.indicadoresGraficos.indicadores.pop()
        },
        getArbol() {
            this.loader = true
            let api = Axios.get(Enviroment.url + '/catalog/view/tree/' + this.$i18n.locale)
                .then(response => {
                    this.formatArbolData(response.data)
                    this.loader = false
                })
                .catch(error => {
                    console.error(error)
                    this.newMessage("error", "Error: " + error.response.data[0]);
                    this.loader = false
                })
        },
        formatArbolData(arbol) {
            this.itemsArbolGraficos = this.areaFormat(arbol)
            this.areasData = this.getAreas(this.itemsArbolGraficos)
        },
        areaFormat(childrens) {
            let areas = []
            childrens.forEach(element => {
                this.contadorID++
                let area = {
                    id: undefined,
                    name: undefined,
                    children: undefined
                }
                area.id = this.contadorID
                area.name = element.name
                area.children = this.temaFormat(element.childrens, area.name)
                areas.push(area)
            });
            return areas
        },
        temaFormat(childrens, area) {
            let temas = []
            childrens.forEach(element => {
                this.contadorID++
                let tema = {
                    id: undefined,
                    name: undefined,
                    area: area,
                    children: undefined
                }
                tema.id = this.contadorID
                tema.name = element.name
                tema.children = this.indicadorFormat(element.childrens, area, tema.name)
                temas.push(tema)
            });
            return temas
        },
        indicadorFormat(childrens, area, tema) {
            let indicadores = []
            childrens.forEach(element => {
                this.contadorID++
                let indicador = {
                    id: undefined,
                    name: undefined,
                    area: undefined,
                    tema: undefined,
                    children: undefined
                }
                indicador.id = this.contadorID
                indicador.name = element.name
                indicador.area = area
                indicador.tema = tema
                indicador.children = this.unidadesFormat(element.childrens, area, tema, indicador.name)
                indicadores.push(indicador)
            });
            return indicadores
        },
        unidadesFormat(childrens, area, tema, indicador) {
            let unidades = []
            childrens.forEach(element => {
                this.contadorID++
                let unidad = {
                    id: undefined,
                    name: undefined,
                    area: undefined,
                    tema: undefined,
                    indicador: undefined
                }
                unidad.id = this.contadorID
                unidad.name = element.name
                unidad.area = area
                unidad.tema = tema
                unidad.indicador = indicador
                unidades.push(unidad)
            });
            return unidades
        },
        getAreas(arbolDatos) {
            let areas = []
            arbolDatos.forEach(element => {
                areas.push(element.name)
            });
            return areas
        },
        getTemas(area, arbolDatos) {
            let temas = []
            arbolDatos.forEach(element => {
                if (element.name == area) {
                    element.children.forEach(element2 => {
                        temas.push(element2.name)
                    });
                }
            });
            return temas
        },
        getIndicadores(area, tema, arbolDatos) {
            let indicadores = []
            arbolDatos.forEach(element => {
                if (element.name == area) {
                    element.children.forEach(element2 => {
                        if (element2.name == tema) {
                            element2.children.forEach(element3 => {
                                indicadores.push(element3.name)
                            });
                        }
                    });
                }
            });
            return indicadores
        },
        getUnidades(area, tema, indicador, arbolDatos) {
            let unidades = []
            arbolDatos.forEach(element => {
                if (element.name == area) {
                    element.children.forEach(element2 => {
                        if (element2.name == tema) {
                            element2.children.forEach(element3 => {
                                if (element3.name == indicador) {
                                    element3.children.forEach(element4 => {
                                        unidades.push(element4.name)
                                    });
                                }
                            });
                        }
                    });
                }
            });
            return unidades
        },
        getGraficaType(graficoType) {
            let tipoGrafico = undefined
            switch (graficoType) {
                case 0:
                    tipoGrafico = 'bar'
                    break;
                case 1:
                    tipoGrafico = 'line'
                    break;
                case 2:
                    tipoGrafico = 'scatter'
                    break;
                case 3:
                    tipoGrafico = 'map'
                    break;
            }
            return tipoGrafico
        },
    },
    mounted() {
        this.getArbol()
    },
    watch: {
        validarCamposIndicadores() {
            if (this.validarCamposIndicadores) {
                if (!this.$refs.form.validate()) {
                    this.newMessage("error", this.$i18n.t("rulesInput.messageCamposObligatorios"));
                }
                this.validarCamposIndicadores = false
            }
        },
        areaSelected() {
            this.temasData = this.getTemas(this.areaSelected, this.itemsArbolGraficos)
            this.indicadoresGraficos.area = this.areaSelected
        },
        temaSelected() {
            this.indicadoresData = this.getIndicadores(this.areaSelected, this.temaSelected, this.itemsArbolGraficos)
            this.indicadoresGraficos.tema = this.temaSelected
        },
        indicadorSelected() {
            this.unidadesData = this.getUnidades(this.areaSelected, this.temaSelected, this.indicadorSelected, this.itemsArbolGraficos)
            this.indicadoresGraficos.indicadores[0].indicador = this.indicadorSelected
        },
        indicadorSelected2() {
            this.unidadesData2 = this.getUnidades(this.areaSelected, this.temaSelected, this.indicadorSelected2, this.itemsArbolGraficos)
            this.indicadoresGraficos.indicadores[1].indicador = this.indicadorSelected2
        },
        unidadSelected() {
            this.indicadoresGraficos.indicadores[0].unidad = this.unidadSelected
        },
        unidadSelected2() {
            this.indicadoresGraficos.indicadores[1].unidad = this.unidadSelected2
        },
        graficoSelected() {
            if (this.graficoSelected == 3) {
                this.mapGraficoFlag = true
            } else {
                this.mapGraficoFlag = false
            }
            this.indicadoresGraficos.indicadores[0].grafico = this.getGraficaType(this.graficoSelected)
        },
        graficoSelected2() {
            this.indicadoresGraficos.indicadores[1].grafico = this.getGraficaType(this.graficoSelected2)
        }

    }
}
</script>

<style>

</style>