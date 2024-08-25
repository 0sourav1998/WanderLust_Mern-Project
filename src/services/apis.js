const BASE_URL = process.env.REACT_APP_BASE_URL ;


export const authEndpoints = {
    SIGNUP : `${BASE_URL}/auth/signup`,
    LOGIN : `${BASE_URL}/auth/login`
}


export const listingEndpoints = {
    ALLLISTINGS : `${BASE_URL}/listing/fetchAllListing`,
    CREATE_LISTING : `${BASE_URL}/listing/createListing`
}