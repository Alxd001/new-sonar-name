export default {
    saveSession(sessionData) {
        localStorage.setItem("sessionData", window.btoa(JSON.stringify(sessionData)));
    },
    getSession() {
        return JSON.parse(window.atob(localStorage.getItem("sessionData")))
    },
    isLogged() {
        if (localStorage.getItem("sessionData")) {
            return true
        } else {
            return false
        }
    },
    closeSession() {
        localStorage.clear()
    },
}