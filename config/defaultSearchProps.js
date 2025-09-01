import algoliasearch from 'algoliasearch/lite';
import * as algoliaCacheCommon from '@algolia/cache-common';

export const searchClient = algoliasearch(process.env.ALGOLIA_SEARCHAPPID, process.env.ALGOLIA_SEARCHAPIKEY, {
  hostsCache: algoliaCacheCommon.createNullCache(),
  requestsCache: algoliaCacheCommon.createNullCache(),
  responsesCache: algoliaCacheCommon.createNullCache(),
});

export const DEFAULT_SEARCH_PROPS = {
  searchClient,
  indexName: process.env.ALGOLIA_TEACHERINDEX,
};
