import api from '@/axios/api'
class OrganizationService {
    async getOrganizationTree() {
        return await api.get(`/api/Organization/GetOrganizationTree`);
    }
    async create(data) {
        return await api.post(`api/Organization/Add`, data);
    }
    async getById(id) {
        return await api.get(`api/Organization/GetById/${id}`);
    }
    async update(data) {
        return await api.put(`api/Organization/update`, data);
    }
    async delete(id) {
        return await api.delete(`api/Organization/DeleteById/${id}`);
    }
}

export default new OrganizationService