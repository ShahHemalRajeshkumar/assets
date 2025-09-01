import { renderToString } from 'react-dom/server';
import { version } from 'react-instantsearch-core';
import algoliasearchHelper from 'algoliasearch-helper';
import { createWidgetsCollector, getSearchParameters } from './getSearchParameters';
import { singleIndexSearch } from './singleIndexSearch';
import { getMetadata } from './getMetadata';

const REPLICA_INDEX_NAME = process.env.ALGOLIA_TEACHERINDEX_SW;

export const findResultsState = function ({
  App,
  props,
  query,
  ipAddress,
  aroundLatLng,
  aroundRadius,
  locationName,
  isSwitzerland,
}) {
  if (!props) {
    throw new Error('The function `findResultsState` must be called with props: `findResultsState(App, props)`');
  }

  if (!props.searchClient) {
    throw new Error('The props provided to `findResultsState` must have a `searchClient`');
  }

  if (!props.indexName) {
    throw new Error('The props provided to `findResultsState` must have an `indexName`');
  }

  let widgets = [];
  // eslint-disable-next-line no-shadow
  function execute(props) {
    widgets = [];
    renderToString(<App {...props} widgetsCollector={createWidgetsCollector(widgets)} />);

    // if (widgets.length === 0) {
    //   throw new Error(
    //     '[ssr]: no widgets were added, you likely did not pass the `widgetsCollector` down to the InstantSearch component.'
    //   );
    // }

    const indexName = isSwitzerland ? REPLICA_INDEX_NAME : props.indexName;
    const { sharedParameters, derivedParameters } = getSearchParameters(indexName, widgets);

    const metadata = getMetadata(widgets);
    const helper = algoliasearchHelper(props.searchClient, sharedParameters.index);

    helper.setQuery(`${query} ${aroundLatLng} ${locationName}`);
    helper.setQueryParameter('hitsPerPage', 650);

    if (ipAddress) {
      helper.setQueryParameter('aroundLatLngViaIP', true);
    } else {
      helper.setQueryParameter('aroundLatLng', aroundLatLng);
    }

    if (aroundRadius) {
      helper.setQueryParameter('aroundRadius', aroundRadius);
    } else {
      helper.setQueryParameter('aroundRadius', 'all');
    }

    helper.setQueryParameter('optionalWords', [aroundLatLng, `${locationName}`]);
    helper.setQueryParameter('minimumAroundRadius', 40000);
    helper.setQueryParameter('aroundPrecision', [
      { from: 0, value: 2500 },
      { from: 5010, value: 20000 },
      { from: 25010, value: 40000 },
    ]);

    if (typeof props.searchClient.addAlgoliaAgent === 'function') {
      props.searchClient.addAlgoliaAgent(`react-instantsearch-server (${version})`);
    }

    if (Object.keys(derivedParameters).length === 0) {
      return singleIndexSearch(helper, sharedParameters).then((res) => {
        return {
          metadata,
          ...res,
        };
      });
    }
    return null;
  }

  return execute(props).then((resultsState) => {
    // <DynamicWidgets> requires another query to retrieve the dynamic widgets
    // to render.
    if (widgets.some((widget) => widget.displayName === 'AlgoliaDynamicWidgets')) {
      return execute({ ...props, resultsState });
    }

    return {
      metadata: resultsState.metadata,
      rawResults: resultsState.rawResults,
      state: JSON.parse(resultsState.state),
    };
  });
};
