import api from '@/axios/api'
class FormService {
    async getAll() {
        return await api.get(`api/Form/GetAll`);
    }
    async create(data) {
        return await api.post(`api/Form/Add`, data);
    }
    async get(id) {
        return await api.get(`api/Form/Get/${id}`);
    }
    async update(data) {
         return await api.put(`api/Form/Update`, data);
     }
    async delete(id) {
        return await api.delete(`api/Form/DeleteById/${id}`);
    }



//SpecialField
    async getAllSpecialFildsOfForm(formId) {
        return await api.get(`api/Form/GetAllSpecialFildsOfForm/${formId}`);
    }
    async deleteSpecialFild(id) {
        return await api.delete(`api/Form/DeleteSpecialFild/${id}`);
    }
    async addSpecialField(data) {
        console.log(data);
        return await api.post(`api/Form/AddSpecialField`, data);
    }
    async getSpecialField(id) {
        return await api.get(`api/Form/GetSpecialField/${id}`);
    }
    async updateSpecialField(data) {
        return await api.put(`api/Form/UpdateSpecialField`, data);
    }
}

export default new FormService