import api from '@/axios/api'
class AuthService {
    async login(formData) {
        return await api.post(`api/Account/Login`, {
            userName: formData.userName,
            password: formData.password,
        });
    }
    async register(formData) {
        return await api.post(`api/Account/RequestRegister`, formData);
    }
    async getInfoForLoginPage() {
        return await api.get(`api/Home/GetLoginPageSetting`);
    }
}

export default new AuthService