import api from '@/axios/api'
class ChartService {
    async getChartTree() {
        return await api.get(`/api/Chart/GetChartTree`);
    }
    async getOrganizationChartTree(id) {
        return await api.get(`/api/Chart/GetChartTreeWithOrganizationId?organizationId=${id}`);
    }
}

export default new ChartService;