import api from '@/axios/api'
class UserService {
    async updateProfile(formData) {
        return await api.post(`api/User/EditUserProfile`, formData);
    }
    async uploadAvatar(formData, userId) {
        return await api.post(`api/User/EditUserProfileImage?Id=${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
    async updatePassword(formData, userId) {
        return await api.post(`api/User/ChangePasswordByUser?Id=${userId}`, formData);
    }
}

export default new UserService