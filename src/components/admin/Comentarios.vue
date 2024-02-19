<template>
    <v-container fluid>
        <v-card elevation="0">
            <v-card-title>
                <v-row align="center" justify="start">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn text color="primary" v-bind="attrs" v-on="on" @click="readComment()">
                                <v-icon class="mr-2">
                                    mdi-comment-check-outline
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>{{ $t("comentarios.leido") }}</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn text color="success" v-bind="attrs" v-on="on" @click="downloadCSV()">
                                <v-icon class="mr-2">
                                    mdi-file-document-outline
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>{{ $t("comentarios.descargarCSV") }}</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn text color="error" v-bind="attrs" v-on="on" @click="deleteComment()">
                                <v-icon class="mr-2">
                                    mdi-delete
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>{{ $t("comentarios.eliminar") }}</span>
                    </v-tooltip>
                </v-row>
            </v-card-title>
            <div>
                <v-data-table v-if="datosTabla" v-model="comentariosSelected" :headers="headers" :items="datosTabla"
                    :search="search" :page.sync="page" hide-default-footer @page-count="pageCount = $event"
                    :sort-desc="['regDate']" show-select>

                    <template v-slot:item.regDate="{ item }">
                        <span v-if="item.read">{{ getDate(item.regDate) }}</span>
                        <span v-if="!item.read" class="font-weight-bold">{{ getDate(item.regDate) }}</span>
                    </template>

                    <template v-slot:item.commment="{ item }">
                        <span v-if="item.read">{{ item.commment }}</span>
                        <span v-if="!item.read" class="font-weight-bold">{{ item.commment }}</span>
                    </template>
                </v-data-table>
                <div class="text-center pt-2">
                    <v-pagination v-model="page" :length="pageCount"></v-pagination>
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
            "typeMessageBar",
            "showMessageBar",
            "messageBar",
            "loader",
            "adminData",
            "lastPublish"
        ]),
    },
    data() {
        return {
            search: '',
            comentariosSelected: undefined,
            headers: null,
            datosTabla: null,

            page: 1,
            pageCount: 0,
            itemsPerPage: 10,

            headers: [
                { text: this.$i18n.t("comentarios.fechaComentario"), value: 'regDate' },
                { text: this.$i18n.t("comentarios.comentario"), value: 'commment' },
            ],
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
            let body = {
                useDistinct: false,
                filters: []
            }
            let api = Axios.get(Enviroment.url + '/comment/view/all',
                {
                    headers: {
                        Authorization: "Bearer" + " " + this.adminData.token,
                    }
                })
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
        readComment() {
            this.loader = true
            let idsSelected = []
            this.comentariosSelected.forEach(element => {
                idsSelected.push(element.id)
            });
            let body = {
                ids: idsSelected
            }
            let api = Axios.post(Enviroment.url + '/comment/read', body,
                {
                    headers: {
                        Authorization: "Bearer" + " " + this.adminData.token,
                    }
                }).then(response => {
                    this.loader = false
                    this.getDatos()
                    this.comentariosSelected = undefined

                }).catch(error => {
                    this.loader = false
                    this.newMessage("error", "Error: " + error.response.data[0]);
                    console.error(error);
                })
        },
        downloadCSV() {
            this.loader = true
            let idsSelected = []
            this.comentariosSelected.forEach(element => {
                idsSelected.push(element.id)
            });
            let body = {
                ids: idsSelected
            }
            let api = Axios.post(Enviroment.url + '/comment/download', body,
                {
                    headers: {
                        Authorization: "Bearer" + " " + this.adminData.token,
                    }
                }).then(response => {
                    this.loader = false
                    const options = {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                    }
                    options.timeZoneName = "short";
                    let fechaDownload = new Date()

                    let blob = new Blob([response.data], { type: "text/csv" })
                    let link = document.createElement('a')
                    link.href = window.URL.createObjectURL(blob)
                    link.download = this.$i18n.t("comentarios.comentariosDescarga") + fechaDownload.toLocaleString("en-US", options) + '.csv'
                    link.click()

                    this.comentariosSelected = undefined

                }).catch(error => {
                    this.loader = false
                    console.error(error);
                })
        },
        deleteComment() {
            this.loader = true
            let idsSelected = []
            this.comentariosSelected.forEach(element => {
                idsSelected.push(element.id)
            });
            let body = {
                ids: idsSelected
            }
            let api = Axios.post(Enviroment.url + '/comment/delete', body,
                {
                    headers: {
                        Authorization: "Bearer" + " " + this.adminData.token,
                    }
                }).then(response => {
                    this.loader = false
                    this.newMessage("success", this.$i18n.t("comentarios.comentariosEliminados")); this.getDatos()
                    this.comentariosSelected = undefined
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