import api from '@/axios/api'
class KnowledgeFieldService {
    async getKnowledgeFieldTree() {
        return await api.get(`/api/KnowledgeField/GetKnowledgeFieldTree`);
    }
    async create(data) {
        return await api.post(`api/KnowledgeField/Add`, data);
    }
    async getById(id) {
        return await api.get(`api/KnowledgeField/GetById/${id}`);
    }
    async update(data) {
        return await api.put(`api/KnowledgeField/update`, data);
    }
    async delete(id) {
        return await api.delete(`api/KnowledgeField/DeleteById/${id}`);
    }
}

export default new KnowledgeFieldService