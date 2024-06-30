import api from '@/axios/api'
class FormService {
    async getAll() {
        return await api.get(`api/Form/GetAll`);
    }
    async create(data) {
        return await api.post(`api/Form/Add`, data);
    }
    // async getById(id) {
    //     return await api.get(`api/Form/GetById/${id}`);
    // }
    // async update(data) {
    //     return await api.put(`api/Form/update`, data);
    // }
    async delete(id) {
        return await api.delete(`api/Form/DeleteById/${id}`);
    }
}

export default new FormService