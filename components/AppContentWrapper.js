import aa from 'search-insights';
import React, { useEffect, useLayoutEffect } from 'react';
import { createInsightsMiddleware } from 'instantsearch.js/es/middlewares';
import { InstantSearch, useInstantSearch, Configure } from 'react-instantsearch';
import AppContent from './AppContent';

const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN;

const algoliaConfig = {
  appId: process.env.ALGOLIA_SEARCHAPPID || process.env.NEXT_PUBLIC_ALGOLIA_SEARCHAPPID,
  apiKey: process.env.ALGOLIA_SEARCHAPIKEY || process.env.NEXT_PUBLIC_ALGOLIA_SEARCHAPIKEY,
};

const InsightsMiddleware = ({ userToken, setCookie }) => {
  const { addMiddlewares } = useInstantSearch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      aa('init', { ...algoliaConfig, useCookie: true });

      const date = new Date();
      date.setTime(date.getTime() + 90 * 24 * 60 * 60 * 1000);

      setCookie('_ALGOLIA', userToken, {
        path: '/',
        expires: date,
        domain: COOKIE_DOMAIN,
      });
    }
  }, [userToken, setCookie]);

  useLayoutEffect(() => {
    const middleware = createInsightsMiddleware({
      insightsClient: aa,
      insightsInitParams: {
        userToken,
      },
      onEvent: (event, aa) => {
        // const { insightsMethod, payload } = event;
        // Send the event to Algolia
        // if (insightsMethod) aa(insightsMethod, payload);
        // Send the event to a third-party tracker
        // if (widgetType === 'ais.hits' && eventType === 'click') {
        //   thirdPartyTracker.send('Product Clicked', payload);
        // }
      },
    });

    return addMiddlewares(middleware);
  }, [userToken, addMiddlewares]);

  return null;
};

const AppContentWrapper = (props) => {
  const {
    userToken,
    indexName,
    searchState,
    searchClient,
    resultsStateHits,
    widgetsCollector,
    onSearchStateChange,
    setCookie,
    isLoadingInner,
    ...restProps
  } = props;

  return (
    <div>
      <InstantSearch
        insights={true}
        indexName={indexName}
        searchState={searchState}
        searchClient={searchClient}
        resultsState={resultsStateHits}
        widgetsCollector={widgetsCollector}
        onSearchStateChange={onSearchStateChange}>
        <Configure clickAnalytics={true} userToken={userToken} hitsPerPage={650} />
        <div data-insights-index={indexName}>
          <AppContent {...restProps} userToken={userToken} resultsStateHits={resultsStateHits} searchState={searchState}/>
        </div>
        <InsightsMiddleware userToken={userToken} setCookie={setCookie} />
      </InstantSearch>
    </div>
  );
};

export default AppContentWrapper;
