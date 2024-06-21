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
            token: localStorage.getItem('token') || '',
            expires_at: Number(localStorage.getItem('expires_at')) || '',
            tree: { oneTree: '', towTree: '', OrganizationViewList_ModalCreate: '' },
            home_page_setting: JSON.parse( localStorage.getItem('home_page_setting') ),
        }
    },
    getters: {
        getUser: (state) => state.user,
        getToken: (state) => state.token,
        getExpiresAt: (state) => state.expires_at,
        isAuth: state => state.token && state.expires_at && state.expires_at > Math.floor(Date.now() / 1000),
        getTreeSelectedItem: (state) => (tree_name) => state.tree[tree_name],
        getHomePageSetting: (state) => state.home_page_setting

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
        },
        setTreeSelectedItem(tree_name, treeSelectedItem) {
            this.tree[tree_name] = treeSelectedItem;
        },
        setHomePageSetting(home_page_setting) {
            this.home_page_setting = home_page_setting
            localStorage.setItem('home_page_setting', JSON.stringify(home_page_setting));

        }
    }
})