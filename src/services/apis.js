const BASE_URL = process.env.REACT_APP_BASE_URL ;
console.log("Base Url",BASE_URL)
export const authEndpoints = {
    SIGNUP : `${BASE_URL}/auth/signup`,
    LOGIN : `${BASE_URL}/auth/login`
}
