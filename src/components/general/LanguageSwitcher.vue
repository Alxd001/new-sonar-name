<template>
    <v-menu bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on }">
            <v-btn outlined color="primary" class="ma-2" v-on="on">
                <span class="subtitle-2">{{ getIdioma($i18n.locale) + '&nbsp - &nbsp' }}</span>
                <v-icon v-on="on"> mdi-translate </v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-list-item-content class="justify-center">
                <div class="mx-auto text-center">
                    <v-btn block rounded text @click="changeLanguage('en')">
                        English
                    </v-btn>
                    <v-divider class="my-3"></v-divider>
                    <v-btn block rounded text @click="changeLanguage('es')">
                        Español
                    </v-btn>
                </div>
            </v-list-item-content>
        </v-card>
    </v-menu>
</template>

<script>
import { mapFields } from "vuex-map-fields";

export default {
    computed: {
        ...mapFields([
            "langControl",
            "typeMessageBar",
            "showMessageBar",
            "messageBar",
        ]),
    },
    methods: {
        newMessage(type, message) {
            this.typeMessageBar = type;
            this.showMessageBar = true;
            this.messageBar = message;
        },
        changeLanguage(langLocale) {
            if (this.$i18n.locale !== langLocale) {
                this.$i18n.locale = langLocale;
                this.$router.push({
                    params: { lang: langLocale },
                });
                this.langControl = langLocale;
                window.location.reload();
                // this.newMessage("info", this.$i18n.t("messages.languageChange"));
            }
        },
        getIdioma(langControl) {
            if (langControl == 'es') {
                return "Español"
            } else if (langControl == 'en') {
                return "English"
            }
        }
    },
};
</script>

<style>

</style>