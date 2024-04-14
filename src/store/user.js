import { defineStore } from "pinia";


export const useUserStore = defineStore('user', {
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
                token: '',
                expires_at: ''
            },
        }
    },
    getters: {
        getUser(state) {
            return state.user
        },
        isAuth(state) {
            // return state.user.token && state.user.expires_at && state.user.expires_at > Math.floor(Date.now() / 1000);
            return state.user.token && Math.floor(new Date('2025-2-2').getTime() / 1000) > Math.floor(Date.now() / 1000);
        },
    },
    actions: {
        setUser(user) {
            this.user = user
            localStorage.setItem('user', JSON.stringify(user));

        }
    }
})