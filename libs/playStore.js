// #PlayStore
import gplay from "google-play-scraper";
import * as R from "ramda";

/**
 * Fetches app information from the Google Play Store using the app ID.
 * @param {string} appId - The unique identifier for the app on the Play Store.
 * @returns {Promise<Object>} - Returns a Promise that resolves to the app information.
 */
async function getPlayStoreAppInfo(appId) {
    try {
        const appInfo = await gplay.app({appId});

        if (!appInfo) {
            throw new Error(`There is an error`);
        }

        const updated = new Date(appInfo.updated).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        return {
            id: appId,
            icon: appInfo.icon,
            name: appInfo.title,
            subtitle: appInfo.summary,
            url: appInfo.url,
            keywords: appInfo.genre,
            updates: `Last update ${updated}`,
            in_app: appInfo.priceText,
            reviews_rating: `${appInfo.scoreText} (${appInfo.reviews})`
        };
    } catch (error) {
        console.error(`Error fetching Play Store app info for appId: ${appId}`, error);
        throw error;
    }
}

/**
 * Fetches reviews for a given app from the Google Play Store.
 * @param {string} appId - The unique identifier for the app on the Play Store.
 * @param {number} [limit=10] - The number of reviews to fetch (default is 10).
 * @param {string} [sortOrder='NEWEST'] - Sorting order of the reviews, e.g., 'NEWEST', 'RATING', etc.
 * @returns {Promise<Array>} - Returns a Promise that resolves to an array of reviews.
 */
async function getPlayStoreAppReviews(appId, limit = 10, sortOrder = 'NEWEST') {
    try {
        const reviews = await gplay.reviews({
            appId,
            sort: gplay.sort[sortOrder] || gplay.sort.NEWEST,
            num: limit
        });
        console.log(`${reviews.length} reviews fetched successfully`);
        return reviews;
    } catch (error) {
        console.error(`Error fetching Play Store reviews for appId: ${appId}`, error);
        throw error;
    }
}

/**
 * Search for an app on the Google Play Store.
 * @param {string} query - The search query for the app.
 * @param {number} [limit=5] - The number of search results to fetch (default is 5).
 * @returns {Promise<Array>} - Returns a Promise that resolves to an array of search results.
 */
async function searchPlayStoreApp(query, limit = 5) {
    try {
        const apps = await gplay.search({term: query, num: limit});

        if (!apps) {
            throw new Error(`There is an error`);
        }

        return apps.map(data => ({
            id: data.appId,
            icon: data.icon,
            name: data.title,
            subtitle: data.summary,
            url: data.url,
            in_app: data.priceText,
            rating: data.scoreText
        }));
    } catch (error) {
        console.error(`Error searching for app: ${query}`, error);
        throw error;
    }
}

/**
 * Fetches the top 10 search results for the given keyword and then fetches the top 10 search results for each of those
 * @param appId
 * @returns {Promise<Awaited<unknown>[]>}
 */
async function competitorsPlayStoreApp(appId) {
    const data = await gplay.app({appId})
        .then(app => app.description.split(' '))
        .then(R.slice(0, 5))
        .then(R.map((kw) => ({
            term: kw,
            num: 5,
            fullDetail: false
        })))
        .then(R.map(gplay.search))
        .then((promises) => Promise.all(promises))
        .then(R.unnest)
        .then(R.uniqBy(R.prop('appId')))
        .then(R.reject(R.propEq('appId', appId)))
        .then(R.slice(0, 8));

    return data.map(val => ({
        id: val.appId,
        icon: val.icon,
        name: val.title,
        subtitle: val.summary,
        url: val.url,
        in_app: val.priceText,
        rating: val.scoreText
    }));
}

export {getPlayStoreAppInfo, getPlayStoreAppReviews, searchPlayStoreApp, competitorsPlayStoreApp};
