const BASE_URL = process.env.REACT_APP_BASE_URL ;


export const authEndpoints = {
    SIGNUP : `${BASE_URL}/auth/signup`,
    LOGIN : `${BASE_URL}/auth/login`
}


export const listingEndpoints = {
    ALLLISTINGS : `${BASE_URL}/listing/fetchAllListing`,
    CREATE_LISTING : `${BASE_URL}/listing/createListing` ,
    LISTING_DETAILS : `${BASE_URL}/listing/specificListing`
}

export const ratingReviewEndpoint = {
    CREATE_RATING_REVIEW : `${BASE_URL}/ratingAndReview/create`,
    FETCH_ALL : `${BASE_URL}/ratingAndReview/fetchAllReviews`,
    DELETE_REVIEW : `${BASE_URL}/ratingAndReview/delete`,
    FETCH_REVIEW : `${BASE_URL}/ratingAndReview/specificreview`
} 