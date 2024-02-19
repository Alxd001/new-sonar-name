<template>
    <v-dialog v-model="loader" persistent width="500">
        <v-card color="primary" dark class="rounded-lg">
            <v-card-text class="text-center display-1 font-weight-bold">
                {{ $t("general.cargando") }}
                <v-progress-linear indeterminate color="white" height="15" rounded class="mb-0"
                    striped></v-progress-linear>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapFields } from "vuex-map-fields";

export default {
    computed: {
        ...mapFields(["loader"]),
    },
};
</script>

<style scoped>

</style>