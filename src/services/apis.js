const BASE_URL = process.env.REACT_APP_BASE_URL ;


export const authEndpoints = {
    SIGNUP : `${BASE_URL}/auth/signup`,
    LOGIN : `${BASE_URL}/auth/login`,
    UPLOAD_IMAGE : `${BASE_URL}/auth/uploadImage`
}


export const listingEndpoints = {
    ALLLISTINGS : `${BASE_URL}/listing/fetchAllListing`,
    CREATE_LISTING : `${BASE_URL}/listing/createListing` ,
    LISTING_DETAILS : `${BASE_URL}/listing/specificListing` ,
    USER_LISTINGS  : `${BASE_URL}/listing/fetchListingsByUserId` ,
    ADD_BOOKMARK : `${BASE_URL}/listing/addBookmark`,
    FETCH_BOOKMARK_LISTING : `${BASE_URL}/listing/fetchBookmarkListing` ,
    REMOVE_BOOKMARK : `${BASE_URL}/listing/removeBookmark`,
    DELETE_LISTING : `${BASE_URL}/listing/deleteListing` ,
    EDIT_LISTING : `${BASE_URL}/listing/editListing` ,
}

export const ratingReviewEndpoint = {
    CREATE_RATING_REVIEW : `${BASE_URL}/ratingAndReview/create`,
    FETCH_ALL : `${BASE_URL}/ratingAndReview/fetchAllReviews`,
    DELETE_REVIEW : `${BASE_URL}/ratingAndReview/delete`,
    FETCH_REVIEW : `${BASE_URL}/ratingAndReview/specificreview`,
    EDIT_REVIEW : `${BASE_URL}/ratingAndReview/edit`
} 