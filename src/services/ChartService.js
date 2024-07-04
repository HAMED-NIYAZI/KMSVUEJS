import api from '@/axios/api'
class ChartService {
    async getChartTree() {
        return await api.get(`/api/Chart/GetChartTree`);
    }
    async getOrganizationChartTree(id) {
        return await api.get(`/api/Chart/GetChartTreeWithOrganizationId?organizationId=${id}`);
    }
    async create(data) {
        return await api.post(`api/Chart/Add`, data);
    }
    async delete(id) {
        return await api.delete(`api/Chart/DeleteById/${id}`);
    }
    async getById(id) {
        return await api.get(`api/Chart/GetById/${id}`);
    }
}

export default new ChartService;