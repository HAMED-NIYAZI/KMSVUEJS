import api from '@/axios/api'
class KnowledgeFieldService {
    async getKnowledgeFieldTree() {
        return await api.get(`/api/KnowledgeField/GetKnowledgeFieldTree`);
    }
    async create(data) {
        return await api.post(`api/KnowledgeField/Add`, data);
    }
}

export default new KnowledgeFieldService