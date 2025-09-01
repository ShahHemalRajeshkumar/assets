import { useState, useEffect } from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';
import AppContentWrapper from './AppContentWrapper';
import 'mapbox-gl/dist/mapbox-gl.css';

const App = (props) => {
  const [, setCookie] = useCookies(['_ALGOLIA']);

  const [isHeavyComponentLoaded, setIsHeavyComponentLoaded] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsHeavyComponentLoaded(true);
    });

    return () => clearTimeout(timeoutId);
  }, []);

  const {
    userToken,
    indexName,
    searchState,
    searchClient,
    resultsStateHits,
    widgetsCollector,
    onSearchStateChange,
    ...restProps
  } = props;
  return (
    <CookiesProvider>
      <div data-insights-index={indexName}>
        {isHeavyComponentLoaded && (
          <AppContentWrapper
            {...restProps}
            userToken={userToken}
            resultsStateHits={resultsStateHits}
            setCookie={setCookie}
            searchClient={searchClient}
            searchState={searchState}
          />
        )}
      </div>
    </CookiesProvider>
  );
};

export default App;
