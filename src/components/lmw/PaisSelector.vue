<template>
    <v-container fluid>
        <v-autocomplete v-model="paisSelectedDatos" :items="paisesData" item-text="name" class="ma-1"
            :label="$t('labels.pais')" multiple outlined>
            <template v-slot:selection="data">
                <v-chip :key="JSON.stringify(data.item)" v-bind="data.attrs" :input-value="data.selected" close
                    @click:close="data.parent.selectItem(data.item)" :color="data.item.color" outlined>
                    <img :src="data.item.flag" width="30"> {{ '&nbsp' + data.item.name }}
                </v-chip>
            </template>
        </v-autocomplete>
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
            "adminData",
            "newAdminDialog",
            "typeMessageBar",
            "showMessageBar",
            "messageBar",
            "paisSelectedDatos",
            "allPaisesData"
        ]),
    },
    data() {
        return {
            paisSelectorDialog: false,
            paisesData: [],
        }
    },
    methods: {
        getPaises() {
            this.loader = true
            let api = Axios.get(Enviroment.url + '/catalog/view/all/countries/' + this.$i18n.locale.toUpperCase())
                .then(response => {
                    this.paisesData = response.data
                    this.allPaisesData = response.data
                    // this.allPaisesData.forEach(element => {
                    //     this.paisSelectedDatos.push(element.name)
                    // });
                    this.loader = false
                }).catch(error => {
                    console.error(error)
                    this.loader = false
                })
        },
    },
    mounted() {
        this.getPaises()
    }

}
</script>

<style>

</style>