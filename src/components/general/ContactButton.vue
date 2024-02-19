<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500" transition="dialog-bottom-transition">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="warning" elevation="10" class="ma-6" fixed fab x-large bottom right v-bind="attrs"
                    v-on="on">
                    <v-icon x-large>
                        mdi-chat-processing-outline
                    </v-icon>
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="text-h5 primary">
                    <v-col cols="10" class="d-flex align-center justify-start">
                        <!-- Reemplazar -->
                        <span class="font-weight-black white--text">
                            <v-icon color="white" large>mdi-comment</v-icon>
                            {{ $t("contactButton.titulo") }}
                        </span>
                    </v-col>

                    <v-col cols="2" class="d-flex align-center justify-end">
                        <v-btn icon x-large color="white" @click="close()">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-col>
                </v-card-title>

                <v-card-text class="mt-6">
                    <v-row align="center" justify="center" class="mb-2">
                        <!-- <span class="font-weight-black headline text-center"> ¿Estás seguro de querer
                            reemplazar la
                            Base de Datos?</span> -->
                        <span class="subtitle-1 text-justify">
                            {{ $t("contactButton.text") }}
                        </span>
                    </v-row>

                    <v-form ref="form">
                        <v-textarea v-model="comentario" outlined name="input-7-4" :label="$t('contactButton.dejaComentario')"
                            class="ma-1" counter="250" :rules="requiredRules"></v-textarea>
                    </v-form>

                    <v-row align="center" justify="start">
                        <span>{{ $t("contactButton.contacto") }}
                            <a href="mailto:lmw@iadb.org" target="_blank">lmw@iadb.org</a></span>
                    </v-row>
                </v-card-text>

                <v-divider></v-divider>
                <v-card-actions class="d-flex justify-center">
                    <v-col cols="6">
                        <v-btn color="success" block @click="next()">
                            {{ $t("contactButton.enviar") }}
                        </v-btn>
                    </v-col>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import Axios from "axios";
import { mapFields } from "vuex-map-fields";
import Enviroment from '../../scripts/Enviroment';

export default {
    computed: {
        ...mapFields([
            "typeMessageBar",
            "showMessageBar",
            "messageBar",
            "loader",
        ]),
    },
    data() {
        return {
            dialog: false,
            comentario: '',
            requiredRules: [
                (v) => !!v || this.$i18n.t("rulesInput.campoRequerido"), //
                (v) => v.length < 250 || this.$i18n.t("rulesInput.messageNoExcederCaracteres"), //
            ],
        }
    },
    methods: {
        newMessage(type, message) {
            this.typeMessageBar = type;
            this.showMessageBar = true;
            this.messageBar = message;
        },
        next() {
            if (this.$refs.form.validate()) {
                this.sendComment()
            } else {
                this.newMessage("error", this.$i18n.t("rulesInput.messageCamposObligatorios"));
            }
        },
        close() {
            this.$refs.form.reset()
            this.dialog = false
        },
        sendComment() {
            this.loader = true
            let body = {
                comment: this.comentario
            }
            let api = Axios.post(Enviroment.url + '/comment/create', body)
                .then(response => {
                    this.loader = false
                    this.newMessage("success", this.$i18n.t("contactButton.comentarioEnviado"));
                    this.close()
                })
                .catch(error => {
                    this.loader = false
                    this.newMessage("error", "Error: " + error.response.data[0]);
                    console.error(error);
                })
        }
    }
}
</script>

<style>

</style>