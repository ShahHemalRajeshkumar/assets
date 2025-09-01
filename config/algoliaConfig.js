import algoliasearch from 'algoliasearch/lite';
import * as algoliaCacheCommon from '@algolia/cache-common';

const algoliaConfig = {
    appId: process.env.ALGOLIA_SEARCHAPPID || process.env.NEXT_PUBLIC_ALGOLIA_SEARCHAPPID,
    apiKey: process.env.ALGOLIA_SEARCHAPIKEY || process.env.NEXT_PUBLIC_ALGOLIA_SEARCHAPIKEY,
};

export const algoliaClient = algoliasearch(algoliaConfig.appId, algoliaConfig.apiKey, {
    hostsCache: algoliaCacheCommon.createNullCache(),
    requestsCache: algoliaCacheCommon.createNullCache(),
    responsesCache: algoliaCacheCommon.createNullCache(),
});

export const instrumentsIndex = algoliaClient.initIndex(process.env.ALGOLIA_INSTRUMENTS);
export const getTeachersIndex = algoliaClient.initIndex(process.env.ALGOLIA_TEACHERINDEX);
