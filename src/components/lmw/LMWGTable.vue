<template>
    <v-container fluid>
        <div class="text-center pt-2">
            <v-pagination v-if="lmwgTableData" v-model="page" circle :length="pageCount"
                :total-visible="10"></v-pagination>
        </div>
        <v-data-table v-if="lmwgTableData" :headers="allHeadersFilter" :items="lmwgTableData" :page.sync="page"
            hide-default-footer :items-per-page="itemsPerPage" @page-count="pageCount = $event"></v-data-table>
        <div class="text-center pt-2">
            <v-pagination v-if="lmwgTableData" v-model="page" circle :length="pageCount"
                :total-visible="10"></v-pagination>
        </div>
    </v-container>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
    computed: {
        ...mapFields([
            "loader",
            "lastPublish",
            "indicadoresSeleccionados",
            "paisSelectedDatos",
            "rangoFechaDatos",
            "allHeadersFilter",
            "lmwgTableData"
        ]),
    },
    data() {
        return {
            headers: this.allHeadersFilter,
            datosTabla: this.lmwgTableData,
            totalDatos: 0,
            page: 1,
            pageCount: 1,
            itemsPerPage: 100,
        }
    },
}
</script>

<style>

</style>