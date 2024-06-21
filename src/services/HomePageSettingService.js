import api from '@/axios/api'
class HomePageSettingService {
    async GetLoginPageSetting() {
        return await api.get(`/api/Home/GetLoginPageSetting`);
    }
 
    async updateInfoHomePageSetting(data) {
        return await api.put(`api/Home/UpdateHomePageSetting`, data);
    }

    async updateLogo(formData) {
        return await api.post(`api/Home/UpdateLogo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
 
}

export default new HomePageSettingService
 