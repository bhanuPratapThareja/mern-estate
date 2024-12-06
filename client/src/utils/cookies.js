export const invalidateTokenCookie = () => {
   document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

const getCookie = () => {
   
}