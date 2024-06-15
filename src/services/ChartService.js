import api from '@/axios/api'
class ChartService {
    async getChartTree() {
        return await api.get(`/api/Chart/GetChartTree`);
    }
    async GetChartTreeWithOrganizationId(organizationId) {
        return await api.get(`/api/Chart/GetChartTreeWithOrganizationId?organizationId=`+organizationId);
     }
    async create(data) {
        return await api.post(`api/Chart/Add`, data);
    }
}

export default new ChartService