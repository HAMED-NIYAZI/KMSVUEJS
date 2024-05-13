export const isAuth = () => {
    const token = localStorage.getItem('token');
    const expiresAt = localStorage.getItem('expiresAt');
    return token && expiresAt && expiresAt > Math.floor(Date.now() / 1000);
}