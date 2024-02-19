<template>
    <v-container fluid>
        <v-hover v-slot="{ hover }">
            <v-card width="100%" height="100%" :elevation="hover ? 24 : 0" outlined @click="arbolDatosdialog = true">
                <v-container class="fill-height d-flex justify-center">
                    <span v-if="indicadoresSeleccionados.length === 0" class="display-1 primary--text">
                        {{ $t("lmwdArbol.agregarIndicadores") }}
                        <v-icon color="primary" class="pb-1" large>mdi-plus</v-icon>
                    </span>
                    <v-chip v-for="indicador in indicadoresSeleccionados" :key="indicador.id" color="primary"
                        class="ma-1" close @click:close="eliminar(indicador)">
                        {{ indicador.name }}
                    </v-chip>
                    <span v-if="indicadoresSeleccionados.length" class="subtitle-1 primary--text">
                        <v-icon color="primary" class="" x-large>mdi-plus</v-icon>
                    </span>
                </v-container>
            </v-card>
        </v-hover>
        <v-dialog v-model="arbolDatosdialog" hide-overlay transition="dialog-bottom-transition" width="80%">
            <v-card height="80%">
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="arbolDatosdialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{ $t("lmwdArbol.selectorIndicadoresTitle") }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-container>
                    <v-row align="start" justify="center">
                        <v-col cols="12" md="4">
                            <v-text-field v-model="search" label="Busca un indicador" outlined flat hide-details
                                clearable clear-icon="mdi-close-circle-outline"></v-text-field>
                            <v-treeview v-model="indicadoresSeleccionados" :items="itemsArbol" selected-color="primary"
                                selectable return-object :search="search" open-all></v-treeview>
                        </v-col>
                        <v-divider vertical></v-divider>

                        <v-col cols="12" md="8">
                            <v-container fluid wrap class="fill-height">
                                <v-chip v-for="indicador in indicadoresSeleccionados" :key="indicador.id"
                                    color="primary" class="ma-1" close @click:close="eliminar(indicador)">
                                    {{ indicador.name }}
                                </v-chip>
                            </v-container>
                            <!-- {{ indicadoresSeleccionados }} -->
                            <!-- {{ itemsArbol }} -->

                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>
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
            "adminData",
            "newAdminDialog",
            "typeMessageBar",
            "showMessageBar",
            "messageBar",
            "indicadoresSeleccionados"
        ]),
    },
    data() {
        return {
            arbolDatosdialog: false,
            search: null,
            // indicadoresSeleccionados: [],
            itemsArbol: undefined,
            contadorID: 0,
        }
    },
    methods: {
        eliminar(indicador) {
            let i = 0
            this.indicadoresSeleccionados.forEach(element => {
                i++
                if (indicador.id === element.id) {
                    this.indicadoresSeleccionados.splice(i - 1, 1)
                }
            });
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
            let arbolData = [
                {
                    id: 0,
                    name: this.$i18n.t("lmwdArbol.seleccionarTodo"),
                    children: this.areaFormat(arbol)
                }
            ]
            this.itemsArbol = arbolData
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
                    tema: undefined
                }
                indicador.id = this.contadorID
                indicador.name = element.name
                indicador.area = area
                indicador.tema = tema
                indicadores.push(indicador)
            });
            return indicadores
        }
    },
    mounted() {
        this.getArbol()
    }
}
</script>

<style>
.padding0 {
    padding: 0 !important;
}
</style>