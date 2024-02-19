import Vue from 'vue'
import Vuex from 'vuex'
import { getField, updateField } from 'vuex-map-fields';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // lang control
    langControl: 'es',
    // loader
    loader: false,
    // messageBar
    typeMessageBar: 'info',
    showMessageBar: false,
    messageBar: 'Hola',
    // admin
    adminData: {
      fullName: "Victor Resendiz",
      profile: "admin",
      token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJpZFVzZXJcIjoxfSIsImlzcyI6ImF1dGgwIiwiZXhwIjoxNjc1MjE1ODYyLCJpYXQiOjE2NzUxMjk0NjJ9.QI9GPdh-695dAXz-BezSkrC4C7eRPppriKv-R5YtplQ"
    },
    selectedAdminItem: 0,
    drawerMenuAdmin: false,
    lastPublish: null,
    newAdminDialog: false,
    recoverPasswordAdminDialog: false,
    confirmDialog: false,
    transaccionCompleta: false,
    editPaisDialog: false,
    // lmw
    allHeadersFilter: [],
    lmwgTableData: [],
    indicadoresSeleccionados: [],
    paisSelectedDatos: [],
    mapGraficoFlag: false,
    fechaMapDato: undefined,
    frecuenciaSelected: '',
    // paisSelectedDatos: ["Colombia", "México", "Argentina"],
    allPaisesData: [],
    rangoFechaDatos: [],
    indicadoresGraficos: {
      area: "",
      tema: "",
      indicadores: [
        {
          indicador: "",
          unidad: "",
          grafico: "bar"
        }
      ],
    },
    // indicadoresGraficos: { "area": "01_Actividad Económica y Empleo", "tema": "01_Cuentas Nacionales", "indicadores": [{ "indicador": "PIB", "unidad": "millones de US$", "grafico": "bar" }] },
    totalIndicadoresGraficos: 0,
    validarCamposIndicadores: false,
  },
  getters: {
    getField,
  },
  mutations: {
    updateField,
  },
  actions: {
  },
  modules: {
  }
})
