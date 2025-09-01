import algoliasearchHelper from 'algoliasearch-helper';
const HIGHLIGHT_TAGS = {
  highlightPreTag: '<mark>',
  highlightPostTag: '</mark>',
};

const hasMultipleIndices = (context) => context && context.multiIndexContext;

const getIndexId = (context) =>
  hasMultipleIndices(context) ? context.multiIndexContext.targetedIndex : context.ais.mainTargetedIndex;

export const getSearchParameters = (indexName, widgets) => {
  const sharedParameters = widgets
    .filter((widget) => !hasMultipleIndices(widget.context))
    .reduce(
      (acc, widget) => widget.getSearchParameters(acc, widget.props, widget.searchState),
      new algoliasearchHelper.SearchParameters({
        ...HIGHLIGHT_TAGS,
        index: indexName,
        advancedSyntax: true,
      }).setTypoTolerance('false')
    );

  const derivedParameters = widgets
    .filter((widget) => hasMultipleIndices(widget.context))
    .reduce((acc, widget) => {
      const indexId = getIndexId(widget.context);

      return {
        ...acc,
        [indexId]: widget.getSearchParameters(acc[indexId] || sharedParameters, widget.props, widget.searchState),
      };
    }, {});

  return {
    sharedParameters,
    derivedParameters,
  };
};

export const createWidgetsCollector = (accumulator) => {
  return (props) => {
    accumulator.push({
      ...props,
      index: getIndexId(props.context),
    });
  };
};
