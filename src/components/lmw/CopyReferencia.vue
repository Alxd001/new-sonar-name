<template>
    <v-text-field id="myInput" v-model="citaLMW" :label="$t('labels.referencia')" readonly class="ma-2">
        <template v-slot:append>
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon color="primary" v-bind="attrs" v-on="on" @click="copyClipboard()">
                        <v-icon class="mr-2">
                            mdi-content-copy
                        </v-icon>
                    </v-btn>
                </template>
                <span>{{ $t("latinMacroWatchDatos.copyReference") }}</span>
            </v-tooltip>
        </template>
    </v-text-field>
</template>

<script>
import Axios from 'axios'
import { mapFields } from 'vuex-map-fields';
import Enviroment from '../../scripts/Enviroment'

export default {
    computed: {
        ...mapFields([
            "loader",
            "typeMessageBar",
            "showMessageBar",
            "messageBar",
            "lastPublish",
        ]),
    },
    data() {
        return {
            citaLMW: ''
        }
    },
    methods: {
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
        copyClipboard() {
            var copyText = document.getElementById("myInput");
            copyText.select();
            copyText.setSelectionRange(0, 99999);
            document.execCommand("copy");
            this.typeMessageBar = "success";
            this.showMessageBar = true;
            this.messageBar = this.$i18n.t("latinMacroWatchDatos.copiedReference");
        },
    },
    mounted() {
        this.getLastPublish()
    }
}
</script>

<style>

</style>