import api from '@/axios/api'
class HomePageSettingService {
    async GetLoginPageSetting() {
        return await api.get(`/api/Home/GetLoginPageSetting`);
    }
    // async create(data) {
    //     return await api.post(`api/Home/Add`, data);
    // }
    // async getById(id) {
    //     return await api.get(`api/Home/GetById/${id}`);
    // }
    async updateInfoHomePageSetting(data) {
        return await api.put(`api/Home/UpdateHomePageSetting`, data);
    }
    // async delete(id) {
    //     return await api.delete(`api/Home/DeleteById/${id}`);
    // }
}

export default new HomePageSettingService