import api from '@/axios/api'
class TreeService {
    async tree() {
        return await api.get(`/api/Organization/GetOrganizationTree`);
    }
    async create(data) {
        return await api.post(`api/Grade/Add`, data);
    }
    async getById(id) {
        return await api.get(`api/Grade/GetById/${id}`);
    }
    async update(data) {
        return await api.put(`api/Grade/update`, data);
    }
    async delete(id) {
        return await api.delete(`api/Grade/DeleteById/${id}`);
    }
}

export default new TreeService