<template>
    <v-container class="fill-height">
        <!-- <section>
            <v-row align="center" justify="center" class="mb-1">
                <v-img contain src="../../assets/images/image301.png" width="100%"
                    gradient="to top right, rgba(1,1,1,.33), rgb(1, 79, 110, 1)">
                    <v-container class="fill-height">
                        <v-col cols="6">
                            <v-row align="center" justify="start">
                                <span class="display-4 font-weight-medium white--text">{{
                                    $t("homeUser.lmwTitle")
                                }}</span>
                            </v-row>
                        </v-col>
                        <v-col cols="6">
                            <v-row align="end" justify="end">
                                <span class="headline text-justify white--text">
                                    {{ $t("homeUser.lmw") }}
                                </span>
                            </v-row>
                        </v-col>
                    </v-container>
                </v-img>
            </v-row>
        </section> -->
        <!-- <v-row align="center" justify="center"> -->
        <v-card width="80%" elevation="10">
            <v-img contain src="../../assets/images/image301.png" width="100%"
                    gradient="to top right, rgba(1,1,1,.33), rgb(1, 79, 110, 1)">
                <v-card-title class="d-flex justify-center">
                <span class="display-2 white--text font-weight-bold">
                    {{ carouselData[0].text }}
                </span>
            </v-card-title>

            <v-card-subtitle class="d-flex justify-center">
                <span class="display-2 white--text font-weight-bold">
                    {{ carouselData[0].title }}
                </span>
            </v-card-subtitle>
            <!-- <v-card-text class="d-flex justify-center">
                <v-img src="../../assets/images/screenGraficas.png" max-width="800" max-height="100%" />
            </v-card-text> -->

            <v-card-actions class="d-flex justify-center">
                <v-col cols="4">
                    <v-btn block color="white primary--text">
                        Da click aquí
                    </v-btn>
                </v-col>
            </v-card-actions>
            </v-img>
        </v-card>
        <!-- </v-row> -->
    </v-container>
</template>

<script>
export default {
    data: () => ({
        model: 0,
        colors: [
            'primary',
            'secondary',
            'yellow darken-2',
            'red',
            'orange',
        ],
        carouselData: [
            {
                title: "LATIN MACRO WATCH",
                text: "¡Nueva imagen, nuevas funcionalidades!"
            },
        ]
    }),
}
</script>

<style>

</style>