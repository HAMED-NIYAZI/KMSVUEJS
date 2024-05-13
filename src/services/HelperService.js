export const isAuth = () => {
    const token = localStorage.getItem('token');
    const expiresAt = localStorage.getItem('expires_at');
    return token && expiresAt && Number(expiresAt) > Math.floor(Date.now() / 1000);
}