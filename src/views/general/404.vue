<template>
    <v-container class="fill-height">
        <v-row align="center" justify="center">
            <v-img v-if="$i18n.locale == 'es'" class="shrink selected" contain src="../../assets/images/bid_logo_es.png"
                width="50%" @click="toHome()" />
            <v-img v-if="$i18n.locale == 'en'" class="shrink selected" contain src="../../assets/images/bid_logo_es.png"
                width="50%" @click="toHome()" />
        </v-row>
        <v-row align="center" justify="center">
            <!-- <h1>{{ $t("404") }}</h1> -->
            <span class="display-4">¡Ups! Pagina no encontrada</span>
        </v-row>
    </v-container>
</template>

<script>
export default {
    methods: {
        toHome() {
            this.$router.push({ name: "HomeUser" });
        },
    },
};
</script>

<style scoped>
.selected {
    cursor: pointer;
}
</style>