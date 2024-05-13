import { defineStore } from "pinia";


export const LocalStorageService = defineStore('user', {
    state: () => {
        return {
            user: JSON.parse(localStorage.getItem('user')) || {
                userId: '',
                firstName: '',
                lastName: '',
                userName: '',
                phone: '',
                confirmedPhone: '',
                email: '',
                confirmedEmail: '',
                address: '',
                codeMeli: '',
                personNumber: '',
                about: '',
                positionName: '',
                positionId: '',
                imagePath: '',
                gradeId: '',
                gradeName: '',
                chartId: '',
                chartPersianTitleName: '',
                organizationId: '',
                organizationPersianTitleName: '',
            },
            token: '',
            expires_at: ''
        }
    },
    getters: {
        getUser(state) {
            return state.user || JSON.parse(localStorage.getItem('user'))
        },
        getToken(state) {
            return state.token
        },
        getExpiresAt(state) {
            return Number(state.expires_at) || Number(localStorage.getItem('expires_at'));
        },
        isAuth(state) {
            return state.token && state.expires_at && state.expires_at > Math.floor(Date.now() / 1000);
        },
    },
    actions: {
        setUser(user) {
            this.user = user
            localStorage.setItem('user', JSON.stringify(user));
        },
        setToken(token) {
            this.token = token
            localStorage.setItem('token', token);

        },
        setExpiresAt(expires_at) {
            this.expires_at = expires_at
            localStorage.setItem('expires_at', expires_at);
        }
    }
})