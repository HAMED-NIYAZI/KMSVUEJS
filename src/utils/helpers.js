export const isAuth = () => {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    return user && user.token && Math.floor(new Date('2025-2-2').getTime() / 1000) > Math.floor(Date.now() / 1000);
}