// #App Store
import itunes from "app-store-scraper";
import gplay from "google-play-scraper";

/**
 * Fetches app information from the Apple App Store using the app ID.
 * @param {string|number} appId - The unique identifier for the app on the App Store.
 * @returns {Promise<Object>} - Returns a Promise that resolves to the app information.
 */
async function getAppStoreAppInfo(appId) {
    try {
        const appInfo = await itunes.app({id: appId});

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
            subtitle: appInfo.description,
            url: appInfo.url,
            keywords: appInfo.primaryGenre,
            updates: `Last update ${updated}`,
            in_app: appInfo.free ? "Free" : appInfo.price,
            reviews_rating: `${appInfo.score} (${appInfo.reviews})`,
            matrix: {
                appName: {
                    label: "good",
                    color: "green"
                },
                appSubtilte: {
                    label: "noot good",
                    color: "yellow"
                },
                appUrl: {
                    label: "noot good",
                    color: "yellow"
                },
                keywords: {
                    label: "noot good",
                    color: "yellow"
                },
                InstallEngagement: {
                    label: "noot good",
                    color: "yellow"
                },
                ReviewRatings: {
                    label: "noot good",
                    color: "yellow"
                },
                appUpdates: {
                    label: "noot good",
                    color: "yellow"
                },
                InAppPurchase: {
                    label: "noot good",
                    color: "yellow"
                },
            }
        };
    } catch (error) {
        console.error(`Error fetching App Store app info for appId: ${appId}`, error);
        throw error;
    }
}

/**
 * Fetches reviews for a given app from the Apple App Store.
 * @param {string|number} appId - The unique identifier for the app on the App Store.
 * @param {number} [page=1] - The page number of reviews to fetch (default is 1).
 * @param {string} [sortOrder='RECENT'] - Sorting order of the reviews, e.g., 'RECENT', 'HELPFUL', etc.
 * @returns {Promise<Array>} - Returns a Promise that resolves to an array of reviews.
 */
async function getAppStoreAppReviews(appId, page = 1, sortOrder = 'RECENT') {
    try {
        const reviews = await itunes.reviews({
            id: appId,
            sort: itunes.sort[sortOrder] || itunes.sort.RECENT,
            page: page
        });
        console.log(`Reviews fetched successfully from page ${page} of the App Store`);
        return reviews;
    } catch (error) {
        console.error(`Error fetching App Store reviews for appId: ${appId}`, error);
        throw error;
    }
}

/**
 * Search for an app on the Apple App Store.
 * @param {string} query - The search query for the app.
 * @param {number} [limit=5] - The number of search results to fetch (default is 5).
 * @returns {Promise<Array>} - Returns a Promise that resolves to an array of search results.
 */
async function searchAppStoreApp(query, limit = 5) {
    try {
        const apps = await itunes.search({term: query, num: limit});

        if (!apps) {
            throw new Error(`There is an error`);
        }

        return apps.map(data => ({
            id: data.id,
            icon: data.icon,
            name: data.title,
            subtitle: data.description,
            url: data.url,
            in_app: data.free ? "Free" : data.price,
            rating: Number(data.score.toFixed(1)).toString()
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
async function competitorsAppStoreApp(appId) {
    try {
        const app = await itunes.app({id: appId});
        const keywords = app.genres;
        const competitors = await Promise.all(keywords.map(keyword => searchAppStoreApp(keyword, 10)));
        console.log("Competitors fetched successfully from the App Store");
        return competitors;
    } catch (error) {
        console.error(`Error fetching competitors for appId: ${appId}`, error);
        throw error;
    }
}

async function getSuggestedKeywords(query, limit) {
    try {
        const apps = await gplay.suggest({ term: query, num: limit });

        if (!apps || apps.length === 0) {
            throw new Error(`No apps found for the query: ${query}`);
        }

        return apps;
    } catch (error) {
        console.error(`Error searching for apps: ${query}`, error);
        throw error;
    }
}


export {getAppStoreAppInfo, getAppStoreAppReviews, searchAppStoreApp, competitorsAppStoreApp, getSuggestedKeywords};
